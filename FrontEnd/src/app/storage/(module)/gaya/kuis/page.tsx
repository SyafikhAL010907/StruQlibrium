"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { 
  FileText, 
  Check, 
  ArrowRight, 
  Clock, 
  Trophy, 
  Target, 
  ArrowLeft, 
  Layers 
} from "lucide-react";
import Link from "next/link";

const modulePages = [
  { id: '', title: '1. PENDAHULUAN', isActive: false },
  { id: 'review', title: '2. REVIEW', isActive: false },
  { id: 'kuis', title: '3. KUIS', isActive: true },
];

export default function GayaKuisPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link href="/storage" className="inline-flex items-center text-slate-500 hover:text-violet-600 transition-colors font-bold uppercase text-xs tracking-widest mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" /> KEMBALI KE KATALOG
        </Link>
        <h1 className="font-outfit text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase text-slate-900 dark:text-white">
          <span className="text-violet-600">MODUL:</span> GAYA
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 md:p-10 border-slate-200 dark:border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 dark:bg-violet-600/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              {/* Module Header Info */}
              <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center bg-violet-600/10 text-violet-600 dark:text-violet-400 px-4 py-2 rounded-xl">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-black text-sm uppercase tracking-widest">20 MIN READ</span>
                </div>
                <div className="flex items-center bg-amber-500/10 text-amber-600 dark:text-amber-500 px-4 py-2 rounded-xl">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span className="font-black text-sm uppercase tracking-widest">100 XP</span>
                </div>
              </div>

              {/* Kuis Section */}
              <div className="mb-10">
                <h2 className="font-outfit text-2xl font-black uppercase mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                  <FileText className="text-violet-600 w-6 h-6" /> KUIS & EVALUASI
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  <p className="mb-4">
                    Uji pemahamanmu tentang materi Gaya melalui evaluasi ini.
                  </p>
                  <Card className="bg-slate-50 dark:bg-slate-800/50 p-6 border-slate-200 dark:border-white/10 mt-6">
                    <p className="font-bold text-center mb-0 text-slate-600 dark:text-slate-400">
                      Fitur Kuis Interaktif belum tersedia di versi ini. Akan segera hadir!
                    </p>
                  </Card>
                </div>
              </div>

              {/* Pagination Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200 dark:border-white/10 gap-6 mt-8">
                <div className="w-full md:w-1/3 space-y-2">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase block">
                    HALAMAN 3 DARI 3
                  </span>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-600 w-full rounded-full" />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Link href="/storage/modul/gaya/review" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full font-black tracking-widest">
                      <ArrowLeft className="mr-2 w-4 h-4" /> SEBELUMNYA
                    </Button>
                  </Link>
                  <Link href="/storage" className="w-full sm:w-auto">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black tracking-widest">
                      SELESAI MODUL <Check className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-slate-200 dark:border-white/10">
            <h3 className="font-outfit text-xl font-black uppercase mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <Layers className="text-violet-600 w-5 h-5" /> HALAMAN MODUL
            </h3>
            
            <div className="space-y-3">
              {modulePages.map((m) => (
                <Link key={m.title} href={`/storage/modul/gaya${m.id ? `/${m.id}` : ''}`}>
                  <div className={`flex items-center justify-between p-4 rounded-xl transition-all font-bold ${
                    m.isActive 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-white/10 border'
                  }`}>
                    <span className="text-sm uppercase tracking-wider">{m.title}</span>
                    {m.isActive ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
              <Link href="/storage">
                <Button variant="outline" className="w-full font-black tracking-widest text-xs border-slate-300 dark:border-white/20">
                  <Target className="w-4 h-4 mr-2" /> DAFTAR MODUL
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
