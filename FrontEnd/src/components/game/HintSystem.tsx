"use client";

import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { Lightbulb, Lock } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { HINT_COST } from "../GameProvider";

interface HintSystemProps {
  hint: string;
}

export function HintSystem({ hint }: HintSystemProps) {
  const { coins, deductCoins } = useGameState();
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (coins >= HINT_COST) {
      if (deductCoins(HINT_COST)) {
        setRevealed(true);
      }
    } else {
      alert("Koin tidak cukup untuk membeli hint!");
    }
  };

  return (
    <div className="mt-4">
      {revealed ? (
        <Card className="bg-violet-500/5 dark:bg-violet-500/10 border-violet-500/30 border-dashed transition-all">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-violet-600 dark:text-violet-400 fill-violet-600/20" />
            <div>
              <p className="font-outfit font-black text-violet-700 dark:text-violet-400 uppercase text-[10px] tracking-widest mb-1">INTEL HINT:</p>
              <p className="text-slate-900 dark:text-slate-100 italic font-medium leading-relaxed">{hint}</p>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          variant="outline"
          onClick={handleReveal}
          className="w-full h-14 md:h-16 flex items-center justify-center gap-2 border-dashed border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
        >
          <Lock className="w-4 h-4" />
          Buka Hint ({HINT_COST} Koin)
        </Button>
      )}
    </div>
  );
}
