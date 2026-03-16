export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: string;
  topicId: string;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  hint: string;
  explanation: string;
  image?: string;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon?: string;
  moduleCount?: number;
}

export interface Material {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  content: string;
  image?: string;
}

export interface GameState {
  coins: number;
  unlockedLevels: string[];
  completedMaterials: string[];
}
