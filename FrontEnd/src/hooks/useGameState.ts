"use client";

import { useGameContext } from "@/components/GameProvider";

export function useGameState() {
  return useGameContext();
}
