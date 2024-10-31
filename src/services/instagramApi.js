// src/services/instagramApi.js
import axios from 'axios';

const INSTAGRAM_API_URL = 'https://graph.instagram.com/v21.0';
// 使用你的访问令牌
const ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN; 
// set media type
const MEDIA_TYPE = 'IMAGE';

export const getInstagramPosts = async () => {
    try {
        const response = await axios.get(
            `${INSTAGRAM_API_URL}/me/media`, {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
                    access_token: ACCESS_TOKEN
                }
            }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        throw error;
    }
};