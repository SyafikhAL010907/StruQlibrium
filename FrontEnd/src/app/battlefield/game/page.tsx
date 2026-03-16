"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { QuizArena } from "@/components/game/QuizArena";
import { Loader2 } from "lucide-react";

function GameContent() {
  return (
    <div className="container mx-auto">
      <QuizArena />
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-violet-600" />
      </div>
    }>
      <GameContent />
    </Suspense>
  );
}
