"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Timer, 
  Trophy, 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle,
  AlertTriangle 
} from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizArenaProps {
  level: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Master";
  questions: Question[];
  onFinish?: () => void;
}

export function QuizArena({ level, difficulty, questions, onFinish }: QuizArenaProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));
  const [isFinished, setIsFinished] = useState(false);
  const [status, setStatus] = useState<"playing" | "timeout" | "finished">("playing");

  // Timer Logic
  useEffect(() => {
    if (status !== "playing" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const handleTimeout = () => {
    setStatus("timeout");
    setIsFinished(true);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q: Question, i: number) => {
      if (answers[i] === q.correctAnswer) score += 5;
    });

    if (status === "timeout") {
      score -= 10;
    } else {
      score += Math.floor(timeLeft / 10);
    }

    return Math.max(0, score);
  };

  const timerColor = timeLeft < 30 ? "text-red-500!" : timeLeft < 90 ? "text-yellow-500!" : "text-emerald-500!";

  if (isFinished) {
    const finalScore = calculateScore();
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="premium-card! p-10! text-center! rounded-[2.5rem]!">
          {status === "timeout" ? (
            <AlertTriangle className="w-20! h-20! text-red-500! mx-auto! mb-6!" />
          ) : (
            <Trophy className="w-20! h-20! text-violet-600! mx-auto! mb-6!" />
          )}
          <h2 className="text-3xl! font-black! uppercase! mb-4!">
            {status === "timeout" ? "MISSION TIMEOUT!" : "OPERASI SELESAI!"}
          </h2>
          <div className="flex! justify-center! gap-8! mb-8!">
             <div>
               <p className="text-[10px]! font-black! text-slate-400! uppercase! tracking-widest!">SKOR AKHIR</p>
               <p className="text-4xl! font-black! text-violet-600!">{finalScore}</p>
             </div>
             <div>
               <p className="text-[10px]! font-black! text-slate-400! uppercase! tracking-widest!">SISA WAKTU</p>
               <p className={`text-4xl! font-black! ${timerColor}`}>{timeLeft}s</p>
             </div>
          </div>
          <p className="font-bold! text-slate-500! mb-10!">
            {status === "timeout" 
              ? "Waktu habis, tim kamu terpaksa mundur. Poin dikurangi -10." 
              : "Kerja bagus, Engineer! Kamu berhasil menyelesaikan misi dengan presisi."}
          </p>
          <div className="flex! flex-col! gap-4!">
             <Link href="/battlefield">
               <Button className="w-full! py-6! rounded-2xl! font-black! uppercase! tracking-widest!">
                 KEMBALI KE LOBBY
               </Button>
             </Link>
             <p className="text-[9px]! font-black! text-slate-400! uppercase! tracking-widest!">
               Tips: Gaspol baca modul di Storage untuk dapet poin besar!
             </p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="premium-card! p-8! md:p-12! rounded-[2.5rem]! relative! overflow-hidden!">
      {/* HUD Header */}
      <div className="flex! justify-between! items-center! mb-12!">
        <div>
          <span className="badge-text! text-[10px]! font-black! uppercase! tracking-widest! mb-1!">{difficulty} LEVEL</span>
          <h2 className="text-2xl! font-black! uppercase! tracking-tight!">{level}</h2>
        </div>
        <div className={`flex! items-center! gap-3! p-4! rounded-2xl! bg-slate-50! dark:bg-white/5! border-2! border-slate-100! dark:border-white/5! ${timerColor}`}>
           <Timer className="w-6! h-6!" />
           <span className="text-2xl! font-black! font-mono!">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Question Area */}
      <div className="min-h-[300px]! mb-12!">
        <div className="flex! items-center! gap-4! mb-6!">
          <div className="w-10! h-10! rounded-xl! bg-violet-600! text-white! flex! items-center! justify-center! font-black!">{currentStep + 1}</div>
          <p className="text-lg! md:text-xl! font-bold! text-slate-900! dark:text-white!">{questions[currentStep].question}</p>
        </div>

        <div className="grid! grid-cols-1! md:grid-cols-2! gap-4!">
          {questions[currentStep].options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className={`p-5! rounded-2xl! border-2! text-left! font-bold! transition-all! duration-300! ${
                answers[currentStep] === option 
                ? "border-violet-600! bg-violet-600/5! text-violet-600!" 
                : "border-slate-100! dark:border-white/5! hover:border-violet-500/50!"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex! items-center! justify-between! pt-10! border-t! border-slate-100! dark:border-white/5!">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="flex! items-center! gap-2! text-[10px]! font-black! uppercase! tracking-widest! text-slate-400! hover:text-slate-900! dark:hover:text-white! disabled:opacity-30!"
        >
          <ChevronLeft className="w-4! h-4!" /> SEBELUMNYA
        </button>

        <div className="flex! gap-2!">
          {questions.map((_, i) => (
            <div key={i} className={`w-2.5! h-2.5! rounded-full! transition-all! ${i === currentStep ? 'bg-violet-600! w-6!' : answers[i] ? 'bg-emerald-500!' : 'bg-slate-200! dark:bg-white/10!'}`} />
          ))}
        </div>

        {currentStep === questions.length - 1 ? (
          <button
            onClick={() => { 
              setStatus("finished"); 
              setIsFinished(true); 
              if (onFinish) onFinish();
            }}
            className="flex! items-center! gap-2! px-6! py-3! rounded-xl! bg-violet-600! text-white! font-black! text-[10px]! tracking-widest! uppercase! shadow-lg! shadow-violet-500/20! hover:scale-105! transition-all!"
          >
            SELESAI MISI <Zap className="w-4! h-4!" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex! items-center! gap-2! text-[10px]! font-black! uppercase! tracking-widest! text-slate-900! dark:text-white! hover:text-violet-600! transition-colors!"
          >
            SELANJUTNYA <ChevronRight className="w-4! h-4!" />
          </button>
        )}
      </div>

      {/* Note Sidebar */}
      <div className="mt-8! text-center!">
        <p className="text-[9px]! font-black! text-slate-400! uppercase! tracking-widest!">
          "Poin battle sengaja kecil. Gaspol baca modul di Storage untuk dapet poin besar!"
        </p>
      </div>
    </Card>
  );
}
