// ========================ini code app/storage/materi/page.tsx======
"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  ChevronRight, 
  Search, 
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { subjects, materials } from "@/data/materials";
import { useState } from "react";
import { Subject, Material } from "@/types";

export default function SubjectCatalog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");

  // Functional Search Logic
  const filteredSubjects = subjects.filter((subject: Subject) => {
    const matchesSubject = subject.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModules = materials.some((m: Material) => 
      m.subjectId === subject.id && m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const isSelectedRole = selectedSubjectId === 'all' || subject.id === selectedSubjectId;
    return isSelectedRole && (matchesSubject || matchesModules);
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-16"
      >
        <Link href="/dashboard" className="inline-flex items-center text-slate-500! hover:text-violet-600! transition-colors font-bold uppercase text-xs tracking-widest mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" /> BACK TO DASHBOARD
        </Link>
        
        <h1 className="font-outfit text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 uppercase text-slate-900! dark:text-white!">
          MATERI <span className="gradient-text">KATALOG</span>
        </h1>
        <p className="font-bold text-base md:text-lg max-w-2xl text-slate-600! dark:text-slate-400!">
          Temukan koleksi lengkap materi teknik sipil yang terorganisir sejajar.
        </p>
      </motion.div>

      {/* Parallel Header - Search Left, Filters Right */}
      <div className="flex flex-row! items-center! justify-between! w-full! gap-6 mb-16">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi atau modul..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2! border-slate-200! dark:border-white/10! bg-white! dark:bg-slate-950! text-slate-900! dark:text-white! focus:outline-hidden focus:ring-2! focus:ring-violet-500! transition-all font-bold placeholder:text-slate-400!"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button 
              onClick={() => setIsOpen(!isOpen)}
              className="font-black uppercase text-[10px] tracking-widest h-12 px-6 rounded-xl border-2! bg-white! dark:bg-slate-950! text-slate-900! dark:text-white! border-slate-200! dark:border-white/10! flex items-center gap-3 hover:border-violet-600!"
            >
              FILTER <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="absolute top-full right-0 mt-3 w-64 bg-white! dark:bg-slate-950! border-2! border-slate-200! dark:border-white/10! rounded-2xl shadow-2xl! z-50 overflow-hidden"
                >
                  <div className="p-2 space-y-1">
                    {subjects.map((s: Subject) => (
                      <button key={s.id} onClick={() => { setSelectedSubjectId(s.id); setIsOpen(false); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${selectedSubjectId === s.id ? 'bg-violet-600! text-white!' : 'hover:bg-violet-500/10! text-slate-700! dark:text-slate-300!'}`}>
                        <span className="text-[10px] font-black uppercase tracking-widest text-left">{s.title}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button onClick={() => setSelectedSubjectId('all')} className={`font-black uppercase text-[10px] tracking-widest h-12 px-6 rounded-xl border-2! transition-all ${selectedSubjectId === 'all' ? 'bg-violet-600! text-white! border-violet-600!' : 'bg-white! dark:bg-slate-950! text-slate-500! border-slate-200! dark:border-white/10! hover:border-violet-600!'}`}>ALL</Button>
        </div>
      </div>

      {/* Grid Materi */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSubjects.map((subject: Subject, i: number) => (
          <motion.div key={subject.id} initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.4 }}>
            <Card className="h-full flex flex-col p-8 group hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-500 border-2! border-slate-200! dark:border-white/10! bg-white! dark:bg-slate-950! rounded-[2.5rem]!">
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 rounded-2xl bg-violet-600/5! border border-violet-500/10! group-hover:bg-violet-600! group-hover:scale-110 transition-all duration-500">
                  <GraduationCap className="w-8 h-8 text-violet-600! group-hover:text-white! transition-colors" />
                </div>
                <span className="text-[24px] font-black text-slate-200! dark:text-white/5! group-hover:text-violet-600/20! transition-colors">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <h2 className="font-outfit text-2xl font-black uppercase mb-4 tracking-tight group-hover:text-violet-600! transition-colors text-slate-900! dark:text-white!">{subject.title}</h2>
              <p className="grow text-sm mb-8 font-bold leading-relaxed text-slate-500! dark:text-slate-400!">{subject.description}</p>

              <Link href={`/storage/materi/${subject.id}`}>
                <Button variant="primary" className="group/btn! w-full! bg-violet-600! hover:bg-violet-700! text-white!">
                  PELAJARI MATERI <ChevronRight className="ml-2! w-5! h-5! group-hover/btn:translate-x-1! transition-transform!" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
// ==========================ini code app/storage/materi/page.tsx selesai ==============
