// ========================ini code app/storage/materi/[subjectId]/modul/[moduleId]/page.tsx======
"use client";

import { useState, useRef, use } from "react";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Clock, 
  Award, 
  ChevronRight, 
  Share2, 
  Printer,
  ChevronLeft,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { materials, subjects } from "@/data/materials";
import { Material, Subject } from "@/types";

export default function StudyModulePage({ params }: { params: Promise<{ subjectId: string, moduleId: string }> }) {
  const router = useRouter();
  const { subjectId, moduleId } = use(params);
  
  // 1. Data Structure Implementation (Filtered by subject)
  const currentSubject = subjects.find(s => s.id === subjectId);
  const subjectModules = materials.filter(m => m.subjectId === subjectId);
  const activeModulData = subjectModules.find(m => m.id === moduleId) || subjectModules[0];
  
  const [step, setStep] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!activeModulData || !currentSubject) return null;

  // 3. Content Logic Implementation
  const stepsData = [
    {
      id: 1,
      title: "Pendahuluan & Tujuan",
      content: (
        <div className="space-y-8!">
          <section>
            <h2 className="text-2xl! md:text-3xl! font-outfit! font-black! uppercase! tracking-tight! text-slate-900! dark:text-white! mb-6! flex! items-center! gap-4!">
              <span className="w-2! h-8! bg-violet-600! rounded-full!" /> Pendahuluan
            </h2>
            <p className="text-lg! md:text-xl! font-bold! leading-relaxed! text-slate-600! dark:text-slate-400! mb-8!">Memahami fundamental dari {activeModulData.title.toLowerCase()} dalam konteks {currentSubject.title}.</p>
            <div className="text-slate-700! dark:text-slate-300! font-bold! leading-relaxed!">
              Modul ini akan membahas secara mendalam tentang prinsip-prinsip {activeModulData.title} sebagai landasan utama dalam analisis statika struktur untuk mencapai keseimbangan sempurna.
            </div>
          </section>
          <section className="bg-slate-50! dark:bg-white/2! p-8! rounded-3xl! border! border-slate-200! dark:border-white/5!">
             <h3 className="text-lg! font-black! uppercase! text-slate-900! dark:text-white! mb-4!">Misi Pembelajaran</h3>
             <ul className="space-y-3!">
               <li className="flex! items-center! gap-3! text-slate-600! dark:text-slate-400! font-bold!"><CheckCircle2 className="w-5! h-5! text-violet-600!" /> Memahami konsep dasar secara fundamental.</li>
               <li className="flex! items-center! gap-3! text-slate-600! dark:text-slate-400! font-bold!"><CheckCircle2 className="w-5! h-5! text-violet-600!" /> Menguasai parameter perhitungan yang valid.</li>
             </ul>
          </section>
        </div>
      )
    },
    {
      id: 2,
      title: "Konsep Dasar & Teori",
      content: (
        <div className="space-y-8!">
          <section>
            <h2 className="text-2xl! md:text-3xl! font-outfit! font-black! uppercase! tracking-tight! text-slate-900! dark:text-white! mb-6! flex! items-center! gap-4!">
              <span className="w-2! h-8! bg-violet-600! rounded-full!" /> Kerangka Teori
            </h2>
            <p className="text-slate-700! dark:text-slate-300! font-bold! leading-relaxed!">Setiap struktur bangunan harus memenuhi kaidah statika yang ketat. Pada bagian ini, kita akan membedah bagaimana elemen bekerja dalam mendistribusikan {activeModulData.title.toLowerCase()}.</p>
          </section>
          <section className="bg-linear-to-br! from-violet-600/5! to-blue-600/5! border-2! border-violet-500/20! shadow-inner! rounded-3xl! p-8! md:p-10! relative! overflow-hidden!">
            <h3 className="text-xl! font-outfit! font-black! text-violet-600! mb-6! uppercase! tracking-tight! flex! items-center! gap-3!"><BookOpen className="w-6! h-6!" /> Kunci Utama</h3>
            <ul className="space-y-4!">
              {["Analisis Vektor", "Kesetimbangan Statis", "Parameter Material", "Integritas Sistem"].map((item, i) => (
                <li key={i} className="flex! items-start! gap-3! font-bold! text-slate-700! dark:text-slate-300!">
                  <div className="w-5! h-5! rounded-full! bg-violet-600! text-white! flex! items-center! justify-center! text-[10px]! shrink-0! mt-0.5!">{i+1}</div>{item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )
    },
    { id: 3, title: "Contoh Kasus", content: <div className="space-y-8!"><section><h2 className="text-2xl! md:text-3xl! font-outfit! font-black! uppercase! tracking-tight! text-slate-900! dark:text-white! mb-6! flex! items-center! gap-4!"><span className="w-2! h-8! bg-violet-600! rounded-full!" /> Studi Kasus</h2><Card className="p-6! bg-slate-900! text-white! border-none!"><p className="text-slate-300 font-bold! italic!">"Analisis {activeModulData.title.toLowerCase()} pada kondisi beban kritis di lapangan..."</p></Card></section></div> },
    { id: 4, title: "Deep Dive", content: <div className="space-y-8!"><section><h2 className="text-2xl! md:text-3xl! font-outfit! font-black! uppercase! tracking-tight! text-slate-900! dark:text-white! mb-6! flex! items-center! gap-4!"><span className="w-2! h-8! bg-violet-600! rounded-full!" /> Analisis Numerik</h2><div className="p-8! rounded-3xl! border-2! border-dashed! border-slate-200! dark:border-white/10! flex! flex-col! items-center! justify-center! text-center!"><Sparkles className="w-12! h-12! text-violet-500! mb-4!" /><p className="font-black! text-slate-900! dark:text-white! uppercase! tracking-widest! text-sm! text-center!">Interactive Engineering Sandbox</p></div></section></div> },
    { id: 5, title: "Rangkuman", content: <div className="space-y-8!"><section><h2 className="text-2xl! md:text-3xl! font-outfit! font-black! uppercase! tracking-tight! text-slate-900! dark:text-white! mb-6! flex! items-center! gap-4!"><span className="w-2! h-8! bg-violet-600! rounded-full!" /> Kesimpulan Materi</h2><p className="text-slate-700! dark:text-slate-300! font-bold!">Pastikan pemahaman Anda tentang {activeModulData.title.toLowerCase()} sudah matang sebelum melanjutkan ke simulasi battlefield.</p></section><Card className="p-8! bg-slate-900! text-white! border-white/10! shadow-2xl!"><h4 className="font-outfit! text-xl! font-black! uppercase! mb-4! tracking-tight!">Engineer's Note</h4><p className="text-slate-400! font-black! italic!">"Ketelitian dalam analisis {activeModulData.title.toLowerCase()} adalah fondasi utama keselamatan bangunan."</p></Card></div> }
  ];

  return (
    <div className="container! mx-auto! px-4! py-12! max-w-7xl!">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
        <div className="flex! flex-col! md:flex-row! justify-between! items-start! md:items-center! gap-6! mb-10!">
          {/* 3. Breadcrumb Section */}
          <nav className="flex! items-center! gap-2! text-[10px]! md:text-xs! font-black! uppercase! tracking-widest! text-slate-400!">
            <Link href="/" className="hover:text-violet-600! transition-colors!">STORAGE</Link>
            <ChevronRight className="w-3! h-3!" />
            <Link href="/storage/materi" className="hover:text-violet-600! transition-colors!">MATERI</Link>
            <ChevronRight className="w-3! h-3!" />
            <Link href={`/storage/materi/${subjectId}`} className="hover:text-violet-600! transition-colors!">{currentSubject.title.toUpperCase()}</Link>
            <ChevronRight className="w-3! h-3!" />
            <span className="text-violet-500! border-b! border-violet-500/30! uppercase!">{activeModulData.title}</span>
          </nav>

          <div className="flex! gap-3!">
            <button className="p-3! rounded-xl! border! border-slate-200! dark:border-white/10! bg-white! dark:bg-slate-950! text-slate-400! hover:text-violet-600! shadow-sm!"><Share2 className="w-4! h-4!" /></button>
            <button className="p-3! rounded-xl! border! border-slate-200! dark:border-white/10! bg-white! dark:bg-slate-950! text-slate-400! hover:text-violet-600! shadow-sm!"><Printer className="w-4! h-4!" /></button>
          </div>
        </div>

        <div className="mb-12!">
          <p className="text-[10px]! font-black! text-violet-600! uppercase! tracking-[0.4em]! mb-4!">Halaman {step} dari 5: {stepsData[step-1].title}</p>
          <h1 className="font-outfit! text-4xl! md:text-7xl! font-black! tracking-tight! uppercase! text-slate-900! dark:text-white! mb-6!">{activeModulData.title}</h1>
          <div className="flex! gap-3!">
            <div className="badge-text! px-4! py-1.5! rounded-full! text-[10px]! font-black! uppercase! tracking-widest! gap-2! bg-slate-50! dark:bg-white/5! border! border-slate-200! text-slate-600! dark:text-slate-400! inline-flex! items-center!"><Clock className="w-3.5! h-3.5!" /> 15 MIN READ</div>
            <div className="badge-text! px-4! py-1.5! rounded-full! text-[10px]! font-black! uppercase! tracking-widest! gap-2! bg-violet-600! text-white! inline-flex! items-center!"><Award className="w-3.5! h-3.5!" /> 50 XP</div>
          </div>
        </div>

        {/* 4. Parallel Layout Implementation */}
        <div className="flex! flex-col! lg:flex-row! gap-10!">
          <div className="flex-1! space-y-10!">
            <Card className="p-8! md:p-12! border-slate-200! dark:border-white/5! bg-white! dark:bg-slate-950! premium-shadow! min-h-[500px]! flex! flex-col! relative! overflow-hidden!">
               <AnimatePresence mode="wait">
                 {/* 2 & 4. Zoom Animation on state change */}
                 <motion.div 
                   key={`${moduleId}-${step}`} 
                   initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                   animate={{ opacity: 1, scale: 1, y: 0 }} 
                   exit={{ opacity: 0, scale: 1.05, y: -10 }} 
                   transition={{ duration: 0.4, ease: "easeOut" }} 
                   className="grow!"
                 >
                   {stepsData[step-1].content}
                 </motion.div>
               </AnimatePresence>
               <div className="mt-16! pt-8! border-t! border-slate-100! dark:border-white/5! flex! items-center! justify-between!">
                  <div>
                    {step > 1 && (
                      <button 
                        onClick={() => setStep(step-1)} 
                        className="flex! items-center! gap-2! px-6! py-3! rounded-xl! border-2! border-slate-200! dark:border-white/10! text-slate-500! hover:bg-slate-50! font-black! text-[10px]! tracking-widest! uppercase!"
                      >
                        <ChevronLeft className="w-4! h-4!" /> KEMBALI
                      </button>
                    )}
                  </div>
                  <div className="flex! flex-col! items-center!">
                    <span className="text-[10px]! font-black! text-slate-400! uppercase! tracking-widest! mb-3!">Halaman {step} dari 5</span>
                    <div className="w-32! h-1.5! bg-slate-100! dark:bg-white/5! rounded-full! overflow-hidden!">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(step / 5) * 100}%` }} className="h-full! bg-violet-600!" />
                    </div>
                  </div>
                  <div>
                    {step < 5 && (
                      <button 
                        onClick={() => setStep(step+1)} 
                        className="flex! items-center! gap-2! px-6! py-3! rounded-xl! bg-violet-600! text-white! hover:bg-violet-700! font-black! text-[10px]! tracking-widest! uppercase! shadow-lg! shadow-violet-500/20!"
                      >
                        SELANJUTNYA <ChevronRight className="w-4! h-4!" />
                      </button>
                    )}
                  </div>
               </div>
            </Card>

            <AnimatePresence>
               {/* 3. GAS BATTLE implementation */}
               {step === 5 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Link href="/battlefield">
                      <Card className="bg-linear-to-r! from-violet-600! to-blue-600! text-white! p-10! flex! items-center! justify-between! group! overflow-hidden! relative! border-none!">
                        <div className="relative! z-10!"><h3 className="font-outfit! text-3xl! font-black! uppercase! mb-2!">SIAP UNTUK BATTLE?</h3><p className="font-bold! opacity-90!">Uji ketangguhan teknik Anda!</p></div>
                        <div className="relative! z-10! bg-white/20! p-4! rounded-2xl! group-hover:translate-x-3! transition-transform! font-black! flex! items-center! gap-3!">GAS BATTLE <ChevronRight className="w-6! h-6!" /></div>
                        <div className="absolute! -right-10! -bottom-10! w-40! h-40! bg-white/10! rounded-full! blur-3xl!" />
                      </Card>
                    </Link>
                  </motion.div>
               )}
            </AnimatePresence>
          </div>
          
          {/* 2 & 4. Sidebar Interaction Section */}
          <aside className="w-full! lg:w-80! space-y-8!">
            <Card className="p-8! border-slate-200! dark:border-white/5! bg-white! dark:bg-slate-950! premium-shadow!">
              <h4 className="font-outfit! text-xl! font-black! uppercase! mb-8! tracking-tight! text-slate-900! dark:text-white!">MODUL LAINNYA</h4>
              <div className="space-y-6!">
                {subjectModules.map((m: Material, index: number) => (
                  <Link 
                    key={m.id} 
                    href={`/storage/materi/${subjectId}/modul/${m.id}`}
                    className={`w-full flex! items-center! gap-4! group! text-left! transition-all! ${moduleId === m.id ? "opacity-100 scale-105" : "opacity-40 hover:opacity-100"}`}
                  >
                    <div className={`w-12! h-12! rounded-xl! flex! items-center! justify-center! border! border-slate-200! transition-all! ${moduleId === m.id ? "bg-violet-600! border-violet-600! shadow-lg! shadow-violet-500/30" : "bg-slate-50! dark:bg-slate-900! group-hover:bg-violet-600! dark:border-white/10!"}`}>
                      <BookOpen className={`w-5! h-5! transition-colors! ${moduleId === m.id ? "text-white!" : "text-slate-400! group-hover:text-white!"}`} />
                    </div>
                    <div className="overflow-hidden!">
                      <p className={`font-black! text-sm! uppercase! font-outfit! truncate! transition-colors! ${moduleId === m.id ? "text-violet-600!" : "text-slate-900! dark:text-white! group-hover:text-violet-600!"}`}>
                        {index + 1}. {m.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
            <Link href={`/storage/materi/${subjectId}`}>
              <button className="w-full! py-4! rounded-2xl! border-2! border-slate-200! dark:border-white/10! font-black! uppercase! text-xs! tracking-widest! hover:bg-slate-50! dark:hover:bg-white/5! text-slate-500! transition-all!">
                <ChevronLeft className="w-4! h-4! inline! mr-2!" /> Daftar Modul
              </button>
            </Link>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
// ==========================ini code app/storage/materi/[subjectId]/modul/[moduleId]/page.tsx selesai ==============
