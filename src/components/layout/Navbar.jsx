import {HomeIcon, UserIcon, Briefcase, InstagramIcon, SunIcon, Menu, X} from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';

function NavItem({to, icon: Icon, children, onNavigate}) {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
        <Link
            to={to}
            onClick={onNavigate}
            className={`
                h-10 flex items-center gap-3 px-4
                transition-all duration-300
                rounded-lg
                ${isActive 
                    ? 'text-white bg-gray-800/50' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/30'}
            `}
        >
            <Icon 
                className="w-5 h-5" 
                strokeWidth={1.5}
            />
            {children && (
              <span className={`
                text-base leading-none
                transition-opacity duration-300
                font-medium
                ${isActive ? 'opacity-100' : 'opacity-90'}
              `}>
                {children}
              </span>
            )}
        </Link>
    )
}

export default function Navbar({ className, isOpen, onToggle }) {
    const location = useLocation();
    
    const handleNavigation = () => {
        if (window.innerWidth < 1280) {
            onToggle();
        }
    };
    
    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={onToggle}
                className="xl:hidden fixed top-4 left-4 z-50 p-2 
                         bg-white dark:bg-gray-800/50 
                         text-gray-800 dark:text-white
                         rounded-lg backdrop-blur-sm
                         hover:bg-gray-100 dark:hover:bg-gray-700/50
                         transition-colors duration-300"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>

            {/* 导航栏 */}
            <nav className={`
                ${className}
                bg-white/80 dark:bg-black/95
                backdrop-blur-sm
                transition-all duration-300 ease-in-out
                xl:translate-x-0 xl:opacity-100
                fixed
                top-0
                left-0
                z-40
                h-screen
                border-r border-gray-200 dark:border-gray-800/50
                shadow-lg
                ${isOpen 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-full opacity-0'}
            `}>
                <div className="h-full flex flex-col">
                    <div className="flex-1"/>
                    
                    <div className="flex flex-col items-center gap-12">
                        {/* Logo Section */}
                        <div className="px-3">
                            <Link 
                                to="/" 
                                onClick={handleNavigation}
                                className="text-2xl sm:text-3xl md:text-4xl 
                                         font-mono tracking-widest 
                                         text-gray-900 dark:text-white 
                                         hover:text-gray-600 dark:hover:text-gray-300 
                                         transition-colors duration-300"
                            >
                                LUHANG
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col gap-2 w-full px-3">
                            <NavItem to="/" icon={HomeIcon} onNavigate={handleNavigation}>Home</NavItem>
                            <NavItem to="/about" icon={UserIcon} onNavigate={handleNavigation}>About</NavItem>
                            <NavItem to="/projects" icon={Briefcase} onNavigate={handleNavigation}>Projects</NavItem>
                            <NavItem to="/instagram" icon={InstagramIcon} onNavigate={handleNavigation}>Instagram</NavItem>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex-1 flex items-end p-4">
                        <div className='px-3 py-6 text-center w-full'>
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                &copy; {new Date().getFullYear()} Luhang Fang
                            </p>
                            <p className='text-sm text-gray-600 dark:text-gray-400 italic'>
                                All rights reserved
                            </p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 移动端遮罩层 - 添加淡入淡出效果 */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 dark:bg-black/50 xl:hidden z-30 backdrop-blur-sm
                             animate-fadeIn"
                    onClick={onToggle}
                    style={{
                        animation: 'fadeIn 0.3s ease-in-out'
                    }}
                />
            )}
        </>
    )
}

