const corsHeaders = {
	'Access-Control-Allow-Origin': '*',  // 稍后我们会根据环境变量动态设置
	'Access-Control-Allow-Methods': 'GET,OPTIONS',
	'Access-Control-Max-Age': '86400',
	'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  // 处理CORS预检请求
  function handleOptions(request) {
	// 从环境变量获取允许的源
	const allowedOrigins = env.ALLOWED_ORIGINS.split(',');
	const origin = request.headers.get('Origin');
	
	// 如果请求源在允许列表中，使用具体的源
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
  
	// 设置CORS headers
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
		// 检查缓存
		const cached = await env.INSTAGRAM_CACHE.get('posts');
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
  
		// 获取Instagram数据
		const response = await fetch(
		  `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${env.INSTAGRAM_TOKEN}&limit=20`,
		  {
			cf: {
			  cacheTtl: 300,
			  cacheEverything: true,
			}
		  }
		);
  
		if (!response.ok) {
		  throw new Error(`Instagram API responded with ${response.status}`);
		}
  
		const data = await response.json();
  
		// 处理数据
		const imagePosts = data.data
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
		  cached: false,
		  timestamp: new Date().toISOString()
		};
  
		// 更新缓存
		await env.INSTAGRAM_CACHE.put('posts', JSON.stringify(result), {
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
		// 添加详细的错误日志
		console.error('Instagram API Error:', {
		  message: error.message,
		  stack: error.stack,
		  timestamp: new Date().toISOString()
		});
	  
		const errorResponse = {
		  success: false,
		  error: 'Failed to fetch Instagram posts',
		  details: error.message,  // 添加具体错误信息
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