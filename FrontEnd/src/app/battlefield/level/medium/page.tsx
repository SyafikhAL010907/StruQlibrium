"use client";

import { QuizArena } from "@/components/battlefield/QuizArena";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MediumLevelPage() {
  const questions = [
    {
      id: "m1",
      question: "Beban merata q = 2kN/m pada balok 4m. Berapakah beban total Q?",
      options: ["4kN", "6kN", "8kN", "10kN"],
      correctAnswer: "8kN"
    },
    {
      id: "m2",
      question: "Momen adalah hasil kali antara Gaya dengan...?",
      options: ["Massa", "Jarak Tegak Lurus", "Percepatan", "Waktu"],
      correctAnswer: "Jarak Tegak Lurus"
    },
    {
      id: "m3",
      question: "Syarat keseimbangan statis untuk jumlah gaya vertikal adalah?",
      options: ["ΣV > 0", "ΣV < 0", "ΣV = 0", "ΣV = 1"],
      correctAnswer: "ΣV = 0"
    },
    {
      id: "m4",
      question: "Jika gaya 10N bekerja pada lengan 2m, berapakah Momennya?",
      options: ["5 Nm", "12 Nm", "20 Nm", "8 Nm"],
      correctAnswer: "20 Nm"
    },
    {
      id: "m5",
      question: "Beban yang bekerja pada satu titik tertentu disebut beban?",
      options: ["Terpusat", "Merata", "Segitiga", "Trapesium"],
      correctAnswer: "Terpusat"
    }
  ];

  return (
    <div className="container! mx-auto! px-4! py-12!">
      <Link href="/battlefield" className="inline-flex! items-center! text-slate-500! hover:text-violet-600! transition-colors! font-bold! uppercase! text-xs! tracking-widest! mb-10!">
        <ArrowLeft className="mr-2! w-4! h-4!" /> BACK TO LOBBY
      </Link>
      <QuizArena level="MEDIUM MISSION" difficulty="Medium" questions={questions} />
    </div>
  );
}
