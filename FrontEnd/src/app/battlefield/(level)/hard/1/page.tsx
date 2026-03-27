"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionH1() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { H = 6, gamma = 18 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.H === 6 && i.gamma === 18);
  }, [setCheckFn]);

  // Total horizontal force F = γH²/2
  const F = gamma * H * H / 2;
  const wallH = Math.min(Math.max(H * 22, 60), 180);
  const maxPressure = Math.min(gamma * H * 0.9, 90); // base pressure in SVG units

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[HARD] Dinding penahan tanah setinggi H=6m menahan tekanan tanah lateral. γ=18 kN/m³. Hitung gaya total: F = γH²/2. Target: F = 324 kN/m."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Tinggi Dinding (H)" val={H} min={2} max={10} step={0.5} unit="m" keyName="H" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Berat Jenis Tanah (γ)" val={gamma} min={10} max={25} step={1} unit="kN/m³" keyName="gamma" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-180 -20 480 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Soil fill (right side) */}
          <motion.rect x="0" width="200" height={wallH} fill="rgba(146,109,57,0.3)" stroke="rgba(146,109,57,0.5)" strokeWidth="1"
            initial={{ height: wallH, y: 200 - wallH }}
            animate={{ height: wallH, y: 200 - wallH }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          {/* Soil hatch */}
          {Array.from({ length: 6 }).map((_, i) => {
            const y1 = 200 - wallH + i * (wallH / 6);
            const y2 = y1 + 25;
            return (
              <motion.line key={i} x1="10" y1={y1} x2="60" y2={y2} stroke="rgba(146,109,57,0.5)" strokeWidth="1.5"
                initial={{ y1, y2 }}
            animate={{ y1, y2 }}
                transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
            );
          })}
          {/* Wall */}
          <motion.rect x="-20" width="20" height={wallH} fill="url(#metal_finish)" rx="3"
            initial={{ height: wallH, y: 200 - wallH }}
            animate={{ height: wallH, y: 200 - wallH }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          {/* Ground */}
          <line x1="-180" y1="200" x2="280" y2="200" stroke="#64748b" strokeWidth="2" />
          {/* Triangular pressure diagram */}
          <motion.polygon
            points={`-20,${200 - wallH} -20,200 ${-20 - maxPressure},200`}
            fill="rgba(244,63,94,0.15)" stroke="#f43f5e" strokeWidth="2"
            initial={{ points: `-20,${200 - wallH} -20,200 ${-20 - maxPressure},200` }}
            animate={{ points: `-20,${200 - wallH} -20,200 ${-20 - maxPressure},200` }}
            transition={{ type: 'spring', stiffness: 50, damping: 12 }}
          />
          {/* Pressure arrows */}
          {Array.from({ length: 5 }).map((_, i) => {
            const arrowLen = (i / 4) * maxPressure;
            const targetY = 200 - wallH + (i / 4) * wallH;
            return (
              <motion.g key={i}
                initial={{ y: targetY }}
                animate={{ y: targetY }}
                transition={{ type: 'spring', stiffness: 50, damping: 12 }}>
                <line x1={-20 - arrowLen} y1={0} x2="-22" y2={0} stroke="#f43f5e" strokeWidth="2" />
                <polygon points={`-20,0 -30,-5 -30,5`} fill="#f43f5e" />
              </motion.g>
            );
          })}
          {/* H dimension */}
          <motion.line x1="-150" y1={200 - wallH} x2="-150" y2="200" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3"
            initial={{ y1: 200 - wallH }}
            animate={{ y1: 200 - wallH }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text animate={{ y: 200 - wallH / 2 }} x="-155" textAnchor="end" fill="#94a3b8" fontSize="12" fontWeight="700" fontFamily="monospace">H = {H}m</motion.text>
          {/* Result */}
          <text x="50" y="248" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="900" fontFamily="monospace">F = {F.toFixed(0)} kN/m</text>
          <text x="50" y="266" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">Target: 324 kN/m</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
