"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionE3() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { V = 20, A_bolt = 200 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.V === 20 && i.A_bolt === 200);
  }, [setCheckFn]);

  const tau = V / A_bolt; // kN/mm² × 1000 = MPa, or just raw ratio
  const slideOffset = Math.min(V * 1.5, 30);
  const boltR = Math.max(Math.min(Math.sqrt(A_bolt / Math.PI), 14), 5);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[EASY] Koneksi dua pelat baja dengan satu baut menahan gaya geser V=20kN. Luas baut A=200mm². Hitung tegangan geser: τ = V/A. Target: τ = 0.100 kN/mm²."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Gaya Geser (V)" val={V} min={5} max={50} step={5} unit="kN" keyName="V" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Luas Baut (A)" val={A_bolt} min={100} max={400} step={20} unit="mm²" keyName="A_bolt" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-80 -120 560 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Bottom plate (fixed) */}
          <rect x="0" y="30" width="400" height="55" fill="url(#metal_finish)" rx="4" />
          {/* Top plate (sliding) */}
          <motion.g animate={{ x: slideOffset }} transition={{ type: 'spring', stiffness: 60, damping: 15 }}>
            <rect x="60" y="-55" width="340" height="55" fill="url(#metal_finish)" rx="4" />
            {/* Force arrow on top plate */}
            <line x1={350} y1="-28" x2={350 + 70} y2="-28" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
            <polygon points={`${350 + 70},-28 ${350 + 56},-21 ${350 + 56},-35`} fill="#f43f5e" />
            <text x={350 + 35} y="-42" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">{V} kN</text>
          </motion.g>
          {/* Shear plane highlight */}
          <motion.rect
            x="55" y="-5" width="320" height="38"
            fill="rgba(244,63,94,0.12)" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="6,4"
            animate={{ x: 55 + slideOffset * 0.3 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          />
          {/* Bolt */}
          <circle cx="210" cy="12" r={boltR} fill="#1e293b" stroke="#f43f5e" strokeWidth="3" />
          <circle cx="210" cy="12" r={boltR * 0.35} fill="#f43f5e" />
          {/* Reaction arrow on bottom plate */}
          <line x1="-10" y1="57" x2="-70" y2="57" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <polygon points="-70,57 -56,50 -56,64" fill="#64748b" />
          {/* Result labels */}
          <text x="200" y="115" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="900" fontFamily="monospace">
            τ = {tau.toFixed(3)} kN/mm²
          </text>
          <text x="200" y="136" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">Shear Plane Area = {A_bolt} mm²</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
