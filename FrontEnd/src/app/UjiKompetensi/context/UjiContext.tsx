"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UjiContextType {
  timeLeft: number;
  userAnswers: string[];
  setUserAnswer: (index: number, answer: string) => void;
  isFinished: boolean;
  setIsFinished: (finished: boolean) => void;
}

const UjiContext = createContext<UjiContextType | undefined>(undefined);

export function UjiProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(20).fill(""));
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, timeLeft]);

  const setUserAnswer = (index: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  return (
    <UjiContext.Provider value={{ timeLeft, userAnswers, setUserAnswer, isFinished, setIsFinished }}>
      {children}
    </UjiContext.Provider>
  );
}

export function useUji() {
  const context = useContext(UjiContext);
  if (context === undefined) {
    throw new Error("useUji must be used within a UjiProvider");
  }
  return context;
}
