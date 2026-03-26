"use client";

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';

export default function MissionH4() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { H_wall = 10, gamma = 22 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.H_wall === 10 && i.gamma === 22);
  }, [setCheckFn]);

  const wallH = (H_wall || 10) * 40;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[HARD] Dinding penahan tanah di kawasan pergunungan. Kedalaman H=10m menahan tanah tepu air dengan ketumpatan gamma=22 kN/m³. Periksa kestabilan parameter."
        </p>
      </div>

      <div className="grow min-h-[150px]">
        <CustomSlider label="Tinggi Dinding" val={H_wall} min={2} max={10} step={1} unit="m" keyName="H_wall" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Densiti Tanah" val={gamma} min={10} max={22} step={1} unit="kN/m³" keyName="gamma" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-100 -50 400 400" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible">
          <VisualDefs />
          <rect x="0" y="0" width="20" height={wallH} fill="url(#metal_finish)" rx="4" />
          <rect x="20" y="0" width="200" height={wallH} fill="rgba(244,63,94,0.1)" />
          <text x="120" y={wallH/2} textAnchor="middle" fill="#f43f5e" className="text-[16px] font-black font-mono">γ = {gamma}</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
