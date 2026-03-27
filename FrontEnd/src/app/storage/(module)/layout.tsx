"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trophy, ArrowLeft, ArrowRight, Layers, Check, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MODULES = {
  gaya: { title: "GAYA", xp: 50, time: "15 MIN READ" },
  beban: { title: "BEBAN", xp: 50, time: "15 MIN READ" },
  tumpuan: { title: "TUMPUAN", xp: 50, time: "15 MIN READ" },
  momen: { title: "MOMEN", xp: 50, time: "15 MIN READ" },
  sambungan: { title: "SAMBUNGAN", xp: 50, time: "15 MIN READ" },
  keseimbangan: { title: "KESEIMBANGAN", xp: 50, time: "15 MIN READ" }
};

const STEPS = [
  { id: '1', title: '1. PENDAHULUAN' },
  { id: '2', title: '2. KONSEP DASAR' },
  { id: '3', title: '3. KLASIFIKASI' },
  { id: '4', title: '4. STUDI KASUS' },
  { id: 'review', title: '5. REVIEW MATERI' },
  { id: '5', title: '6. LATIHAN' }
];

export default function ModulLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  
  const moduleId = segments[1];
  const stepId = segments[2] || '1';

  const moduleInfo = MODULES[moduleId as keyof typeof MODULES] || MODULES.gaya;
  
  const currentStepIndex = STEPS.findIndex(s => s.id === stepId);
  const totalSteps = STEPS.length;
  
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const prevStep = isFirstStep ? `/storage` : `/storage/${moduleId}/${STEPS[currentStepIndex - 1].id}`;
  const nextStep = isLastStep ? `/storage` : `/storage/${moduleId}/${STEPS[currentStepIndex + 1].id}`;
  
  const progressPercent = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link href="/storage" className="inline-flex items-center text-slate-500 hover:text-violet-600 transition-colors font-bold uppercase text-xs tracking-widest mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" /> KEMBALI KE LOBBY MODUL
        </Link>
        <h1 className="font-outfit text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-4 uppercase text-slate-900 dark:text-white">
          <span className="text-violet-600">MODUL:</span> {moduleInfo.title}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 md:p-10 border-slate-200 dark:border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 dark:bg-violet-600/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col h-full min-h-[500px]">
              <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center bg-violet-600/10 text-violet-600 dark:text-violet-400 px-4 py-2 rounded-xl">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-black text-sm uppercase tracking-widest">{moduleInfo.time}</span>
                </div>
                <div className="flex items-center bg-amber-500/10 text-amber-600 dark:text-amber-500 px-4 py-2 rounded-xl">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span className="font-black text-sm uppercase tracking-widest">{moduleInfo.xp} XP</span>
                </div>
              </div>

              <div className="grow mb-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stepId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200 dark:border-white/10 gap-6 mt-auto">
                <div className="w-full md:w-1/3 space-y-2">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase block">
                    HALAMAN {currentStepIndex + 1} DARI {totalSteps}
                  </span>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-violet-600 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Link href={prevStep} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full font-black tracking-widest">
                      <ArrowLeft className="mr-2 w-4 h-4" /> SEBELUMNYA
                    </Button>
                  </Link>

                  <Link href={nextStep} className="w-full sm:w-auto">
                    {isLastStep ? (
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black tracking-widest">
                        SELESAI MODUL <Check className="ml-2 w-5 h-5" />
                      </Button>
                    ) : (
                       <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black tracking-widest">
                        SELANJUTNYA <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/8
            bg-white dark:bg-slate-900/70 backdrop-blur-xl shadow-sm dark:shadow-none p-5">

            {/* Section Title */}
            <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-slate-100 dark:border-white/5">
              <div className="w-7 h-7 rounded-xl bg-violet-600/10 dark:bg-violet-600/20 flex items-center justify-center shrink-0">
                <Layers className="text-violet-600 w-3.5 h-3.5" />
              </div>
              <h3 className="font-outfit text-xs font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">
                HALAMAN MODUL
              </h3>
            </div>

            {/* Step List */}
            <div className="flex flex-col gap-1.5">
              {STEPS.map((s) => {
                const isActive = stepId === s.id;
                return (
                  <Link key={s.id} href={`/storage/${moduleId}/${s.id}`}>
                    <div className={`
                      flex items-center justify-between px-4 py-3 rounded-xl
                      font-bold text-[10px] uppercase tracking-[0.15em]
                      transition-all duration-300 cursor-pointer border
                      ${isActive
                        ? 'bg-violet-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.3)] border-violet-500'
                        : `bg-slate-100/50 dark:bg-white/5
                           border-slate-200 dark:border-white/5
                           text-slate-500 dark:text-slate-400
                           hover:bg-slate-200 dark:hover:bg-white/10
                           hover:border-violet-500/20 dark:hover:border-violet-500/20
                           hover:text-slate-900 dark:hover:text-slate-200`
                      }
                    `}>
                      <span>{s.title}</span>
                      {isActive ? (
                        <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : (
                        <ArrowRight className="w-3 h-3 opacity-30 shrink-0" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Lobby Button */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
              <Link href="/storage">
                <Button variant="outline" className="w-full font-black tracking-widest text-xs
                  border-slate-200 dark:border-white/8
                  text-slate-500 dark:text-slate-400
                  hover:border-violet-500/60 hover:text-violet-600 dark:hover:text-violet-400
                  transition-all duration-200">
                  <Target className="w-3.5 h-3.5 mr-2" /> LOBBY MODUL
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}