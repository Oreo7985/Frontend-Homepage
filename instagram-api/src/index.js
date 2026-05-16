const TOKEN_KV_KEY = 'instagram_token_data';
const REFRESH_BEFORE_DAYS = 7; // refresh when < 7 days remaining

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

// ─── Token management ────────────────────────────────────────────────────────

async function doRefresh(token) {
  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed (${res.status}): ${text}`);
  }
  return res.json(); // { access_token, token_type, expires_in }
}

async function storeToken({ access_token, expires_in }, env) {
  const expires_at = Date.now() + expires_in * 1000;
  // Store in KV with TTL slightly shorter than token lifetime
  const ttl = Math.max(expires_in - 3600, 86400);
  await env.INSTAGRAM_CACHE.put(
    TOKEN_KV_KEY,
    JSON.stringify({ token: access_token, expires_at }),
    { expirationTtl: ttl }
  );
}

async function refreshAndStore(currentToken, env) {
  try {
    const data = await doRefresh(currentToken);
    await storeToken(data, env);
    console.log('Token refreshed successfully, new expiry:', new Date(Date.now() + data.expires_in * 1000).toISOString());
  } catch (e) {
    console.error('Token refresh failed:', e.message);
  }
}

/**
 * Returns a valid token, auto-refreshing when needed.
 *
 * Flow:
 * 1. Check KV for a stored token
 * 2a. Token fresh → use it
 * 2b. Token expiring soon → use it now, refresh in background via ctx.waitUntil
 * 2c. Token expired or missing → use env.INSTAGRAM_TOKEN to refresh synchronously
 */
async function getValidToken(env, ctx) {
  const stored = await env.INSTAGRAM_CACHE.get(TOKEN_KV_KEY, 'json');
  const now = Date.now();
  const refreshThresholdMs = REFRESH_BEFORE_DAYS * 24 * 60 * 60 * 1000;

  if (stored?.token && stored?.expires_at) {
    const timeLeft = stored.expires_at - now;

    if (timeLeft > refreshThresholdMs) {
      // Fresh — no action needed
      return stored.token;
    }

    if (timeLeft > 0) {
      // Valid but expiring soon — serve this request, refresh in background
      console.log(`Token expiring in ${Math.floor(timeLeft / 86400000)} days — refreshing in background`);
      ctx.waitUntil(refreshAndStore(stored.token, env));
      return stored.token;
    }
    // Stored token has expired — fall through
  }

  // No valid stored token: use env secret as base, refresh it to get expiry info
  const baseToken = env.INSTAGRAM_TOKEN;
  if (!baseToken) throw new Error('INSTAGRAM_TOKEN secret is not configured in Cloudflare');

  console.log('No stored token found — performing initial refresh');
  const data = await doRefresh(baseToken);
  await storeToken(data, env);
  return data.access_token;
}

// ─── Request handling ────────────────────────────────────────────────────────

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const headers = getResponseHeaders(request, env);

  // Health check — also shows token status
  if (url.pathname === '/health') {
    const stored = await env.INSTAGRAM_CACHE.get(TOKEN_KV_KEY, 'json');
    const daysLeft = stored?.expires_at
      ? Math.floor((stored.expires_at - Date.now()) / 86400000)
      : null;

    return new Response(JSON.stringify({
      status: 'healthy',
      token_stored: !!stored?.token,
      token_expires_at: stored?.expires_at ? new Date(stored.expires_at).toISOString() : null,
      token_days_remaining: daysLeft,
      timestamp: new Date().toISOString(),
    }), { headers: { 'Content-Type': 'application/json', ...headers } });
  }

  // Instagram posts
  if (url.pathname === '/api/instagram') {
    try {
      const cursor = url.searchParams.get('cursor') || null;
      const limit = parseInt(url.searchParams.get('limit')) || 6;
      const cacheKey = `posts_${cursor || 'initial'}_${limit}`;

      // Check post cache first
      const cached = await env.INSTAGRAM_CACHE.get(cacheKey);
      if (cached) {
        return new Response(
          JSON.stringify({ ...JSON.parse(cached), cached: true }),
          { headers: { 'Content-Type': 'application/json', ...headers } }
        );
      }

      const token = await getValidToken(env, ctx);

      let apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${token}&limit=${limit}`;
      if (cursor) apiUrl += `&after=${cursor}`;

      const igRes = await fetch(apiUrl, {
        cf: { cacheTtl: 300, cacheEverything: true },
      });
      if (!igRes.ok) throw new Error(`Instagram API responded with ${igRes.status}`);

      const rawData = await igRes.json();
      const imagePosts = rawData.data
        .filter(p => p.media_type === 'IMAGE')
        .map(p => ({
          id: p.id,
          caption: p.caption || '',
          media_url: p.media_url,
          permalink: p.permalink,
          timestamp: p.timestamp,
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const result = {
        success: true,
        data: imagePosts,
        total: imagePosts.length,
        pagination: {
          hasNextPage: !!rawData.paging?.next,
          nextCursor: rawData.paging?.cursors?.after || null,
          prevCursor: rawData.paging?.cursors?.before || null,
        },
        cached: false,
        timestamp: new Date().toISOString(),
      };

      await env.INSTAGRAM_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 300 });

      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300', ...headers },
      });

    } catch (error) {
      console.error('Instagram API error:', error.message);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch Instagram posts',
        details: error.message,
        timestamp: new Date().toISOString(),
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...headers },
      });
    }
  }

  return new Response(JSON.stringify({ success: false, error: 'Not Found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json', ...headers },
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
