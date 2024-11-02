const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// 速率限制配置
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100, // 限制每个IP的请求次数
    message: { 
        success: false,
        error: 'Too many requests, please try again later.'
    }
});

// CORS 配置
const corsOptions = {
    origin: [
        'http://localhost:5001', 
        'https://luhang.dev',
        'https://www.luhang.dev',
        'https://frontend-homepage.onrender.com'
    ],
    methods: ['GET'], // 只允许GET请求，因为我们只需要获取数据
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

// 中间件
app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

// 内存缓存
let postsCache = {
    data: null,
    timestamp: null
};

// 健康检查路由
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Instagram API 路由
app.get('/api/instagram', async (req, res) => {
    try {
        // 检查缓存是否有效（5分钟内）
        const now = Date.now();
        if (postsCache.data && postsCache.timestamp && 
            (now - postsCache.timestamp) < 5 * 60 * 1000) {
            return res.json(postsCache.data);
        }

        // 验证token
        if (!process.env.INSTAGRAM_TOKEN) {
            throw new Error('Instagram access token is not configured');
        }

        // 获取Instagram数据
        const response = await axios.get(
            'https://graph.instagram.com/me/media',
            {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,timestamp',
                    access_token: process.env.INSTAGRAM_TOKEN,
                    limit: 20
                },
                timeout: 5000
            }
        );

        // 验证响应数据
        if (!response.data?.data) {
            throw new Error('Invalid response from Instagram API');
        }

        // 处理数据
        const imagePosts = response.data.data
            .filter(post => post.media_type === 'IMAGE')
            .map(post => ({
                id: post.id,
                caption: post.caption || '',
                media_url: post.media_url,
                permalink: post.permalink,
                timestamp: post.timestamp
            }));

        // 更新缓存
        postsCache = {
            data: { 
                success: true,
                data: imagePosts,
                total: imagePosts.length
            },
            timestamp: now
        };

        // 设置响应头和返回数据
        res.set('Cache-Control', 'public, max-age=300');
        res.json(postsCache.data);

    } catch (error) {
        console.error('Instagram API Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            timestamp: new Date().toISOString()
        });

        // 返回错误响应
        const statusCode = error.response?.status || 500;
        res.status(statusCode).json({
            success: false,
            error: 'Failed to fetch Instagram posts',
            details: process.env.NODE_ENV === 'development' 
                ? error.message 
                : 'An error occurred while fetching posts',
            status: statusCode
        });
    }
});

// 通用错误处理
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        timestamp: new Date().toISOString()
    });

    res.status(500).json({ 
        success: false,
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404处理
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Not Found' 
    });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});