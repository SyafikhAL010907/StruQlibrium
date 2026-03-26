"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Swords, ArrowLeft, Trophy, Zap, Shield, Target } from "lucide-react";
import Link from "next/link";

export default function BattlefieldPage() {
  const levels = [
    {
      id: "easy",
      title: "EASY",
      icon: <Target className="w-8! h-8!" />,
      difficulty: "Basic Statics",
      reward: 10,
      color: "from-emerald-500! to-teal-600!",
      description: "Latihan dasar pengenalan gaya dan tumpuan sederhana.",
      path: "/battlefield/easy/1"
    },
    {
      id: "medium",
      title: "MEDIUM",
      icon: <Shield className="w-8! h-8!" />,
      difficulty: "Intermediate",
      reward: 20,
      color: "from-blue-500! to-indigo-600!",
      description: "Perhitungan beban merata dan momen pada balok sederhana.",
      path: "/battlefield/medium/1"
    },
    {
      id: "hard",
      title: "HARD",
      icon: <Zap className="w-8! h-8!" />,
      difficulty: "Advanced",
      reward: 50,
      color: "from-rose-600! to-purple-600!",
      description: "Analisis struktur kompleks dengan berbagai kombinasi beban.",
      path: "/battlefield/hard/1"
    }
  ];

  return (
    <div className="container! mx-auto! px-4! py-12!">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-16!"
      >
        <Link href="/dashboard" className="inline-flex! items-center! text-slate-500! hover:text-violet-600! transition-colors! font-bold! uppercase! text-xs! tracking-widest! mb-6!">
          <ArrowLeft className="mr-2! w-4! h-4!" /> BACK TO DASHBOARD
        </Link>
        <h1 className="font-outfit! text-4xl! md:text-7xl! font-black! tracking-tight! mb-4! uppercase! text-center! md:text-left!">
          BATTLE<span className="gradient-text!">FIELD.</span>
        </h1>
        <p className="font-bold! text-base! md:text-lg! max-w-2xl! text-center! md:text-left! mx-auto! md:mx-0!">Arena pembuktian kompetensi. Selesaikan misi, kumpulkan koin, dan jadilah Master Statika.</p>
      </motion.div>

      <div className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-3! gap-6! md:gap-8! max-w-6xl! mx-auto!">
        {levels.map((level, i) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring" }}
          >
            <Card className="h-full! flex! flex-col! p-8! group! hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)]! transition-all! duration-500! border-white/5! overflow-hidden! relative! rounded-[2.5rem]!">
              <div className={`absolute! top-0! right-0! w-32! h-32! bg-linear-to-br! ${level.color} opacity-5! blur-3xl! group-hover:opacity-20! transition-opacity!`} />

              <div className="flex! justify-between! items-start! mb-8!">
                <div className={`bg-linear-to-br! ${level.color} text-white! w-16! h-16! flex! items-center! justify-center! rounded-2xl! shadow-lg! group-hover:rotate-6! transition-transform! duration-300!`}>
                  {level.icon}
                </div>
                <div className="text-right!">
                  <div className="text-[10px]! font-black! text-slate-400! uppercase! tracking-widest! mb-1!">REWARD</div>
                  <div className="flex! items-center! justify-end! gap-1! text-violet-600! dark:text-violet-400! font-black! font-outfit! text-xl!">
                    <Trophy className="w-5! h-5!" /> +{level.reward}
                  </div>
                </div>
              </div>

              <div className="mb-4!">
                <span className="badge-text! text-[10px]! font-black! uppercase! tracking-[0.2em]! bg-slate-100! dark:bg-slate-800/50! px-3! py-1! rounded-full! border! border-slate-200! dark:border-white/5!">
                  {level.difficulty}
                </span>
              </div>

              <h2 className="font-outfit! text-2xl! font-black! uppercase! mb-4! tracking-tight! group-hover:text-violet-600! transition-colors!">
                {level.title}
              </h2>
              <p className="font-bold! leading-relaxed! mb-10! text-sm!">
                {level.description}
              </p>

              <Link href={level.path} className="mt-auto!">
                <Button className={`w-full! py-5! rounded-2xl! bg-linear-to-r! ${level.color} border-none! shadow-none! hover:scale-[1.02]! transition-transform!`}>
                  MULAI OPERASI <Swords className="ml-2! w-5! h-5!" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
