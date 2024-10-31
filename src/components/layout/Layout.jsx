import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="flex dark:bg-black">
            {/* 固定的左侧导航栏 */}
            <Navbar className="w-64 sticky top-0 h-screen dark:bg-black" />
            
            {/* 主内容区域 */}
            <div className="flex-1">
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}