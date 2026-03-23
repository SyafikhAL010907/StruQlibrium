import Link from 'next/link';
import { Construction } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { CoinDisplay } from '@/components/game/CoinDisplay';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-white/10 backdrop-blur-xl transition-colors duration-300">
      <div className="main-container h-auto min-h-20 py-4 md:py-0 md:h-20 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group w-full md:w-auto justify-center md:justify-start">
          <div className="bg-linear-to-br from-violet-600 to-blue-600 p-2 rounded-xl shadow-lg group-hover:rotate-6 transition-transform">
            <Construction className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <Logo size="text-xl md:text-2xl" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] ml-0.5 text-slate-500 dark:text-slate-400">PKM-RSH Project</span>
          </div>
        </Link>
        <nav className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <CoinDisplay />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
