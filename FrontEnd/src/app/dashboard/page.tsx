"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { BookMarked, Swords, History, Settings, ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import { useGameState } from "@/hooks/useGameState";

export default function DashboardPage() {
  const { coins } = useGameState();

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="font-outfit text-4xl md:text-7xl font-black tracking-tight mb-4 uppercase">
          MISSION <span className="gradient-text">CONTROL.</span>
        </h1>
        <p className="font-bold text-base md:text-lg">Engineer, pilih operasi yang ingin Anda jalankan hari ini.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {[
          {
            title: "Knowledge Storage",
            desc: "Akses modul pembelajaran statika yang terstruktur dan mudah dipahami.",
            href: "/storage",
            icon: <BookMarked className="w-8 h-8" />,
            color: "from-violet-600! to-indigo-600!",
            delay: 0.1,
            stats: "3 Topik Tersedia"
          },
          {
            title: "Battlefield",
            desc: "Uji pengetahuanmu, kumpulkan koin, dan naikkan level kompetensimu.",
            href: "/battlefield",
            icon: <Swords className="w-8 h-8" />,
            color: "from-blue-600! to-cyan-600!",
            delay: 0.2,
            stats: "Arena Terbuka"
          },
          {
            title: "Bank Soal",
            desc: "Perdalam kompetensi teknik Anda dengan latihan soal mandiri berdasarkan topik modul.",
            href: "/BankSoal",
            icon: <History className="w-8 h-8" />,
            color: "from-amber-500! to-orange-600!",
            delay: 0.3,
            stats: "Latihan Mandiri"
          }
        ].map((item) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay, type: "spring", stiffness: 100 }}
          >
            <Link href={item.href} className="group block h-full">
              <Card className="h-full flex flex-col p-10 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 overflow-hidden relative border-slate-200 dark:border-white/5 rounded-[2.5rem]!">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${item.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`} />
                <div className={`bg-linear-to-br ${item.color} text-white w-16 h-16 flex items-center justify-center mb-8 rounded-2xl shadow-lg ring-4 ring-white/5 group-hover:rotate-6 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge-text text-[10px] font-black uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-white/5">
                      {item.stats}
                    </span>
                  </div>
                  <h2 className="font-outfit text-2xl md:text-3xl font-black uppercase mb-4 tracking-tight group-hover:text-violet-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="font-bold leading-relaxed text-base md:text-lg grow">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-10 flex items-center font-outfit font-black text-sm uppercase tracking-widest text-violet-600 dark:text-violet-400 group-hover:translate-x-2 transition-transform">
                  BUKA OPERASI <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 max-w-5xl mx-auto"
      >
        <Card className="p-10 relative overflow-hidden group border-slate-200 dark:border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="grow w-full">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h3 className="font-outfit text-2xl font-black uppercase tracking-tight">STATUS PROGRES</h3>
              </div>
              <p className="font-bold mb-8">Anda telah mengumpulkan <span className="text-violet-600 dark:text-violet-400 font-black">{coins} koin</span> untuk proyek ini.</p>

              <div className="relative h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-white/5">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-violet-600 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((coins / 500) * 100, 100)}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">RANK: APPRENTICE</span>
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">NEXT: ENGINEER (500)</span>
              </div>
            </div>

            <div className="shrink-0">
              <Button variant="outline" className="border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10">
                <Settings className="mr-2 w-5 h-5" /> PENGATURAN
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
