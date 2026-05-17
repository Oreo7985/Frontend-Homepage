const TOKEN_KV_KEY = 'instagram_token_data';
const REFRESH_BEFORE_DAYS = 7;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Headers': 'Content-Type, Cursor',
};

function getResponseHeaders(request, env) {
  const headers = { ...corsHeaders };
  const origin = request.headers.get('Origin');
  const allowed = env.ALLOWED_ORIGINS?.split(',') ?? [];
  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

// ─── Instagram token management ──────────────────────────────────────────────

async function doRefresh(token) {
  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function storeInstagramToken({ access_token, expires_in }, env) {
  const expires_at = Date.now() + expires_in * 1000;
  await env.INSTAGRAM_CACHE.put(
    TOKEN_KV_KEY,
    JSON.stringify({ token: access_token, expires_at }),
    { expirationTtl: Math.max(expires_in - 3600, 86400) }
  );
}

async function refreshAndStoreInstagram(currentToken, env) {
  try {
    const data = await doRefresh(currentToken);
    await storeInstagramToken(data, env);
  } catch (e) {
    console.error('Instagram token refresh failed:', e.message);
  }
}

async function getInstagramToken(env, ctx) {
  const stored = await env.INSTAGRAM_CACHE.get(TOKEN_KV_KEY, 'json');
  const now = Date.now();
  const thresholdMs = REFRESH_BEFORE_DAYS * 24 * 60 * 60 * 1000;

  if (stored?.token && stored?.expires_at) {
    const timeLeft = stored.expires_at - now;
    if (timeLeft > thresholdMs) return stored.token;
    if (timeLeft > 0) {
      ctx.waitUntil(refreshAndStoreInstagram(stored.token, env));
      return stored.token;
    }
  }

  const baseToken = env.INSTAGRAM_TOKEN;
  if (!baseToken) throw new Error('INSTAGRAM_TOKEN secret is not configured');
  const data = await doRefresh(baseToken);
  await storeInstagramToken(data, env);
  return data.access_token;
}

// ─── Spotify token management ─────────────────────────────────────────────────

async function getSpotifyToken(env) {
  const cached = await env.INSTAGRAM_CACHE.get('spotify_access_token', 'json');
  if (cached?.token && cached.expires_at > Date.now() + 60_000) {
    return cached.token;
  }

  if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REFRESH_TOKEN) {
    throw new Error('Spotify secrets not configured');
  }

  const credentials = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${env.SPOTIFY_REFRESH_TOKEN}`,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  await env.INSTAGRAM_CACHE.put(
    'spotify_access_token',
    JSON.stringify({ token: data.access_token, expires_at: Date.now() + (data.expires_in - 60) * 1000 }),
    { expirationTtl: data.expires_in - 60 }
  );
  return data.access_token;
}

// ─── Request handling ─────────────────────────────────────────────────────────

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const headers = getResponseHeaders(request, env);

  // ── Health ──
  if (url.pathname === '/health') {
    const stored = await env.INSTAGRAM_CACHE.get(TOKEN_KV_KEY, 'json');
    const daysLeft = stored?.expires_at
      ? Math.floor((stored.expires_at - Date.now()) / 86_400_000)
      : null;
    return new Response(JSON.stringify({
      status: 'healthy',
      instagram_token_stored: !!stored?.token,
      instagram_token_days_remaining: daysLeft,
      timestamp: new Date().toISOString(),
    }), { headers: { 'Content-Type': 'application/json', ...headers } });
  }

  // ── Instagram posts ──
  if (url.pathname === '/api/instagram') {
    try {
      const cursor = url.searchParams.get('cursor') || null;
      const limit = parseInt(url.searchParams.get('limit')) || 6;
      const cacheKey = `posts_${cursor || 'initial'}_${limit}`;

      const cached = await env.INSTAGRAM_CACHE.get(cacheKey);
      if (cached) {
        return new Response(
          JSON.stringify({ ...JSON.parse(cached), cached: true }),
          { headers: { 'Content-Type': 'application/json', ...headers } }
        );
      }

      const token = await getInstagramToken(env, ctx);
      let apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${token}&limit=${limit}`;
      if (cursor) apiUrl += `&after=${cursor}`;

      const igRes = await fetch(apiUrl, { cf: { cacheTtl: 300, cacheEverything: true } });
      if (!igRes.ok) throw new Error(`Instagram API responded with ${igRes.status}`);

      const rawData = await igRes.json();
      const imagePosts = rawData.data
        .filter(p => p.media_type === 'IMAGE')
        .map(p => ({ id: p.id, caption: p.caption || '', media_url: p.media_url, permalink: p.permalink, timestamp: p.timestamp }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const result = {
        success: true, data: imagePosts, total: imagePosts.length,
        pagination: {
          hasNextPage: !!rawData.paging?.next,
          nextCursor: rawData.paging?.cursors?.after || null,
          prevCursor: rawData.paging?.cursors?.before || null,
        },
        cached: false, timestamp: new Date().toISOString(),
      };

      await env.INSTAGRAM_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 300 });
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300', ...headers },
      });

    } catch (error) {
      console.error('Instagram error:', error.message);
      return new Response(JSON.stringify({ success: false, error: error.message, timestamp: new Date().toISOString() }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...headers },
      });
    }
  }

  // ── Spotify recently played ──
  if (url.pathname === '/api/spotify') {
    try {
      const cacheKey = 'spotify_recent';
      const cached = await env.INSTAGRAM_CACHE.get(cacheKey);
      if (cached) {
        return new Response(
          JSON.stringify({ ...JSON.parse(cached), cached: true }),
          { headers: { 'Content-Type': 'application/json', ...headers } }
        );
      }

      const token = await getSpotifyToken(env);

      const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      let currentTrack = null;
      if (nowRes.status === 200) {
        const nowData = await nowRes.json();
        if (nowData?.item) {
          currentTrack = {
            id: nowData.item.id,
            name: nowData.item.name,
            artist: nowData.item.artists.map(a => a.name).join(', '),
            album: nowData.item.album.name,
            image: nowData.item.album.images[1]?.url ?? nowData.item.album.images[0]?.url,
            url: nowData.item.external_urls.spotify,
            is_playing: nowData.is_playing,
          };
        }
      }

      const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!recentRes.ok) throw new Error(`Spotify API: ${recentRes.status}`);

      const recentData = await recentRes.json();

      // Deduplicate by track ID, keep most recent play
      const seen = new Set();
      const tracks = recentData.items
        .filter(item => {
          if (seen.has(item.track.id)) return false;
          seen.add(item.track.id);
          return true;
        })
        .slice(0, 6)
        .map(item => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists.map(a => a.name).join(', '),
          album: item.track.album.name,
          image: item.track.album.images[1]?.url ?? item.track.album.images[0]?.url,
          url: item.track.external_urls.spotify,
          played_at: item.played_at,
        }));

      const result = { success: true, current: currentTrack, tracks, cached: false };
      await env.INSTAGRAM_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 60 });

      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60', ...headers },
      });

    } catch (error) {
      console.error('Spotify error:', error.message);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...headers },
      });
    }
  }

  // ── Spotify top tracks + artists ──
  if (url.pathname === '/api/spotify/top') {
    try {
      const cacheKey = 'spotify_top';
      const cached = await env.INSTAGRAM_CACHE.get(cacheKey);
      if (cached) {
        return new Response(
          JSON.stringify({ ...JSON.parse(cached), cached: true }),
          { headers: { 'Content-Type': 'application/json', ...headers } }
        );
      }

      const token = await getSpotifyToken(env);

      const [tracksRes, artistsRes] = await Promise.all([
        fetch('https://api.spotify.com/v1/me/top/tracks?limit=6&time_range=medium_term', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('https://api.spotify.com/v1/me/top/artists?limit=6&time_range=medium_term', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (!tracksRes.ok) throw new Error(`Top tracks: ${tracksRes.status}`);
      if (!artistsRes.ok) throw new Error(`Top artists: ${artistsRes.status}`);

      const [tracksData, artistsData] = await Promise.all([
        tracksRes.json(),
        artistsRes.json(),
      ]);

      const tracks = tracksData.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        album: track.album.name,
        image: track.album.images[1]?.url ?? track.album.images[0]?.url,
        url: track.external_urls.spotify,
      }));

      const artists = artistsData.items.map(artist => ({
        id: artist.id,
        name: artist.name,
        genres: (artist.genres ?? []).slice(0, 2),
        image: artist.images[1]?.url ?? artist.images[0]?.url,
        url: artist.external_urls.spotify,
      }));

      const result = { success: true, tracks, artists, cached: false };
      await env.INSTAGRAM_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 3600 });

      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600', ...headers },
      });

    } catch (error) {
      console.error('Spotify top error:', error.message);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...headers },
      });
    }
  }

  return new Response(JSON.stringify({ success: false, error: 'Not Found' }), {
    status: 404, headers: { 'Content-Type': 'application/json', ...headers },
  });
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: getResponseHeaders(request, env) });
    }
    return handleRequest(request, env, ctx);
  },
};
