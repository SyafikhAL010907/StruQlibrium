"use client";

import { QuizArena } from "@/components/battlefield/QuizArena";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HardLevelPage() {
  const questions = [
    {
      id: "h1",
      question: "Balok 6m dengan beban merata 5kN/m. Berapakah reaksi tumpuan di salah satu sisi jika simetris?",
      options: ["10kN", "15kN", "20kN", "30kN"],
      correctAnswer: "15kN"
    },
    {
      id: "h2",
      question: "Tumpuan jepit memiliki berapa jumlah reaksi?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "3"
    },
    {
      id: "h3",
      question: "ΣM = 0 pada tumpuan A berarti?",
      options: ["Gaya di A nol", "Jumlah momen di tumpuan A nol", "Struktur patah", "Gaya horizontal nol"],
      correctAnswer: "Jumlah momen di tumpuan A nol"
    },
    {
      id: "h4",
      question: "Beban segitiga dengan puncak q pada panjang L memiliki total beban Q sebesar?",
      options: ["qL", "1/2 qL", "2 qL", "1/3 qL"],
      correctAnswer: "1/2 qL"
    },
    {
      id: "h5",
      question: "Reaksi horizontal muncul pada tumpuan jenis?",
      options: ["Roll", "Kabel", "Sendi & Jepit", "Pendel"],
      correctAnswer: "Sendi & Jepit"
    }
  ];

  return (
    <div className="container! mx-auto! px-4! py-12!">
      <Link href="/battlefield" className="inline-flex! items-center! text-slate-500! hover:text-violet-600! transition-colors! font-bold! uppercase! text-xs! tracking-widest! mb-10!">
        <ArrowLeft className="mr-2! w-4! h-4!" /> BACK TO LOBBY
      </Link>
      <QuizArena level="HARD MISSION" difficulty="Hard" questions={questions} />
    </div>
  );
}
