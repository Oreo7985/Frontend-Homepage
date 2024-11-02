import { useState, useEffect } from 'react';
import { INSTAGRAM_API_URL } from '../config/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Instagram() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [slideDirection, setSlideDirection] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    // 设备类型检测
    const isMobile = windowWidth <= 640;
    const isTablet = windowWidth > 640 && windowWidth <= 1024;
    
    // 根据设备类型设置每页显示的数量
    const postsPerPage = isMobile ? 10 : isTablet ? 4 : 6;

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const wasDesktop = windowWidth > 1024;
            const wasTablet = windowWidth > 640 && windowWidth <= 1024;
            const wasMobile = windowWidth <= 640;

            const isNowDesktop = newWidth > 1024;
            const isNowTablet = newWidth > 640 && newWidth <= 1024;
            const isNowMobile = newWidth <= 640;

            // 只有当设备类型改变时才重置页码
            if ((wasDesktop && !isNowDesktop) || 
                (wasTablet && !isNowTablet) || 
                (wasMobile && !isNowMobile)) {
                setCurrentPage(1);
                setSlideDirection(0);
            }

            setWindowWidth(newWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

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

    // 计算当前页的帖子
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setSlideDirection(1);
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setSlideDirection(-1);
            setCurrentPage(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="flex-1 dark:bg-gray-950">
            <div className="min-h-screen flex items-center">
                {/* 移动端添加顶部内边距 */}
                <div className={`container mx-auto px-4 ${isMobile ? 'pt-20' : 'py-8'}`}>
                    <div className="relative max-w-[1400px] mx-auto px-16 md:px-20">
                        {/* 桌面端和平板端的导航按钮 */}
                        {isMounted && !isMobile && (
                            <>
                                {currentPage > 1 && (
                                    <button
                                        onClick={goToPrevPage}
                                        className="absolute -left-4 top-1/2 -translate-y-1/2
                                                 p-3 rounded-full bg-gray-800/50 backdrop-blur-sm
                                                 text-white hover:bg-gray-700 transition-colors
                                                 hidden md:flex items-center justify-center z-10"
                                        aria-label="Previous page"
                                    >
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>
                                )}
                                {currentPage < totalPages && (
                                    <button
                                        onClick={goToNextPage}
                                        className="absolute -right-4 top-1/2 -translate-y-1/2
                                                 p-3 rounded-full bg-gray-800/50 backdrop-blur-sm
                                                 text-white hover:bg-gray-700 transition-colors
                                                 hidden md:flex items-center justify-center z-10"
                                        aria-label="Next page"
                                    >
                                        <ChevronRight className="w-8 h-8" />
                                    </button>
                                )}
                            </>
                        )}

                        {/* 图片网格 */}
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={currentPage}
                                initial={{ 
                                    x: slideDirection * 1000,
                                    opacity: 0 
                                }}
                                animate={{ 
                                    x: 0,
                                    opacity: 1 
                                }}
                                exit={{ 
                                    x: slideDirection * -1000,
                                    opacity: 0 
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                className={`grid gap-6 md:gap-8 lg:gap-10
                                    ${isMobile ? 'grid-cols-1' : 
                                      isTablet ? 'grid-cols-2' : 
                                      'grid-cols-3'}
                                `}
                            >
                                {currentPosts.map(post => (
                                    <a
                                        key={post.id}
                                        href={post.permalink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                            relative group aspect-square 
                                            ${isMobile ? 'w-full max-w-[400px]' : 
                                              isTablet ? 'w-full' : 
                                              'w-full'}
                                            mx-auto
                                        `}
                                    >
                                        <img
                                            src={post.media_url}
                                            alt={post.caption}
                                            className="w-full h-full object-cover rounded-lg shadow-lg"
                                        />
                                        
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
                                                px-6 py-4 text-center
                                                text-sm sm:text-base lg:text-lg
                                            ">
                                                {post.caption?.substring(0, 100) || 'View on Instagram'}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* 移动端的分页控制 */}
                        {isMounted && isMobile && (
                            <div className="mt-8 flex justify-center gap-4">
                                {currentPage > 1 && (
                                    <button
                                        onClick={goToPrevPage}
                                        className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700 transition-colors"
                                        aria-label="Previous page"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                )}
                                <span className="flex items-center text-white">
                                    {currentPage} / {totalPages}
                                </span>
                                {currentPage < totalPages && (
                                    <button
                                        onClick={goToNextPage}
                                        className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700 transition-colors"
                                        aria-label="Next page"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}