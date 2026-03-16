// ========================ini code app/storage/materi/[subjectId]/page.tsx======
"use client";

import { use } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ChevronRight, 
  ArrowLeft,
  Clock,
  Award,
  CirclePlay,
  Search
} from "lucide-react";
import Link from "next/link";
import { subjects, materials } from "@/data/materials";
import { Subject, Material } from "@/types";
import { useState } from "react";

export default function SubjectModuleList({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params);
  const [searchQuery, setSearchQuery] = useState("");
  
  const subject = subjects.find((s: Subject) => s.id === subjectId);
  const subjectModules = materials.filter((m: Material) => 
    m.subjectId === subjectId && 
    (m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     m.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!subject) return null;

  return (
    <div className="container! mx-auto! px-4! py-12! max-w-7xl!">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16!">
        <Link href="/storage/materi" className="inline-flex! items-center! text-slate-500! hover:text-violet-600! transition-colors! font-bold! uppercase! text-xs! tracking-widest! mb-6!">
          <ArrowLeft className="mr-2! w-4! h-4!" /> KEMBALI KE KATALOG
        </Link>
        <div className="flex! flex-col! md:flex-row! items-start! md:items-end! justify-between! gap-6!">
          <div className="max-w-3xl!">
            <p className="text-[10px]! font-black! text-violet-600! uppercase! tracking-[0.4em]! mb-4!">SUBJECT MATERIAL</p>
            <h1 className="font-outfit! text-4xl! sm:text-6xl! md:text-7xl! font-black! tracking-tight! mb-6! uppercase! text-slate-900! dark:text-white!">
              {subject.title}
            </h1>
            <p className="font-bold! text-slate-600! dark:text-slate-400! text-lg! leading-relaxed!">
              {subject.description}
            </p>
          </div>
          <div className="flex! gap-4! w-full! md:w-auto!">
             <div className="relative! w-full! md:w-80!">
                <Search className="absolute! left-5! top-1/2! -translate-y-1/2! w-5! h-5! text-slate-400!" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari modul..."
                  className="w-full! pl-14! pr-6! py-4! rounded-3xl! border-2! border-slate-200! dark:border-white/10! bg-white! dark:bg-slate-950! text-slate-900! dark:text-white! focus:outline-none! focus:ring-2! focus:ring-violet-500! transition-all! font-bold! text-sm! placeholder:text-slate-400!"
                />
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-8!">
        {subjectModules.map((modul: Material, i: number) => (
          <motion.div 
            key={modul.id} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-8! h-full! flex! flex-col! border-2! border-slate-200! dark:border-white/10! bg-white! dark:bg-slate-950! rounded-[2.5rem]! group! hover:border-violet-600! transition-all! duration-500!">
              <div className="flex! items-center! justify-between! mb-8!">
                <div className="w-14! h-14! rounded-2xl! bg-slate-50! dark:bg-slate-900! border! border-slate-200! dark:border-white/5! flex! items-center! justify-center! group-hover:bg-violet-600! transition-all! duration-500!">
                  <BookOpen className="w-7! h-7! text-slate-400! group-hover:text-white!" />
                </div>
                <div className="flex! flex-col! items-end!">
                  <span className="text-[10px]! font-black! text-slate-400! uppercase! tracking-widest!">MODUL</span>
                  <span className="text-xl! font-black! text-slate-900! dark:text-white! tracking-tighter!">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>

              <h2 className="font-outfit! text-2xl! font-black! uppercase! mb-4! tracking-tight! text-slate-900! dark:text-white! group-hover:text-violet-600! transition-colors!">
                {modul.title}
              </h2>
              <p className="font-bold! text-sm! text-slate-500! dark:text-slate-400! mb-8! grow! leading-relaxed!">
                {modul.description}
              </p>

              <div className="flex! items-center! gap-4! mb-8!">
                <div className="flex! items-center! gap-2! text-[10px]! font-black! text-slate-400! uppercase!">
                  <Clock className="w-4! h-4! text-violet-600!" /> 15 MIN
                </div>
                <div className="flex! items-center! gap-2! text-[10px]! font-black! text-slate-400! uppercase!">
                  <Award className="w-4! h-4! text-violet-600!" /> 50 XP
                </div>
              </div>

              <Link href={`/storage/materi/${subjectId}/modul/${modul.id}`}>
                <Button className="w-full! py-6! rounded-2xl! bg-violet-600! hover:bg-violet-700! text-white! font-black! uppercase! tracking-widest! text-xs! group/btn!">
                  MULAI BELAJAR <CirclePlay className="ml-2! w-5! h-5! group-hover/btn:scale-110! transition-transform!" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
// ==========================ini code app/storage/materi/[subjectId]/page.tsx selesai ==============
