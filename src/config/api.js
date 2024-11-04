// src/config/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    // ? 'https://frontend-homepage.onrender.com'  // Render后端地址
    ? 'https://instagram-api.luhang-fang.workers.dev/'  // Cloudflare Workers地址
    : 'http://localhost:5002';           // 开发环境后端地址

export const INSTAGRAM_API_URL = `${API_BASE_URL}/api/instagram`;