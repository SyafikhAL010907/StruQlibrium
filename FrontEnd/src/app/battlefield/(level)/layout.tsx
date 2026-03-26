"use client";

import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Timer, Heart, ChevronLeft, ChevronRight, 
  Ruler, Drill, HardHat, BookOpen, CheckCircle 
} from "lucide-react";

// --- CONTEXT DEFINITION ---
interface MissionInput {
  [key: string]: number | undefined;
}

interface BattlefieldContextType {
  inputs: MissionInput;
  setInputs: React.Dispatch<React.SetStateAction<MissionInput>>;
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  showAnswer: boolean;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: "easy" | "medium" | "hard";
  theme: any;
  checkAns: () => void;
  setCheckFn: (fn: (i: MissionInput) => boolean) => void;
  handleChange: (key: string, value: number) => void;
}

const BattlefieldContext = createContext<BattlefieldContextType | undefined>(undefined);

export const useBattlefield = () => {
  const context = useContext(BattlefieldContext);
  if (!context) throw new Error("useBattlefield must be used within a BattlefieldProvider");
  return context;
};

// --- MASTER LAYOUT COMPONENT ---
export default function BattlefieldLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // URL Parsing
  const difficultyMatch = pathname.match(/battlefield\/(easy|medium|hard)/);
  const difficulty = (difficultyMatch ? difficultyMatch[1] : "easy") as "easy" | "medium" | "hard";
  
  const stepMatch = pathname.match(/\/(\d+)(\/|$)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
  const TOTAL_STEPS = 5; // Dynamic steps support

  // State
  const [inputs, setInputs] = useState<MissionInput>({
    L: 6, P: 20, a: 3, oh: 2, w: 4, w_max: 10, M_load: 30, 
    P_buckle: 50, W_veh: 40, veh_x: 3, Sx: 40, Sy: -20, 
    Txy: 30, H_wall: 6, gamma: 18, Mp: 60
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCheckFn, setCurrentCheckFn] = useState<((i: MissionInput) => boolean) | null>(null);

  // Reset inputs when mission changes? (Optional but recommended for stability)
  // Non-destructive reset: we only reset success status.
  useEffect(() => {
    setIsSuccess(false);
    setShowAnswer(false);
    // Explicitly reset currentCheckFn to avoid previous mission logic sticking around
    setCurrentCheckFn(null);
  }, [pathname]);

  const theme = useMemo(() => {
    const themes: Record<string, any> = {
      easy: { color: "emerald", text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500', light: 'bg-emerald-100 dark:bg-emerald-500/20', hex: '#34d399' },
      medium: { color: "blue", text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500', light: 'bg-blue-100 dark:bg-blue-500/20', hex: '#60a5fa' },
      hard: { color: "rose", text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500', light: 'bg-rose-100 dark:bg-rose-500/20', hex: '#fb7185' }
    };
    return themes[difficulty] || themes.easy;
  }, [difficulty]);

  const handleChange = useCallback((key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setIsSuccess(false);
  }, []);

  const checkAns = useCallback(() => {
    if (currentCheckFn) {
      const valid = currentCheckFn(inputs);
      setIsSuccess(valid);
      if (valid) setShowAnswer(false);
    }
  }, [currentCheckFn, inputs]);

  const setCheckFn = useCallback((fn: (i: MissionInput) => boolean) => {
    setCurrentCheckFn(() => fn);
  }, []);

  const pLink = currentStep > 1 ? `/battlefield/${difficulty}/${currentStep - 1}` : `/battlefield/`;
  const nLink = currentStep < TOTAL_STEPS ? `/battlefield/${difficulty}/${currentStep + 1}` : `/battlefield/`;

  const contextValue = useMemo(() => ({
    inputs, setInputs, isSuccess, setIsSuccess,
    showAnswer, setShowAnswer, difficulty, theme,
    checkAns, setCheckFn, handleChange
  }), [inputs, isSuccess, showAnswer, difficulty, theme, checkAns, setCheckFn, handleChange]);

  return (
    <BattlefieldContext.Provider value={contextValue}>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* HUD System */}
        <div className="flex justify-between items-center mb-8 px-6 bg-slate-900 dark:bg-black/80 border border-white/5 p-4 rounded-2xl shadow-2xl">
           <div className="flex gap-8 items-center">
              <div className="flex items-center gap-2 text-rose-500 font-black uppercase tracking-tighter text-sm">
                <Heart className={`w-5 h-5 fill-current ${difficulty === 'hard' ? "animate-pulse" : ""}`}/> 
                {difficulty === 'hard' ? "50" : "100"} HP
              </div>
              <div className={`flex items-center gap-2 font-black font-mono text-lg ${theme.text}`}>
                <Timer className="w-5 h-5"/> {difficulty === 'hard' ? "05:00" : difficulty === 'medium' ? "10:00" : "15:00"}
              </div>
           </div>
           <div className="font-outfit font-black tracking-[0.4em] text-[10px] md:text-xs uppercase text-white/40">
             OPERASI: {difficulty.toUpperCase()}
           </div>
        </div>

        {/* Progress Board */}
        <div className="mb-12 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 p-8 rounded-[3rem] shadow-2xl shadow-slate-900/10 backdrop-blur-md">
          <div className="flex flex-col gap-10">
            <div className="flex justify-between items-center px-4">
              <span className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">Progress Operasi</span>
              <span className={`text-[12px] font-black uppercase ${theme.text} ${theme.light} px-4 py-1.5 rounded-full shadow-inner ring-1 ring-current/30`}>
                {currentStep}/{TOTAL_STEPS} SELESAI
              </span>
            </div>
            
            <div className="relative flex justify-between items-center h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-8">
              <div 
                className={`absolute left-0 top-0 h-full bg-current transition-all duration-700 rounded-full shadow-lg ${theme.text}`} 
                style={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%`, backgroundColor: theme.hex }}
              />
              
              {[...Array(TOTAL_STEPS)].map((_, i) => {
                const s = i + 1;
                return (
                  <Link key={s} href={`/battlefield/${difficulty}/${s}`}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-[1.25rem] md:rounded-3xl flex items-center justify-center font-black text-base z-10 transition-all duration-500 border-2 ${
                      s === currentStep 
                        ? `${theme.bg} text-white border-transparent scale-125 shadow-xl` 
                        : s < currentStep 
                          ? `${theme.light} ${theme.text} border-transparent` 
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-400"
                    }`}
                  >
                    {s}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Engineering Sandbox Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-stretch">
          {/* Aside (Sidebar) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 h-full order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/5 p-6 sm:p-10 rounded-3xl sm:rounded-[3rem] shadow-xl backdrop-blur-2xl relative overflow-hidden flex flex-col h-full min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col flex-1"
                >
                  {children}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons integrated into Aside */}
              <div className="mt-auto pt-8 space-y-4 relative z-10 w-full">
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={checkAns} 
                  className={`w-full py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[12px] transition-all ${theme.bg} text-white shadow-xl border-t border-white/20`}
                >
                  Validasi Parameter
                </motion.button>
                
                <button onClick={() => setShowAnswer(!showAnswer)} className="w-full py-3 sm:py-4 rounded-xl font-black uppercase tracking-widest text-[9px] bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  <BookOpen size={14} /> {showAnswer ? 'TUTUP TARGET' : 'LIHAT TARGET DATA'}
                </button>

                <div className="pt-2 grid grid-cols-2 gap-3">
                  <Link href={pLink} className="block w-full">
                    <button className="w-full py-3 sm:py-4 rounded-xl font-black uppercase tracking-widest text-[9px] bg-white dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> SEBELUMNYA
                    </button>
                  </Link>
                  
                  <Link href={nLink} className="block w-full">
                    <button className="w-full py-3 sm:py-4 rounded-xl font-black uppercase tracking-widest text-[9px] bg-white dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                      {currentStep === TOTAL_STEPS ? "SELESAIKAN" : "SELANJUTNYA"} <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                <AnimatePresence>
                  {isSuccess && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`mt-4 sm:mt-6 p-4 sm:p-5 rounded-[1.2rem] flex flex-col items-center gap-3 sm:gap-4 font-black uppercase text-[9px] sm:text-[10px] bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 w-full`}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle size={18}/> Parameter Valid! Lanjut!
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </aside>

          {/* Main (Visualizer) */}
          <main className="lg:col-span-8 h-full flex flex-col order-1 lg:order-2">
            <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-4 sm:p-10 lg:p-12 rounded-4xl sm:rounded-[4rem] shadow-xl backdrop-blur-3xl flex flex-col h-full min-h-[600px] relative ring-1 ring-slate-100 dark:ring-white/10">
               <div className="flex items-center justify-between mb-6 sm:mb-12 opacity-50 dark:opacity-30">
                  <div className="flex items-center gap-2 sm:gap-3 px-2 py-1 rounded-md bg-white/10 dark:bg-slate-950/20 shadow-inner ring-1 ring-slate-100 dark:ring-white/5 backdrop-blur-sm">
                    <Ruler size={13} className={difficulty === 'hard' ? "text-rose-500" : "text-blue-500"} />
                    <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.8em] text-slate-800/80 dark:text-white/60">Engineering Sandbox</span>
                  </div>
                  <div className="flex gap-3 sm:gap-4 text-slate-600 dark:text-slate-400">
                    <Drill size={14} />
                    <HardHat size={14} />
                  </div>
               </div>

               <div className="grow bg-slate-50 dark:bg-[#000000]/70 rounded-3xl sm:rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-inner relative overflow-hidden flex items-center justify-center p-4 sm:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={pathname}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div id="visualizer-portal" className="relative z-20 w-full h-full flex items-center justify-center">
                        {/* Content will be injected here via children/CSS */}
                      </div>
                    </motion.div>
                  </AnimatePresence>
               </div>
            </div>
          </main>
        </div>
      </div>
    </BattlefieldContext.Provider>
  );
}