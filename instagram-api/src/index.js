const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,OPTIONS',
	'Access-Control-Max-Age': '86400',
	'Access-Control-Allow-Headers': 'Content-Type, Cursor',  // 添加 Cursor header
  };
  
  // 处理CORS预检请求
  function handleOptions(request) {
	const allowedOrigins = env.ALLOWED_ORIGINS.split(',');
	const origin = request.headers.get('Origin');
	
	if (origin && allowedOrigins.includes(origin)) {
	  corsHeaders['Access-Control-Allow-Origin'] = origin;
	}
  
	return new Response(null, {
	  headers: corsHeaders,
	});
  }
  
  async function handleRequest(request, env) {
	const url = new URL(request.url);
	const origin = request.headers.get('Origin');
	const allowedOrigins = env.ALLOWED_ORIGINS.split(',');
  
	const responseHeaders = { ...corsHeaders };
	if (origin && allowedOrigins.includes(origin)) {
	  responseHeaders['Access-Control-Allow-Origin'] = origin;
	}
  
	// 健康检查路由
	if (url.pathname === '/health') {
	  return new Response(
		JSON.stringify({
		  status: 'healthy',
		  timestamp: new Date().toISOString()
		}),
		{
		  headers: {
			'Content-Type': 'application/json',
			...responseHeaders
		  }
		}
	  );
	}
  
	// Instagram API 路由
	if (url.pathname === '/api/instagram') {
	  try {
		// 获取分页参数
		const cursor = url.searchParams.get('cursor') || null;
		const limit = parseInt(url.searchParams.get('limit')) || 6;
		
		// 构建缓存键，包含分页信息
		const cacheKey = `posts_${cursor || 'initial'}_${limit}`;
		
		// 检查缓存
		const cached = await env.INSTAGRAM_CACHE.get(cacheKey);
		if (cached) {
		  const cachedData = JSON.parse(cached);
		  return new Response(
			JSON.stringify({ ...cachedData, cached: true }),
			{
			  headers: {
				'Content-Type': 'application/json',
				...responseHeaders
			  }
			}
		  );
		}
  
		// 验证token
		if (!env.INSTAGRAM_TOKEN) {
		  throw new Error('Instagram access token is not configured');
		}
  
		// 构建Instagram API URL
		let apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${env.INSTAGRAM_TOKEN}&limit=${limit}`;
		
		if (cursor) {
		  apiUrl += `&after=${cursor}`;
		}
  
		// 获取Instagram数据
		const response = await fetch(apiUrl, {
		  cf: {
			cacheTtl: 300,
			cacheEverything: true,
		  }
		});
  
		if (!response.ok) {
		  throw new Error(`Instagram API responded with ${response.status}`);
		}
  
		const rawData = await response.json();
  
		// 处理数据
		const imagePosts = rawData.data
		  .filter(post => post.media_type === 'IMAGE')
		  .map(post => ({
			id: post.id,
			caption: post.caption || '',
			media_url: post.media_url,
			permalink: post.permalink,
			timestamp: post.timestamp
		  }))
		  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
		const result = {
		  success: true,
		  data: imagePosts,
		  total: imagePosts.length,
		  pagination: {
			hasNextPage: !!rawData.paging?.next,
			nextCursor: rawData.paging?.cursors?.after || null,
			prevCursor: rawData.paging?.cursors?.before || null
		  },
		  cached: false,
		  timestamp: new Date().toISOString()
		};
  
		// 更新缓存
		await env.INSTAGRAM_CACHE.put(cacheKey, JSON.stringify(result), {
		  expirationTtl: 300 // 5分钟缓存
		});
  
		return new Response(
		  JSON.stringify(result),
		  {
			headers: {
			  'Content-Type': 'application/json',
			  'Cache-Control': 'public, max-age=300',
			  ...responseHeaders
			}
		  }
		);
  
	  } catch (error) {
		console.error('Instagram API Error:', {
		  message: error.message,
		  stack: error.stack,
		  timestamp: new Date().toISOString()
		});
	  
		const errorResponse = {
		  success: false,
		  error: 'Failed to fetch Instagram posts',
		  details: error.message,
		  timestamp: new Date().toISOString()
		};
	  
		return new Response(
		  JSON.stringify(errorResponse),
		  {
			status: 500,
			headers: {
			  'Content-Type': 'application/json',
			  ...responseHeaders
			}
		  }
		);
	  }
	}
  
	// 404处理
	return new Response(
	  JSON.stringify({ success: false, error: 'Not Found' }),
	  {
		status: 404,
		headers: {
		  'Content-Type': 'application/json',
		  ...responseHeaders
		}
	  }
	);
  }
  
  export default {
	async fetch(request, env, ctx) {
	  // 添加详细的环境变量检查
	  console.log('Environment check:', {
		hasToken: !!env.INSTAGRAM_TOKEN,
		tokenFirstChars: env.INSTAGRAM_TOKEN ? `${env.INSTAGRAM_TOKEN.substr(0, 5)}...` : 'not set',
		envKeys: Object.keys(env)
	  });
		
	  // 处理CORS预检请求
	  if (request.method === 'OPTIONS') {
		return handleOptions(request);
	  }
  
	  return handleRequest(request, env);
	}
  };