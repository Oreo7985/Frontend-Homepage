// src/pages/Instagram.jsx
import { useState, useEffect } from 'react';
import { INSTAGRAM_API_URL } from '../config/api';

export default function Instagram() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(INSTAGRAM_API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch Instagram posts');
                }
                const data = await response.json();
                setPosts(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // 加载状态
    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-600 dark:text-gray-400">
                    Loading...
                </div>
            </div>
        );
    }

    // 错误状态
    if (error) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-red-500">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 dark:bg-gray-950">
            <div className="container mx-auto px-4 py-40">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    {posts.map(post => (
                        <a
                            key={post.id}
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group aspect-square"
                        >
                            <img
                                src={post.media_url}
                                alt={post.caption}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            
                            {/* Hover overlay */}
                            <div className="
                                absolute inset-0 
                                bg-black bg-opacity-0 
                                group-hover:bg-opacity-30 
                                transition-all duration-300
                                flex items-center justify-center
                                rounded-lg
                            ">
                                <span className="
                                    text-white opacity-0 
                                    group-hover:opacity-100 
                                    transition-opacity
                                    px-4 text-center
                                ">
                                    {post.caption?.substring(0, 100) || 'View on Instagram'}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}