const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// 基本的健康检查路由
app.get('/', (req, res) => {
    res.json({ status: 'Server is running' });
});


// CORS 配置
const corsOptions = {
    origin: ['http://localhost:5001', 'http://localhost:3000','https://oreo7985.github.io/Frontend-Homepage'], // 允许的前端域名和端口
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的HTTP方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true, // 允许携带凭证
    maxAge: 86400 // 预检请求的有效期，单位秒
};

// 中间件
app.use(cors(corsOptions));  // 允许跨域请求
app.use(express.json());

// Instagram API 路由
app.get('/api/instagram', async (req, res) => {
    // 验证是否有token
    if (!process.env.INSTAGRAM_TOKEN) {
        return res.status(500).json({
            error: 'Instagram access token is not configured'
        });
    }

    try {
        const response = await axios.get(
            'https://graph.instagram.com/me/media',
            {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
                    access_token: process.env.INSTAGRAM_TOKEN,
                    limit: 12  // 限制返回数量，可以根据需要调整
                },
                timeout: 5000  // 设置超时时间
            }
        );

        // 验证响应数据
        if (!response.data || !response.data.data) {
            throw new Error('Invalid response from Instagram API');
        }

        // 过滤并处理数据
        const imagePosts = response.data.data
            .filter(post => post.media_type === 'IMAGE')
            .map(post => ({
                id: post.id,
                caption: post.caption || '',
                media_url: post.media_url,
                permalink: post.permalink,
                timestamp: post.timestamp
            }));

        // 缓存控制
        res.set('Cache-Control', 'public, max-age=300'); // 缓存5分钟
        
        res.json({ 
            success: true,
            data: imagePosts,
            total: imagePosts.length
        });

    } catch (error) {
        // 详细的错误处理
        console.error('Instagram API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });

        // 根据错误类型返回适当的状态码
        const status = error.response?.status || 500;
        const message = error.response?.data?.error?.message || error.message;

        res.status(status).json({
            success: false,
            error: 'Failed to fetch Instagram posts',
            details: message,
            status
        });
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        details: err.message 
    });
});

const PORT = process.env.PORT || 5002 ||10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});