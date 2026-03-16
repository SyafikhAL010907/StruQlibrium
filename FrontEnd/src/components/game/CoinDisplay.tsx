"use client";

import { useGameState } from "@/hooks/useGameState";
import { Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CoinDisplay() {
  const { coins, isLoaded } = useGameState();

  if (!isLoaded) return null;

  return (
    <div className="flex items-center gap-2 md:gap-3 glass px-3 md:px-5 py-1.5 md:py-2 rounded-xl md:rounded-2xl shadow-lg border border-slate-200 dark:border-white/10 group">
      <div className="bg-linear-to-br from-violet-500 to-blue-500 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
        <Coins className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={coins}
          initial={{ y: -15, scale: 1.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 15, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="font-outfit font-black text-lg md:text-xl"
        >
          {coins}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

