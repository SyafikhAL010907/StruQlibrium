"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionE1() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { L = 6, P = 20, a = 3 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.L === 6 && i.P === 20 && i.a === 3);
  }, [setCheckFn]);

  const safeA = Math.min(a, L);
  const R_A = P * (L - safeA) / L;
  const R_B = P * safeA / L;
  const svgW = 500;
  const arrowX = (safeA / L) * svgW;
  const arrowLen = Math.min(Math.max(P * 2, 40), 90);

  return (
    <>
      <div className="p-6 sm:p-10 lg:p-12 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-8 lg:mb-12 shadow-inner relative group w-full">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[EASY] Balok sederhana (Simply Supported) panjang L=6m menerima beban terpusat P=20kN pada posisi a=3m dari tumpuan A. Hitung reaksi RA menggunakan rumus RA = P(L−a)/L."
        </p>
      </div>
      <div className="grow min-h-[220px] flex flex-col gap-6 w-full">
        <CustomSlider label="Panjang Bentang (L)" val={L} min={4} max={10} step={1} unit="m" keyName="L" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Beban Terpusat (P)" val={P} min={5} max={50} step={5} unit="kN" keyName="P" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Posisi Beban (a)" val={safeA} min={0} max={L} step={0.5} unit="m" keyName="a" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-60 -130 620 280" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Beam */}
          <rect x="0" y="-12" width={svgW} height="24" fill="url(#metal_finish)" rx="5" />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          {/* Point Load Arrow */}
          <motion.g animate={{ x: arrowX }} transition={{ type: 'spring', stiffness: 60, damping: 15 }}>
            <line x1="0" y1={-arrowLen - 14} x2="0" y2="-14" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
            <polygon points="0,-14 -6,-28 6,-28" fill="#f43f5e" />
            <text y={-arrowLen - 22} textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="900" fontFamily="monospace">{P} kN</text>
          </motion.g>
          {/* Dimension line */}
          <line x1="0" y1="50" x2={svgW} y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,4" />
          <line x1="0" y1="44" x2="0" y2="56" stroke="#94a3b8" strokeWidth="1" />
          <line x1={svgW} y1="44" x2={svgW} y2="56" stroke="#94a3b8" strokeWidth="1" />
          <text x={svgW / 2} y="68" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">L = {L} m</text>
          {/* Reactions */}
          <text x="0" y="100" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">RA = {R_A.toFixed(1)} kN</text>
          <text x={svgW} y="100" textAnchor="middle" fill="#64748b" fontSize="13" fontWeight="900" fontFamily="monospace">RB = {R_B.toFixed(1)} kN</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
