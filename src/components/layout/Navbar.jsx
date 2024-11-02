// Navbar.jsx
import {HomeIcon, UserIcon, SendIcon, Briefcase, InstagramIcon, SunIcon, Menu, X} from 'lucide-react';
import {Link} from 'react-router-dom';

function NavItem({to, icon: Icon, children}) {
    return (
        <Link
            to={to}
            className="text-white h-10 flex items-center gap-3 transition-colors hover:text-gray-300 px-3 rounded-lg hover:bg-gray-800/50"
        >
            <Icon className="w-5 h-5" strokeWidth={1.5}/>
            {children && (
              <span className="text-base leading-none">
                {children}
              </span>
            )}
        </Link>
    )
}

export default function Navbar({ className, isOpen, onToggle }) {
    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={onToggle}
                className="xl:hidden fixed top-4 left-4 z-50 text-white p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>

            <nav className={`
                ${className}
                dark:bg-black/95
                backdrop-blur-sm
                transition-transform duration-300 ease-in-out
                xl:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                fixed
                top-0
                left-0
                z-40
                h-screen
                border-r border-gray-800/50
            `}>
                <div className="h-full flex flex-col">
                    <div className="flex-1"/>
                    
                    <div className="flex flex-col items-center gap-12">
                        {/* Logo Section */}
                        <div className="px-3">
                            <a href="" className="text-2xl sm:text-3xl md:text-4xl font-mono tracking-widest text-white hover:text-gray-300 transition-colors">
                                LUHANG
                            </a>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col gap-1">
                            <NavItem to="/" icon={HomeIcon}>Home</NavItem>
                            <NavItem to="/about" icon={UserIcon}>About</NavItem>
                            <NavItem to="/projects" icon={Briefcase}>Projects</NavItem>
                            <NavItem to="/instagram" icon={InstagramIcon}>Instagram</NavItem>
                            <NavItem to="/contact" icon={SendIcon}>Contact</NavItem>
                        </div>
                        
                        {/* Theme Toggle */}
                        <div className="px-3">
                            <NavItem to="" icon={SunIcon}/>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex items-end p-4">
                        <div className='px-3 py-6 text-center'>
                            <p className="text-sm text-gray-300/50 italic">
                                &copy; {new Date().getFullYear()} Luhang Fang
                            </p>
                            <p className='text-sm text-gray-300/50 italic'>
                                All rights reserved
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}