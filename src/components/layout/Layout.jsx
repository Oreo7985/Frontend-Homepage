import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex">
            {/* 左侧导航栏 */}
            <Navbar className="w-64 h-screen dark:bg-gray-950" />
            
            {/* 主内容区域 */}
            <div className="flex-1 flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}