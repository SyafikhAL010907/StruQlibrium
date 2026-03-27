"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionM2() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { L = 6, a = 2, P = 30 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.L === 6 && i.a === 2 && i.P === 30);
  }, [setCheckFn]);

  // Pin at A (x=0), Roller at B (x=L), load P at C (x=L+a)
  const R_B = P * (L + a) / L;
  const R_A = P - R_B; // negative = downward tie
  const svgW = 400;
  const overhangPx = Math.min((a / L) * svgW * 0.6, 120);
  const arrowLen = Math.min(P * 1.5, 80);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[MEDIUM] Balok dengan overhang: tumpuan Pin di A (kiri), Roller di B (tengah L=6m), beban P=30kN di ujung overhang (a=2m). Hitung RB = P(L+a)/L."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Bentang Utama (L)" val={L} min={4} max={10} step={1} unit="m" keyName="L" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Panjang Overhang (a)" val={a} min={1} max={4} step={0.5} unit="m" keyName="a" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Beban Ujung (P)" val={P} min={5} max={60} step={5} unit="kN" keyName="P" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-60 -120 600 280" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Full beam including overhang */}
          <rect x="0" y="-12" width={svgW + overhangPx} height="24" fill="url(#metal_finish)" rx="5" />
          {/* Supports */}
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          {/* Tip load */}
          <motion.g animate={{ x: svgW + overhangPx }} transition={{ type: 'spring', stiffness: 60, damping: 15 }}>
            <line x1="0" y1={-arrowLen - 14} x2="0" y2="-14" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
            <polygon points="0,-14 -6,-28 6,-28" fill="#f43f5e" />
            <text x="0" y={-arrowLen - 24} textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">{P} kN</text>
          </motion.g>
          {/* Labels */}
          <text x={svgW / 2} y="55" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">L = {L} m</text>
          <motion.text animate={{ x: svgW + overhangPx / 2 }} y="55" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">a = {a} m</motion.text>
          {/* Reactions */}
          <text x="0" y="90" textAnchor="middle" fill={R_A < 0 ? '#60a5fa' : '#f43f5e'} fontSize="12" fontWeight="900" fontFamily="monospace">RA={R_A.toFixed(1)}kN {R_A < 0 ? '↓' : '↑'}</text>
          <text x={svgW} y="90" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="900" fontFamily="monospace">RB={R_B.toFixed(1)}kN ↑</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
