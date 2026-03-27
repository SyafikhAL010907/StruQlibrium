"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionM1() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { L = 8, w = 10 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.L === 8 && i.w === 10);
  }, [setCheckFn]);

  const R_A = w * L / 2;
  const svgW = 500;
  const numArrows = Math.max(Math.round(L * 2), 4);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[MEDIUM] Balok sederhana L=8m memikul beban terbagi rata (UDL) w=10 kN/m. Hitung reaksi: RA = wL/2. Target: RA = 40 kN."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Panjang Bentang (L)" val={L} min={4} max={12} step={1} unit="m" keyName="L" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Intensitas UDL (w)" val={w} min={2} max={20} step={1} unit="kN/m" keyName="w" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-60 -120 620 260" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* UDL top line */}
          <line x1="0" y1="-70" x2={svgW} y2="-70" stroke="#f43f5e" strokeWidth="3" />
          {/* UDL arrows */}
          {Array.from({ length: numArrows + 1 }).map((_, i) => {
            const x = (i / numArrows) * svgW;
            const arrowH = Math.min(w * 4, 60);
            return (
              <g key={i}>
                <line x1={x} y1={-70} x2={x} y2={-14} stroke="#f43f5e" strokeWidth="2.5" />
                <polygon points={`${x},-14 ${x - 5},-28 ${x + 5},-28`} fill="#f43f5e" />
              </g>
            );
          })}
          {/* w label */}
          <text x={svgW / 2} y="-82" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">w = {w} kN/m</text>
          {/* Beam */}
          <rect x="0" y="-12" width={svgW} height="24" fill="url(#metal_finish)" rx="5" />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          {/* Dimension */}
          <line x1="0" y1="50" x2={svgW} y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />
          <text x={svgW / 2} y="68" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">L = {L} m</text>
          {/* Reactions */}
          <text x="0" y="100" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">RA = {R_A.toFixed(1)} kN</text>
          <text x={svgW} y="100" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="900" fontFamily="monospace">RB = {R_A.toFixed(1)} kN</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
