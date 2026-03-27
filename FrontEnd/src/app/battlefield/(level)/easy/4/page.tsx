"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionE4() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { L = 3, P = 10 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.L === 3 && i.P === 10);
  }, [setCheckFn]);

  const M_max = P * L;
  const beamLen = Math.min(Math.max(L * 55, 80), 380);
  const deflection = Math.min(P * L * 0.8, 60);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[EASY] Balok kantilever L=3m terjepit di kiri. Beban P=10kN di ujung bebas. Hitung momen maksimum: M = P×L. Target: M = 30 kN·m."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Panjang Kantilever (L)" val={L} min={1} max={6} step={0.5} unit="m" keyName="L" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Beban Ujung (P)" val={P} min={2} max={30} step={2} unit="kN" keyName="P" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-90 -130 580 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          <rect x="-80" y="-80" width="80" height="160" fill="#1e293b" rx="4" />
          {[...Array(8)].map((_, i) => (
            <line key={i} x1="-80" y1={-80 + i * 22} x2="-60" y2={-58 + i * 22} stroke="#94a3b8" strokeWidth="2" opacity="0.5" />
          ))}
          <rect x="-4" y="-20" width="8" height="40" fill="#f43f5e" />
          <motion.path
            d={`M 0,0 Q ${beamLen / 2},${deflection * 0.2} ${beamLen},${deflection}`}
            fill="none" stroke="url(#metal_finish)" strokeWidth="20" strokeLinecap="round"
            animate={{ d: `M 0,0 Q ${beamLen / 2},${deflection * 0.2} ${beamLen},${deflection}` }}
            transition={{ type: 'spring', stiffness: 50, damping: 12 }}
          />
          <motion.g animate={{ x: beamLen, y: deflection }} transition={{ type: 'spring', stiffness: 50, damping: 12 }}>
            <line x1="0" y1="-80" x2="0" y2="-12" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
            <polygon points="0,-12 -7,-28 7,-28" fill="#f43f5e" />
            <text x="0" y="-92" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="900" fontFamily="monospace">{P} kN</text>
          </motion.g>
          <path d="M 0,-40 A 40,40 0 0,0 0,40" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="6,4" opacity="0.6" />
          <text x="280" y="130" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="900" fontFamily="monospace">M_max = {M_max.toFixed(1)} kN·m</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
