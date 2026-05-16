// src/config/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://instagram-api.luhang-fang.workers.dev';

// Instagram API
export const INSTAGRAM_API_URL = `${API_BASE_URL}/api/instagram`;

// GitHub API
export const GITHUB_API_BASE_URL = 'https://api.github.com';
export const GITHUB_USERNAME = 'Oreo7985'; // 替换用户名

export const getGitHubReposUrl = (username = GITHUB_USERNAME) => 
    `${GITHUB_API_BASE_URL}/users/${username}/repos?sort=stars&per_page=6`;

export const INSTAGRAM_USERNAME = 'oreo_in_germany';