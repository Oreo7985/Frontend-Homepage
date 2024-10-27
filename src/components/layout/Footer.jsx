export default function Footer() {
    return (
        <footer className="bg-white shadow dark:bg-grey-800">
            <div className="container mx-auto px-4 py-6">
                <div className="text-center text-gray-600 dark:text-gray-300">
                    &copy; {new Date().getFullYear} Luhang Fang. All rights reserved
                </div>
            </div>
        </footer>
    )
}