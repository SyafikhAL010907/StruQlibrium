"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { useGameContext } from "@/components/GameProvider";
import { normalizeAnswer } from "@/lib/utils";
import { questions } from "@/data/questions";
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, Trophy, Info } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Difficulty } from "@/types";

export function QuizArena() {
  const searchParams = useSearchParams();
  const levelParam = searchParams.get("level") || "easy";
  // Sync level with Difficulty type casing
  const level = (levelParam.charAt(0).toUpperCase() + levelParam.slice(1).toLowerCase()) as Difficulty;

  const { addCoins, deductCoins } = useGameContext();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);

  const levelQuestions = questions.filter(q => q.difficulty === level);
  const currentQuestion = levelQuestions[currentIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion || !userInput) return;

    const isCorrect = normalizeAnswer(userInput) === normalizeAnswer(currentQuestion.correctAnswer);

    if (isCorrect) {
      const rewards: Record<Difficulty, number> = { Easy: 10, Medium: 20, Hard: 50 };
      addCoins(rewards[level]);
    }

    setFeedback({ isCorrect, show: true });
  };

  const handleNext = () => {
    setFeedback(null);
    setUserInput("");
    setShowHint(false);
    if (currentIdx < levelQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  if (!currentQuestion) return (
    <div className="text-center py-20 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass p-12 rounded-4xl max-w-lg mx-auto border border-white/20"
      >
        <Trophy className="w-20 h-20 text-violet-500 mx-auto mb-6" />
        <h2 className="font-outfit text-4xl font-black uppercase mb-4 tracking-tight text-[#020617] dark:text-[#F8FAFC]">MISSION ACCOMPLISHED!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10">Anda telah menyelesaikan semua tantangan di level ini.</p>
        <Link href="/battlefield">
          <Button size="lg" className="w-full">KEMBALI KE ARENA</Button>
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg">
              {currentIdx + 1}
            </div>
            <div>
              <div className="badge-text text-[10px] font-black uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-white/5">
                QUESTION
              </div>
              <div className="font-outfit font-black uppercase text-sm tracking-tight">MISSION PROGRESS: {currentIdx + 1}/{levelQuestions.length}</div>
            </div>
          </div>
          <div className="badge-text text-[10px] font-black uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-white/5">
            LEVEL: {level}
          </div>
        </div>

        <Card className="p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Trophy className="w-40 h-40" />
          </div>

          <h2 className="font-outfit text-3xl md:text-5xl font-black mb-12 leading-tight tracking-tight text-[#020617] dark:text-[#F8FAFC]">
            {currentQuestion.question}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                autoFocus
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                /* Kita pake kombinasi Tailwind buat struktur, tapi COLOR kita kunci pake inline style */
                className="w-full border-2 p-4 rounded-2xl font-bold placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500 transition-all shadow-sm"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--input-text)',
                  borderColor: 'var(--input-border)'
                }}
                placeholder="Masukkan jawaban numerik..."
              />
              <div
                className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-2xl pointer-events-none group-focus-within:text-violet-500 transition-colors"
                style={{ color: 'var(--unit-color)' }}
              >
                N
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button type="submit" size="lg" className="grow font-black text-lg md:text-xl h-20 md:h-24 order-1 md:order-0">
                SUBMIT DATA <ArrowRight className="ml-2 w-6 h-6 md:w-7 md:h-7" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  if (!showHint) deductCoins(15);
                  setShowHint(true);
                }}
                className="h-20 md:h-24 px-8 md:px-10 border-slate-200 dark:border-white/10 order-2 md:order-0"
              >
                <Lightbulb className={`w-6 h-6 md:w-8 md:h-8 ${showHint ? "text-violet-500 fill-violet-500" : "text-slate-400"}`} />
              </Button>
            </div>
          </form>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-10 overflow-hidden"
              >
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-3xl p-8 flex gap-5">
                  <div className="bg-violet-500/20 p-2 rounded-lg shrink-0">
                    <Info className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <span className="font-black text-xs uppercase tracking-widest text-violet-700 dark:text-violet-400 block mb-2">INTEL HINT (-15 COINS)</span>
                    <p className="text-violet-900 dark:text-violet-200 font-medium leading-relaxed italic text-lg">
                      "{currentQuestion.hint}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      <AnimatePresence>
        {feedback?.show && (
          <Modal
            isOpen={feedback.show}
            title={feedback.isCorrect ? "MISSION ACCOMPLISHED!" : "MISSION FAILED!"}
            onClose={handleNext}
            footer={
              <Button onClick={handleNext} size="lg" className="w-full sm:w-auto">
                {currentIdx < levelQuestions.length - 1 ? "NEXT MISSION" : "FINISH CAMPAIGN"}
              </Button>
            }
          >
            <div className="text-center py-4">
              <div className="flex justify-center mb-10">
                {feedback.isCorrect ? (
                  <div className="bg-emerald-500/10 p-10 rounded-4xl border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/20 animate-bounce">
                    <CheckCircle2 className="w-24 h-24 text-emerald-500" />
                  </div>
                ) : (
                  <div className="bg-red-500/10 p-10 rounded-4xl border-2 border-red-500/30 shadow-lg shadow-red-500/20">
                    <XCircle className="w-24 h-24 text-red-500" />
                  </div>
                )}
              </div>

              <h3 className={`font-outfit text-5xl font-black mb-6 tracking-tight ${feedback.isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                {feedback.isCorrect ? `+${level === 'Easy' ? 10 : level === 'Medium' ? 20 : 50} COINS` : "ERROR: INCORRECT DATA"}
              </h3>

              <Card className="bg-slate-50 dark:bg-slate-950/50 p-8 text-left border-slate-200 dark:border-white/5 rounded-3xl">
                <span className="text-[10px] font-black uppercase tracking-widest block mb-4">TEK-DEBRIEF (EXPLANATION)</span>
                <p className="font-bold leading-relaxed italic text-lg">
                  "{currentQuestion.explanation}"
                </p>
              </Card>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
