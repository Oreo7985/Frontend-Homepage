import {HomeIcon, UserIcon, Briefcase, InstagramIcon, SunIcon, Menu, X} from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';

function NavItem({to, icon: Icon, children}) {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
        <Link
            to={to}
            className={`
                h-10 flex items-center gap-3 px-4
                transition-all duration-200
                rounded-lg
                ${isActive 
                    ? 'text-white bg-gray-800/50' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/30'}
            `}
        >
            <Icon 
                className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} 
                strokeWidth={1.5}
            />
            {children && (
              <span className={`
                text-base leading-none transition-opacity
                ${isActive ? 'opacity-100' : 'opacity-80'}
              `}>
                {children}
              </span>
            )}
        </Link>
    )
}

export default function Navbar({ className, isOpen, onToggle }) {
    const location = useLocation();
    
    return (
        <>
            {/* Mobile Menu Button - 亮色/暗色模式适配 */}
            <button
                onClick={onToggle}
                className="xl:hidden fixed top-4 left-4 z-50 p-2 
                         bg-white dark:bg-gray-800/50 
                         text-gray-800 dark:text-white
                         rounded-lg backdrop-blur-sm
                         hover:bg-gray-100 dark:hover:bg-gray-700/50
                         transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>

            {/* 导航栏 */}
            <nav className={`
                ${className}
                bg-white/80 dark:bg-black/95
                backdrop-blur-sm
                transition-all duration-300
                xl:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                fixed
                top-0
                left-0
                z-40
                h-screen
                border-r border-gray-200 dark:border-gray-800/50
                shadow-lg
            `}>
                <div className="h-full flex flex-col">
                    <div className="flex-1"/>
                    
                    <div className="flex flex-col items-center gap-12">
                        {/* Logo Section */}
                        <div className="px-3 relative">
                            <Link 
                                to="/" 
                                className="text-2xl sm:text-3xl md:text-4xl 
                                         font-mono tracking-widest 
                                         text-gray-900 dark:text-white 
                                         hover:text-gray-600 dark:hover:text-gray-300 
                                         transition-colors"
                            >
                                LUHANG
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col gap-2 w-full px-3">
                            <NavItem to="/" icon={HomeIcon}>Home</NavItem>
                            <NavItem to="/about" icon={UserIcon}>About</NavItem>
                            <NavItem to="/projects" icon={Briefcase}>Projects</NavItem>
                            <NavItem to="/instagram" icon={InstagramIcon}>Instagram</NavItem>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex-1 flex items-end p-4">
                        <div className='px-3 py-6 text-center w-full'>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                &copy; {new Date().getFullYear()} Luhang Fang
                            </p>
                            <p className='text-sm text-gray-500 dark:text-gray-400 italic'>
                                All rights reserved
                            </p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 移动端遮罩层 */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 dark:bg-black/50 xl:hidden z-30 backdrop-blur-sm"
                    onClick={onToggle}
                />
            )}
        </>
    )
}