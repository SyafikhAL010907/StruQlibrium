"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface MissionInputsType {
  L: number; P: number; a: number; oh: number; w: number; w_max: number; 
  M_load: number; A: number; dT: number; T: number; D: number; d_in: number;
  P_buckle: number; W_veh: number; veh_x: number; Sx: number; Sy: number; 
  Txy: number; H_wall: number; gamma: number; Mp: number; ang_rot: number;
  [key: string]: number;
}

export const defaultInputs: MissionInputsType = {
  L: 6, P: 20, a: 3, oh: 2, w: 4, w_max: 10, M_load: 30, A: 10, dT: 20, T: 20, D: 10, d_in: 5,
  P_buckle: 50, W_veh: 40, veh_x: 3, Sx: 40, Sy: -20, Txy: 30, H_wall: 6, gamma: 18, Mp: 60, ang_rot: 45
};

interface UjiContextType {
  timeLeft: number;
  missionInputs: MissionInputsType[];
  setMissionInput: (missionIndex: number, key: string, value: number) => void;
  missionStatus: boolean[];
  setMissionStatus: (missionIndex: number, isValid: boolean) => void;
  isFinished: boolean;
  setIsFinished: (finished: boolean) => void;
  userAnswers: string[];
  setUserAnswer: (index: number, answer: string) => void;
}

const UjiContext = createContext<UjiContextType | undefined>(undefined);

export function UjiProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  
  // Legacy arrays for 40 questions
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(40).fill(""));
  
  // New Matrix array of 40 elements containing their respective inputs
  const [missionInputs, setMissionInputs] = useState<MissionInputsType[]>(
    new Array(40).fill(null).map(() => ({ ...defaultInputs }))
  );
  const [missionStatus, setMissionStatus] = useState<boolean[]>(new Array(40).fill(false));
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

  const setMissionInput = (missionIndex: number, key: keyof MissionInputsType, value: number) => {
    setMissionInputs((prev) => {
      const newInputs = [...prev];
      newInputs[missionIndex] = { ...newInputs[missionIndex], [key]: value };
      return newInputs;
    });
  };

  const updateMissionStatus = (missionIndex: number, isValid: boolean) => {
    setMissionStatus((prev) => {
      const newStatus = [...prev];
      newStatus[missionIndex] = isValid;
      return newStatus;
    });
  };

  const setUserAnswer = (index: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  return (
    <UjiContext.Provider value={{ 
      timeLeft, 
      missionInputs, 
      setMissionInput, 
      missionStatus, 
      setMissionStatus: updateMissionStatus, 
      isFinished, 
      setIsFinished,
      userAnswers,
      setUserAnswer
    }}>
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
