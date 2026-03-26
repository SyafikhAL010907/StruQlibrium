import React from 'react';
import { BookOpen } from "lucide-react";

export default function PageSAMBUNGAN2() {
  return (
    <>
      <h2 className="font-outfit text-2xl font-black uppercase mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
        <BookOpen className="text-violet-600 w-6 h-6" /> KONSEP DASAR
      </h2>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 font-medium leading-relaxed mt-4">
        <p>Konten untuk bagian KONSEP DASAR pada modul sambungan akan ditampilkan di sini.</p>
      </div>
    </>
  );
}