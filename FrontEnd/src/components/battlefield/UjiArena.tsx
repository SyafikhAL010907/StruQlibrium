"use client";

import { useUji } from "@/app/UjiKompetensi/context/UjiContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Question } from "@/data/ujiQuestions";
import { useRouter } from "next/navigation";

interface UjiArenaProps {
  question: Question;
  index: number;
}

export function UjiArena({ question, index }: UjiArenaProps) {
  const { userAnswers, setUserAnswer, setIsFinished, timeLeft } = useUji();
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    setUserAnswer(index, answer);
  };

  const isLast = index === 19;
  const isFirst = index === 0;

  const handleFinish = () => {
    setIsFinished(true);
    // Logic for redirection or showing result can go here
    alert("Ujian Selesai! Skor kamu akan diproses.");
    router.push("/battlefield");
  };

  return (
    <Card className="premium-card! p-8! md:p-12! rounded-[2.5rem]! relative! overflow-hidden!">
      {/* Question Area */}
      <div className="min-h-[300px]! mb-12!">
        <div className="flex! items-center! gap-4! mb-6!">
          <div className="w-12! h-12! rounded-2xl! bg-violet-600! text-white! flex! items-center! justify-center! font-black! text-xl!">
            {index + 1}
          </div>
          <p className="text-xl! md:text-2xl! font-bold! text-slate-900! dark:text-white! leading-tight!">
            {question.question}
          </p>
        </div>

        <div className="grid! grid-cols-1! md:grid-cols-2! gap-4!">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className={`p-6! rounded-2xl! border-2! text-left! font-bold! transition-all! duration-300! flex! items-center! gap-4! ${
                userAnswers[index] === option 
                ? "border-violet-600! bg-violet-600/5! text-violet-600!" 
                : "border-slate-100! dark:border-white/5! hover:border-violet-500/50!"
              }`}
            >
              <div className={`w-6! h-6! rounded-full! border-2! flex! items-center! justify-center! ${userAnswers[index] === option ? 'border-violet-600! bg-violet-600!' : 'border-slate-200! dark:border-white/10!'}`}>
                 {userAnswers[index] === option && <div className="w-2! h-2! rounded-full! bg-white!" />}
              </div>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex! items-center! justify-between! pt-10! border-t! border-slate-100! dark:border-white/5!">
        {isFirst ? (
          <div /> // Placeholder to keep layout consistent
        ) : (
          <Link href={`/UjiKompetensi/soal${index}`}>
            <button
              className="flex! items-center! gap-2! text-[10px]! font-black! uppercase! tracking-widest! text-slate-400! hover:text-slate-900! dark:hover:text-white! transition-all!"
            >
              <ChevronLeft className="w-4! h-4!" /> SEBELUMNYA
            </button>
          </Link>
        )}

        <div className="flex! gap-1.5! max-md:hidden!">
          {userAnswers.map((ans, i) => (
            <div 
              key={i} 
              className={`w-2! h-2! rounded-full! transition-all! ${i === index ? 'bg-violet-600! w-6!' : ans ? 'bg-emerald-500!' : 'bg-slate-200! dark:bg-white/10!'}`} 
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={handleFinish}
            className="flex! items-center! gap-2! px-8! py-4! rounded-2xl! bg-linear-to-r! from-amber-500! to-orange-600! text-white! font-black! text-[12px]! tracking-widest! uppercase! shadow-lg! shadow-amber-500/20! hover:scale-105! transition-all!"
          >
            SUBMIT UJIAN <Zap className="w-4! h-4!" />
          </button>
        ) : (
          <Link href={`/UjiKompetensi/soal${index + 2}`}>
            <button
              className="flex! items-center! gap-2! text-[10px]! font-black! uppercase! tracking-widest! text-slate-900! dark:text-white! hover:text-violet-600! transition-colors!"
            >
              SELANJUTNYA <ChevronRight className="w-4! h-4!" />
            </button>
          </Link>
        )}
      </div>
    </Card>
  );
}
