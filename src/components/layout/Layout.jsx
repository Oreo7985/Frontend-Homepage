import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <div className="flex">
            <Navbar
                isOpen={isNavOpen}
                onToggle={() => setIsNavOpen(!isNavOpen)}
                className="w-[240px] xl:w-64"
                isDark={isDark}
                onToggleDark={() => setIsDark(d => !d)}
            />

            {isNavOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm xl:hidden z-30"
                    onClick={() => setIsNavOpen(false)}
                />
            )}

            <main className="flex-1 ml-0 xl:ml-64 min-h-screen dark:bg-black">
                <Outlet />
            </main>
        </div>
    );
}
