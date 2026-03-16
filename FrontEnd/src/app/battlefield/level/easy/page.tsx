"use client";

import { QuizArena } from "@/components/battlefield/QuizArena";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EasyLevelPage() {
  const easyQuestions = [
    {
      id: "e1",
      question: "Apa satuan internasional untuk Gaya?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: "Newton"
    },
    {
      id: "e2",
      question: "Tumpuan yang dapat menahan gaya vertikal dan horizontal tetapi tidak momen adalah?",
      options: ["Roll", "Sendi", "Jepit", "Pendel"],
      correctAnswer: "Sendi"
    },
    {
      id: "e3",
      question: "Resultan dari dua gaya 10N ke kanan dan 5N ke kiri adalah?",
      options: ["15N ke kanan", "5N ke kanan", "5N ke kiri", "15N ke kiri"],
      correctAnswer: "5N ke kanan"
    },
    {
      id: "e4",
      question: "Bentuk tumpuan yang hanya memiliki 1 reaksi vertikal adalah?",
      options: ["Jepit", "Sendi", "Roll", "Kaku"],
      correctAnswer: "Roll"
    },
    {
      id: "e5",
      question: "Hukum Newton yang menjelaskan tentang aksi-reaksi adalah?",
      options: ["Hukum I", "Hukum II", "Hukum III", "Hukum Gravitasi"],
      correctAnswer: "Hukum III"
    }
  ];

  return (
    <div className="container! mx-auto! px-4! py-12!">
      <Link href="/battlefield" className="inline-flex! items-center! text-slate-500! hover:text-violet-600! transition-colors! font-bold! uppercase! text-xs! tracking-widest! mb-10!">
        <ArrowLeft className="mr-2! w-4! h-4!" /> BACK TO LOBBY
      </Link>
      <QuizArena level="EASY MISSION" difficulty="Easy" questions={easyQuestions} />
    </div>
  );
}
