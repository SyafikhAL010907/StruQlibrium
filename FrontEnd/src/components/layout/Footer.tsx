import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-white/10 p-10 mt-20 transition-colors duration-300">
      <div className="main-container text-center">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
          © 2026 PKM-RSH Project - 
          <Logo size="text-[10px]" />
          Team
        </div>
      </div>
    </footer>
  );
}
