import {HomeIcon, UserIcon, CodeIcon, MailIcon, BriefcaseBusinessIcon, SendIcon, InstagramIcon, Moon, SunIcon} from 'lucide-react';


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
    return (
        <nav className={`dark:bg-black ${className}`}>
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
    )
}