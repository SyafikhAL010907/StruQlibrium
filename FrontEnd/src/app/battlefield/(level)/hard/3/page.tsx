"use client";

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionH3() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { Sx = 100, Sy = -50, Txy = 80 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.Sx === 100 && i.Sy === -50 && i.Txy === 80);
  }, [setCheckFn]);

  const C = (Sx+Sy)/2;
  const R = Math.sqrt(((Sx-Sy)/2)**2 + Txy**2);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[HARD] Analisis kegagalan pesawat: Kerangka sayap menerima tegangan kompleks Sx=100MPa (Tension), Sy=-50MPa (Compression), dan Txy=80MPa (Shear). Sahkan parameter untuk reka bentuk selamat."
        </p>
      </div>

      <div className="grow min-h-[220px]">
        <CustomSlider label="Stress Paksi X" val={Sx} min={-100} max={100} step={5} unit="MPa" keyName="Sx" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Stress Paksi Y" val={Sy} min={-100} max={100} step={5} unit="MPa" keyName="Sy" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Shear Stress" val={Txy} min={0} max={100} step={5} unit="MPa" keyName="Txy" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-150 -150 300 300" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible">
          <VisualDefs />
          <g opacity="0.3"><line x1="-150" y1="0" x2="150" y2="0" stroke="#94a3b8"/><line x1="0" y1="-150" x2="0" y2="150" stroke="#94a3b8"/></g>
          <motion.circle cx={C} cy="0" r={R} fill="rgba(244,63,94,0.1)" stroke="#f43f5e" strokeWidth="6" animate={{ cx: C, r: R }} filter="url(#ultraGlow)" />
          <motion.line x1={Sx} y1={-Txy} x2={Sy} y2={Txy} stroke="#f43f5e" strokeWidth="4" strokeDasharray="10,5" animate={{ x1: Sx, y1: -Txy, x2: Sy, y2: Txy }} />
          <circle cx={Sx} cy={-Txy} r={8} fill="#f43f5e" stroke="white" strokeWidth="2" />
          <circle cx={Sy} cy={Txy} r={8} fill="#60a5fa" stroke="white" strokeWidth="2" />
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
