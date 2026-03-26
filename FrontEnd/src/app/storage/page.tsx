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
import { useState } from "react";

const coreModules = [
  { id: 'gaya', title: 'Gaya', description: 'Pelajari konsep gaya dalam mekanika teknik.' },
  { id: 'beban', title: 'Beban', description: 'Analisis berbagai jenis beban struktural.' },
  { id: 'tumpuan', title: 'Tumpuan', description: 'Pahami reaksi dan jenis-jenis tumpuan.' },
  { id: 'momen', title: 'Momen', description: 'Konsep dasar keseimbangan momen.' },
  { id: 'sambungan', title: 'Sambungan', description: 'Pelajari detail desain ujung dan sambungan.' },
  { id: 'keseimbangan', title: 'Keseimbangan', description: 'Penerapan prinsip keseimbangan struktur statis.' },
];

export default function SubjectCatalog() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = coreModules.filter((module) =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-container py-12!">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-16!"
      >
        <Link href="/dashboard" className="inline-flex! items-center! text-slate-500! hover:text-violet-600! transition-colors! font-bold! uppercase! text-xs! tracking-widest! mb-6!">
          <ArrowLeft className="mr-2! w-4! h-4!" /> BACK TO DASHBOARD
        </Link>
        
        <h1 className="font-outfit! text-4xl! md:text-6xl! lg:text-7xl! font-black! tracking-tight! mb-4! uppercase! text-slate-900! dark:text-white!">
          MATERI <span className="gradient-text!">KATALOG</span>
        </h1>
        <p className="font-bold! text-base! md:text-lg! max-w-2xl! text-slate-600! dark:text-slate-400!">
          Temukan koleksi lengkap materi teknik sipil yang terorganisir sejajar.
        </p>
      </motion.div>

      {/* Parallel Header - Search Left */}
      <div className="flex! flex-col! md:flex-row! items-center! justify-between! w-full! gap-6! mb-16!">
        <div className="relative! w-full! md:max-w-md!">
          <Search className="absolute! left-4! top-1/2! -translate-y-1/2! w-5! h-5! text-slate-400!" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi atau modul..."
            className="w-full! pl-12! pr-4! py-4! rounded-2xl! font-bold! placeholder:text-slate-400!"
          />
        </div>
      </div>

      {/* Grid Materi */}
      <motion.div layout className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-8!">
        {filteredModules.map((module, i) => (
          <motion.div key={module.id} initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.4 }}>
            <Card className="premium-card! h-full! flex! flex-col! p-8! group! hover:shadow-2xl! hover:shadow-violet-500/5! transition-all! duration-500!">
              <div className="flex! items-center! justify-between! mb-8!">
                <div className="p-4! rounded-2xl! bg-violet-600/5! border! border-violet-500/10! group-hover:bg-violet-600! group-hover:scale-110! transition-all! duration-500!">
                  <GraduationCap className="w-8! h-8! text-violet-600! group-hover:text-white! transition-colors!" />
                </div>
                <span className="text-[24px]! font-black! text-slate-200! dark:text-white/5! group-hover:text-violet-600/20! transition-colors!">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <h2 className="font-outfit! text-2xl! font-black! uppercase! mb-4! tracking-tight! group-hover:text-violet-600! transition-colors! text-slate-900! dark:text-white!">{module.title}</h2>
              <p className="grow! text-sm! mb-8! font-bold! leading-relaxed! text-slate-500! dark:text-slate-400!">{module.description}</p>

              <Link href={`/storage/${module.id}/1`}>
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
