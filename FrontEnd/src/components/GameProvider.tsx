"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Difficulty } from "@/types";

const INITIAL_COINS = 100;
export const HINT_COST = 15;
const REWARDS: Record<Difficulty, number> = {
  Easy: 10,
  Medium: 20,
  Hard: 50,
};

interface GameContextType {
  coins: number;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => boolean;
  resetGame: () => void;
  isLoaded: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState<number>(INITIAL_COINS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCoins = localStorage.getItem("struqlibrium_coins");
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("struqlibrium_coins", coins.toString());
    }
  }, [coins, isLoaded]);

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  const deductCoins = (amount: number) => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const resetGame = () => {
    setCoins(INITIAL_COINS);
    localStorage.removeItem("struqlibrium_coins");
  };

  return (
    <GameContext.Provider value={{ coins, addCoins, deductCoins, resetGame, isLoaded }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
