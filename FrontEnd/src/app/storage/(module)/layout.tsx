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
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link href="/storage" className="inline-flex items-center text-slate-500 hover:text-violet-600 transition-colors font-bold uppercase text-xs tracking-widest mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" /> KEMBALI KE LOBBY MODUL
        </Link>
        <h1 className="font-outfit text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase text-slate-900 dark:text-white">
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
          <Card className="p-6 border-slate-200 dark:border-white/10">
            <h3 className="font-outfit text-xl font-black uppercase mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <Layers className="text-violet-600 w-5 h-5" /> HALAMAN MODUL
            </h3>
            
            <div className="space-y-3">
              {STEPS.map((s) => {
                const isActive = stepId === s.id;
                return (
                  <Link key={s.id} href={`/storage/${moduleId}/${s.id}`}>
                    <div className={`flex items-center justify-between p-4 rounded-xl transition-all font-bold ${
                      isActive 
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-white/10 border'
                    }`}>
                      <span className="text-sm uppercase tracking-wider">{s.title}</span>
                      {isActive ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4 opacity-50" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
              <Link href="/storage">
                <Button variant="outline" className="w-full font-black tracking-widest text-xs border-slate-300 dark:border-white/20">
                  <Target className="w-4 h-4 mr-2" /> LOBBY MODUL
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}