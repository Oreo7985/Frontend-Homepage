import { SunIcon, MoonIcon } from 'lucide-react';

export default function Header({ isDark, onToggleDark }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16
                       bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md
                       border-b border-zinc-200/50 dark:border-zinc-800/50">
      <span className="font-mono text-xs tracking-[0.25em] uppercase text-zinc-900 dark:text-zinc-100">
        Luhang Fang
      </span>

      <nav className="hidden sm:flex items-center gap-8 text-xs tracking-wide text-zinc-500 dark:text-zinc-500">
        {['About', 'Projects', 'Instagram'].map(s => (
          <a
            key={s}
            href={`#${s.toLowerCase()}`}
            className="hover:text-violet-400 transition-colors duration-200"
          >
            {s}
          </a>
        ))}
      </nav>

      <button
        onClick={onToggleDark}
        aria-label="Toggle dark mode"
        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
      >
        {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
      </button>
    </header>
  );
}
