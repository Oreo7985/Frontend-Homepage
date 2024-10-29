import {HomeIcon, UserIcon, CodeIcon, MailIcon, BriefcaseBusinessIcon, SendIcon, InstagramIcon, Moon, SunIcon, Menu, X} from 'lucide-react';
import {useState} from 'react';

function NavItem({href, icon: Icon, children}) {
    return (
        <a
            href={href}
            className="text-white flex items-center gap-3 transition-colors"
        >
            <Icon size={25} strokeWidth={1.5} className="gap"/>
            {children}
        </a>
    )
}

export default function Navbar({className}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        {/* Mobile Hamburger Button */}
        <button
            onClick={toggleMenu}
            className="lg:hidden fixed top-4 right-4 z-50 text-white p-2"
        >
            {isOpen ? <X size={25}/> : <Menu size={25}/>}
        </button>

            {/* 导航栏 */}
        <nav className={`
                ${className}
                dark:bg-black
                transition-transform duration-300
                lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:relative fixed
                z-40
            `}>
            <div className="p-4 flex flex-col h-full">
                <div className="flex flex-col space-y-6 justify-start ml-11 my-auto">
                    <div className="py-10">
                        <a href="" className="text-4xl font-mono tracking-widest text-white">LUHANG</a>
                    </div>
                    <NavItem href="/" icon={HomeIcon}>Home</NavItem>
                    <NavItem href="/about" icon={UserIcon}>About</NavItem>
                    <NavItem href="/projects" icon={BriefcaseBusinessIcon}>Projects</NavItem>
                    <NavItem href="" icon={InstagramIcon}>Instagram</NavItem>
                    <NavItem href="/contact" icon={SendIcon}>Contact</NavItem>

                    <div className='py-10'>
                        <p className="text-gray-300/50 italic">&copy; {new Date().getFullYear()} Luhang Fang</p>
                        <p className='text-gray-300/50 italic'>All rights reserved</p>
                    </div>
                </div>
                <div className='flex justify-end m-5'>
                    <NavItem href="" icon={SunIcon} ></NavItem>
                </div>
            </div>
        </nav>
        </>
    )
}