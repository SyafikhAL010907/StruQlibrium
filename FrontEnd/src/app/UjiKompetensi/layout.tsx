"use client";

import { UjiProvider, useUji } from "./context/UjiContext";
import { Timer, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function UjiLayoutContent({ children }: { children: React.ReactNode }) {
  const { timeLeft } = useUji();
  const pathname = usePathname();
  
  // Extract question number from pathname (e.g., /UjiKompetensi/soal1 -> 1)
  const currentSoalMatch = pathname.match(/soal(\d+)/);
  const currentSoal = currentSoalMatch ? parseInt(currentSoalMatch[1]) : 1;

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  
  const isCritical = timeLeft < 300; // < 5 minutes

  return (
    <div className="min-h-screen! bg-slate-50! dark:bg-[#020617]! text-slate-900! dark:text-white! pb-20!">
      {/* Timer HUD & Header */}
      <header className="sticky! top-0! z-50! bg-white/80! dark:bg-slate-950/80! backdrop-blur-xl! border-b! border-slate-200! dark:border-white/5! py-4! px-6!">
        <div className="container! mx-auto! flex! items-center! justify-between!">
          <div className="flex! items-center! gap-4!">
             <div className="w-10! h-10! rounded-xl! bg-violet-600! flex! items-center! justify-center! text-white! font-black!">
                <CheckSquare className="w-6! h-6!" />
             </div>
             <div>
                <h1 className="text-sm! font-black! uppercase! tracking-widest!">Uji Kompetensi</h1>
                <p className="text-[10px]! font-bold! text-slate-400! uppercase!">The Final Boss Mission</p>
             </div>
          </div>

          <motion.div 
            animate={isCritical ? { 
              scale: [1, 1.05, 1], 
              x: [0, -2, 2, -2, 2, 0] 
            } : {}}
            transition={{ 
              repeat: Infinity, 
              duration: 0.5,
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
            }}
            className={`flex! items-center! gap-3! px-6! py-3! rounded-2xl! border-2! bg-slate-50! dark:bg-white/5! ${isCritical ? 'border-red-500! text-red-500! shadow-[0_0_20px_rgba(239,68,68,0.3)]!' : 'border-slate-100! dark:border-white/5!'}`}
          >
            <Timer className={`w-5! h-5! ${isCritical ? 'animate-pulse!' : ''}`} />
            <span className="text-2xl! font-black! font-mono!">{m}:{s.toString().padStart(2, '0')}</span>
          </motion.div>
        </div>
      </header>

      {/* Progress Bar Container */}
      <div className="container! mx-auto! px-6! mt-8!">
        <div className="flex! items-center! justify-between! mb-2!">
           <span className="text-[10px]! font-black! text-slate-400! uppercase! tracking-widest!">Progress Ujian</span>
           <span className="text-[10px]! font-black! text-violet-600! uppercase! tracking-widest!">{currentSoal}/20 SELESAI</span>
        </div>
        <div className="w-full! h-2! bg-slate-200! dark:bg-white/10! rounded-full! overflow-hidden!">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${(currentSoal / 20) * 100}%` }}
             className="h-full! bg-linear-to-r! from-violet-600! to-fuchsia-500!"
           />
        </div>
      </div>

      <main className="container! mx-auto! px-4! mt-10!">
        {children}
      </main>

      <div className="fixed! bottom-6! left-0! right-0! z-40! px-6!">
         <div className="container! mx-auto! bg-white/90! dark:bg-slate-900/90! backdrop-blur-lg! border! border-slate-200! dark:border-white/5! p-4! rounded-[2.5rem]! shadow-2xl! flex! items-center! justify-center!">
            <p className="text-[10px]! font-black! text-slate-400! uppercase! tracking-widest!">
               "Ini adalah ujian sesungguhnya. Kerjakan dengan teliti!"
            </p>
         </div>
      </div>
    </div>
  );
}

export default function UjiLayout({ children }: { children: React.ReactNode }) {
  return (
    <UjiProvider>
      <UjiLayoutContent>{children}</UjiLayoutContent>
    </UjiProvider>
  );
}
