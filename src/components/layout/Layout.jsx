// Layout.jsx
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="flex">
            {/* 导航栏 */}
            <Navbar 
                isOpen={isNavOpen} 
                onToggle={() => setIsNavOpen(!isNavOpen)} 
                className="w-[240px] xl:w-64"
            />

            {/* 遮罩层 */}
            {isNavOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm xl:hidden z-30"
                    onClick={() => setIsNavOpen(false)}
                />
            )}

            {/* 主内容区域 - 添加左边距来避免被导航栏遮挡 */}
            <main className="flex-1 ml-0 xl:ml-64 min-h-screen dark:bg-black">
                <Outlet />
            </main>
        </div>
    )
}
