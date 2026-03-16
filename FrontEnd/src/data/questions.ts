import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: "q1",
    topicId: "gaya",
    difficulty: "Easy",
    question: "Jika sebuah gaya 50N bekerja ke arah kanan dan 20N ke arah kiri, berapakah resultan gayanya?",
    correctAnswer: "30",
    hint: "Kurangi gaya yang berlawanan arah (50 - 20).",
    explanation: "Resultan gaya adalah jumlah aljabar dari semua gaya. Karena berlawanan arah: 50N - 20N = 30N ke arah kanan.",
    image: "/images/quiz-step-1.png"
  },
  {
    id: "q2",
    topicId: "beban",
    difficulty: "Medium",
    question: "Sebuah balok dengan panjang 4m menerima beban merata q = 10 kN/m. Berapakah total beban terpusat ekuivalen (Q)?",
    correctAnswer: "40",
    hint: "Rumusnya adalah Q = q * L.",
    explanation: "Q = q * L = 10 kN/m * 4 m = 40 kN.",
    image: "/images/quiz-step-2.png"
  },
  {
    id: "q3",
    topicId: "tumpuan",
    difficulty: "Hard",
    question: "Pada tumpuan roll, berapa banyak reaksi gaya yang dihasilkan?",
    correctAnswer: "1",
    hint: "Ingat tumpuan roll hanya bisa menahan gaya tegak lurus permukaan.",
    explanation: "Tumpuan roll hanya memberikan 1 reaksi gaya, yaitu reaksi vertikal (Rv) yang tegak lurus bidang tumpuan.",
    image: "/images/quiz-step-3.png"
  }
];
