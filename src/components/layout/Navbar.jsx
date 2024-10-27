export default function Navbar() {
    return (
        <nav className="bg-white shadow dark:bg-gray-800 h-full w-64 fixed">
            <div className="container mx-auto py-4">
                <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center mb-8">
                        <a href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
                        Luhang Fang
                        </a>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <a href="/" className=" text-gray-800 dark:text-white py-2">
                            Home
                        </a>
                        <a href="/about" className="text-gray-800 dark:text-white py-2">
                            About
                        </a>
                        <a href="/projects" className="text-gray-800 dark:text-white py-2">
                            Projects
                        </a>
                        <a href="/contact" className="text-gray-800 dark:text-white py-2">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}