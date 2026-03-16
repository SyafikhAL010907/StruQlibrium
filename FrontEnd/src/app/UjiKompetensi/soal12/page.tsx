"use client";

import { UjiArena } from "@/components/battlefield/UjiArena";
import { UJI_QUESTIONS } from "@/data/ujiQuestions";

export default function SoalPage() {
  return <UjiArena question={UJI_QUESTIONS[11]} index={11} />;
}
