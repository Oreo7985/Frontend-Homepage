import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Instagram as InstagramIcon, Image, Camera, Heart } from 'lucide-react';
import { INSTAGRAM_API_URL,INSTAGRAM_USERNAME  } from '../config/api';

export default function Instagram() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nextCursor, setNextCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const observerTarget = useRef(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const LoadingIndicator = () => (
        <div className="flex justify-center items-center gap-2 text-blue-500">
            <Camera className="w-5 h-5 animate-pulse" />
            <span className="text-gray-600 dark:text-gray-400">Loading more posts...</span>
        </div>
    );

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasNextPage) {
            loadPosts();
        }
    }, [loading, hasNextPage]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '50%',
            threshold: 0.1
        });

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [handleObserver]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loadPosts = async () => {
        if (loading || (!hasNextPage && posts.length > 0)) return;
        
        setLoading(true);
        try {
            // 构建URL，包含分页参数
            const url = new URL(INSTAGRAM_API_URL);
            if (nextCursor) {
                url.searchParams.append('cursor', nextCursor);
            }
            url.searchParams.append('limit', '6'); // 每页6张图片

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch Instagram posts');
            }
            
            const data = await response.json();
            
            if (data.success) {
                setPosts(prevPosts => {
                    // 合并并去重
                    const newPosts = [...prevPosts];
                    data.data.forEach(post => {
                        if (!newPosts.some(p => p.id === post.id)) {
                            newPosts.push(post);
                        }
                    });
                    return newPosts;
                });
                
                setNextCursor(data.pagination.nextCursor);
                setHasNextPage(data.pagination.hasNextPage);
            } else {
                throw new Error(data.error || 'Failed to fetch posts');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 初始加载
    useEffect(() => {
        loadPosts();
    }, []);

    if (error) {
        return (
            <motion.div 
                className="min-h-screen flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="text-red-500 flex items-center gap-2">
                        <Image className="w-5 h-5" />
                        Error: {error}
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-black">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* 修改了标题部分的居中样式 */}
                    <motion.div 
                        {...fadeInUp} 
                        className="flex flex-col items-center justify-center text-center mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold  xl:pr-20 sm:pr-14 md:pr-12 pr-12  mb-4 text-center">
                            My{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                                Instagram
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                            A personal photo gallery    
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <InstagramIcon className="w-6 h-6 text-blue-500" />
                            <span className="text-gray-600 dark:text-gray-400">@{INSTAGRAM_USERNAME}</span>
                        </div>
                    </motion.div>

                    {posts.length === 0 && loading ? (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <LoadingIndicator />
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                variants={{
                                    show: {
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                                initial="hidden"
                                animate="show"
                            >
                                {posts.map((post, index) => (
                                    <motion.a
                                        key={post.id}
                                        href={post.permalink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group"
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            show: { opacity: 1, y: 0 }
                                        }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="
                                            relative 
                                            bg-white dark:bg-gray-800 
                                            rounded-xl
                                            shadow-lg
                                            overflow-hidden
                                            transition-all duration-300
                                            group-hover:shadow-xl
                                        ">
                                            <div className="relative aspect-square">
                                                <img
                                                    src={post.media_url}
                                                    alt={post.caption}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                                
                                                <div className="
                                                    absolute 
                                                    inset-0 
                                                    bg-gradient-to-b
                                                    from-transparent
                                                    to-black/60
                                                    opacity-0 
                                                    group-hover:opacity-100 
                                                    transition-opacity 
                                                    duration-300
                                                ">
                                                    <div className="
                                                        absolute
                                                        bottom-0
                                                        left-0
                                                        right-0
                                                        p-4
                                                        text-white
                                                    ">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Heart className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                View on Instagram
                                                            </span>
                                                        </div>
                                                        <p className="text-sm line-clamp-2">
                                                            {post.caption || 'No caption'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>

                            
                            {/* 加载指示器 - 移到网格外面确保更好的可见性 */}
                            <div 
                                ref={observerTarget} 
                                className="w-full py-8"
                            >
                                {loading && (
                                    <div className="py-4 flex justify-center">
                                        <LoadingIndicator />
                                    </div>
                                )}
                                {!hasNextPage && posts.length > 0 && (
                                    <motion.div 
                                        className="py-4 flex justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div className="
                                            bg-white dark:bg-gray-800 
                                            rounded-xl 
                                            px-6 
                                            py-3 
                                            shadow-lg
                                            text-gray-600 dark:text-gray-400
                                            flex
                                            items-center
                                            gap-2
                                        ">
                                            <Camera className="w-5 h-5" />
                                            All posts loaded
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}