"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionE2() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { P = 50, A = 100 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.P === 50 && i.A === 100);
  }, [setCheckFn]);

  const stress = (P / A); // kN/cm²
  const rodThickness = Math.max(Math.min(A * 0.3, 55), 15);
  const arrowOffset = Math.min(P * 1.2, 90);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[EASY] Batang baja ditarik aksial dengan P=50kN. Luas penampang A=100 cm². Hitung tegangan: σ = P/A. Target: σ = 0.5 kN/cm²."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Gaya Tarik (P)" val={P} min={10} max={100} step={5} unit="kN" keyName="P" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Luas Penampang (A)" val={A} min={50} max={200} step={10} unit="cm²" keyName="A" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-160 -90 620 220" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Rod body */}
          <motion.rect
            x="0" y={-rodThickness / 2} width="300" height={rodThickness}
            fill="url(#metal_finish)" rx="6"
            animate={{ height: rodThickness, y: -rodThickness / 2 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          />
          {/* Left pull arrow */}
          <motion.g animate={{ x: -arrowOffset }} transition={{ type: 'spring', stiffness: 60, damping: 15 }}>
            <line x1={arrowOffset} y1="0" x2="6" y2="0" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
            <polygon points={`${arrowOffset},0 ${arrowOffset - 14},-7 ${arrowOffset - 14},7`} fill="#f43f5e" />
            <text x={arrowOffset / 2} y="-18" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">{P} kN</text>
          </motion.g>
          {/* Right pull arrow */}
          <motion.g animate={{ x: arrowOffset }} transition={{ type: 'spring', stiffness: 60, damping: 15 }}>
            <line x1={300 - arrowOffset} y1="0" x2={294} y2="0" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
            <polygon points={`${300 - arrowOffset},0 ${300 - arrowOffset + 14},-7 ${300 - arrowOffset + 14},7`} fill="#f43f5e" />
            <text x={300 - arrowOffset / 2} y="-18" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">{P} kN</text>
          </motion.g>
          {/* Result */}
          <text x="150" y="70" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="900" fontFamily="monospace">
            σ = {stress.toFixed(3)} kN/cm²
          </text>
          <text x="150" y="92" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">Target: 0.500 kN/cm²</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
