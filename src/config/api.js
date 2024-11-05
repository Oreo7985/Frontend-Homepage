// src/config/api.js

const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://instagram-api.luhang-fang.workers.dev'  // Cloudflare Workers地址
    : 'http://localhost:8787';           // 开发环境后端地址

// Instagram API
export const INSTAGRAM_API_URL = `${API_BASE_URL}/api/instagram`;

// GitHub API
export const GITHUB_API_BASE_URL = 'https://api.github.com';
export const GITHUB_USERNAME = 'Oreo7985'; // 替换用户名

export const getGitHubReposUrl = (username = GITHUB_USERNAME) => 
    `${GITHUB_API_BASE_URL}/users/${username}/repos?sort=stars&per_page=6`;