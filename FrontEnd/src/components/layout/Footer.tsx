import Image from 'next/image';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-white/10 p-10 mt-20 transition-colors duration-300">
      <div className="main-container text-center">
        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 dark:text-slate-400 flex flex-nowrap items-center justify-center gap-2 sm:gap-3 overflow-visible whitespace-nowrap">
          <Image 
            src="/images/LogoStruQlibrium.png" 
            alt="StruQlibrium Logo" 
            width={28} 
            height={28} 
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
          />
          <span>© 2026 PKM-RSH Project - </span>
          <Logo size="text-[8px] sm:text-[10px]" />
          <span>Team</span>
        </div>
      </div>
    </footer>
  );
}
