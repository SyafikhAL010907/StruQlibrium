"use client";

import { QuizArena } from "@/components/battlefield/QuizArena";
import { ArrowLeft, Trophy, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function MasterLevelPage() {
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  const questions = [
    {
      id: "ma1",
      question: "Pada struktur statis tak tentu, jumlah reaksi tumpuan adalah?",
      options: ["Kurang dari 3", "Sama dengan 3", "Lebih dari jumlah persamaan keseimbangan", "Selalu nol"],
      correctAnswer: "Lebih dari jumlah persamaan keseimbangan"
    },
    {
      id: "ma2",
      question: "Metode titik buhul (method of joints) digunakan untuk analisis?",
      options: ["Balok", "Rangka Batang", "Pelat", "Pondasi"],
      correctAnswer: "Rangka Batang"
    },
    {
      id: "ma3",
      question: "Gaya dalam yang menyebabkan elemen memendek disebut gaya?",
      options: ["Tarik", "Tekan", "Geser", "Lentur"],
      correctAnswer: "Tekan"
    },
    {
      id: "ma4",
      question: "Analisis rangka batang didasarkan pada asumsi beban bekerja pada?",
      options: ["Tengah batang", "Titik buhul (joint)", "Sepanjang batang", "Permukaan batang"],
      correctAnswer: "Titik buhul (joint)"
    },
    {
      id: "ma5",
      question: "Prinsip superposisi hanya berlaku jika material bersifat?",
      options: ["Plastis", "Linear Elastis", "Rapuh", "Liat"],
      correctAnswer: "Linear Elastis"
    }
  ];

  return (
    <div className="container! mx-auto! px-4! py-12!">
      <Link href="/battlefield" className="inline-flex! items-center! text-slate-500! hover:text-violet-600! transition-colors! font-bold! uppercase! text-xs! tracking-widest! mb-10!">
        <ArrowLeft className="mr-2! w-4! h-4!" /> BACK TO LOBBY
      </Link>
      
      <QuizArena 
        level="MASTER MISSION" 
        difficulty="Master" 
        questions={questions} 
        onFinish={() => setShowVictoryModal(true)}
      />

      {/* Victory Modal */}
      <AnimatePresence>
        {showVictoryModal && (
          <div className="fixed! inset-0! z-100! flex! items-center! justify-center! p-6!">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute! inset-0! bg-[#020617]/90! backdrop-blur-sm!"
              onClick={() => setShowVictoryModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative! w-full! max-w-lg! bg-white! dark:bg-slate-900! rounded-[2.5rem]! p-10! text-center! shadow-2xl! border-4! border-amber-500/30!"
            >
              <div className="flex! justify-center! mb-6!">
                <div className="relative!">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute! inset-0! bg-amber-500/20! blur-3xl! rounded-full!"
                  />
                  <div className="w-24! h-24! rounded-full! bg-linear-to-br! from-amber-400! to-orange-600! flex! items-center! justify-center! shadow-lg! shadow-amber-500/40!">
                    <Trophy className="w-12! h-12! text-white!" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl! font-black! uppercase! tracking-tighter! mb-2!">CONGRATULATIONS!</h2>
              <p className="text-slate-500! dark:text-slate-400! font-bold! mb-8!">
                Kamu telah menuntaskan kurikulum utama Statika. Dunia menantangmu untuk Ujian Akhir!
              </p>

              <div className="space-y-4!">
                <Link href="/UjiKompetensi/soal1">
                  <Button className="w-full! py-8! rounded-3xl! bg-linear-to-r! from-amber-500! to-orange-600! text-white! font-black! text-lg! tracking-widest! group!">
                    AMBIL UJI KOMPETENSI
                    <Zap className="ml-3! h-6! group-hover:scale-125! transition-transform!" />
                  </Button>
                </Link>
                <button 
                  onClick={() => setShowVictoryModal(false)}
                  className="text-xs! font-black! text-slate-400! uppercase! tracking-widest! hover:text-slate-600! dark:hover:text-white! transition-colors!"
                >
                  NANTI SAJA, MAU ISTIRAHAT
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute! top-8! right-8! text-amber-500/20!">
                <Star className="w-12! h-12! fill-current!" />
              </div>
              <div className="absolute! bottom-8! left-8! text-amber-500/20!">
                <Star className="w-8! h-8! fill-current!" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
