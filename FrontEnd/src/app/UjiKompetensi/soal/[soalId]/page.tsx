"use client";

import { use } from "react";
import { MissionController } from "../../components/MissionController";
import { MODULES } from "../../data/missions";
import { notFound } from "next/navigation";

export default function SoalPage({ params }: { params: Promise<{ soalId: string }> }) {
  const { soalId } = use(params);
  const index = parseInt(soalId) - 1;

  if (isNaN(index) || index < 0 || index >= MODULES.length) {
    return notFound();
  }

  return <MissionController missionIndex={index} />;
}
