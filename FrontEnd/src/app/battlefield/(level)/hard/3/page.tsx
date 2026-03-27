"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionH3() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { L_col = 4, E_val = 200, I_val = 8000 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.L_col === 4 && i.E_val === 200 && i.I_val === 8000);
  }, [setCheckFn]);

  // P_cr = π²EI/L² (E in GPa, I in 10³mm⁴, L in m)
  // P_cr = π² × (E×10⁶ kN/m²) × (I×10³×10⁻¹² m⁴) / L²
  const E_kNm2 = E_val * 1e6;
  const I_m4 = I_val * 1e3 * 1e-12;
  const P_cr = (Math.PI ** 2 * E_kNm2 * I_m4) / (L_col ** 2);
  const buckleAmp = Math.min(30 + L_col * 8, 80);
  const colH = Math.min(L_col * 40, 250);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[HARD] Kolom baja langsing L=4m, E=200GPa, I=8000×10³mm⁴. Hitung beban tekuk kritis Euler: Pcr = π²EI/L². Atur slider ke nilai target."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Tinggi Kolom (L)" val={L_col} min={2} max={8} step={0.5} unit="m" keyName="L_col" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Modulus Elastis (E)" val={E_val} min={100} max={300} step={10} unit="GPa" keyName="E_val" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Inersia Penampang (I)" val={I_val} min={2000} max={20000} step={1000} unit="×10³mm⁴" keyName="I_val" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-80 -50 360 370" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Base plate */}
          <rect x="-40" y={colH + 10} width="280" height="16" fill="#1e293b" rx="4" />
          {/* Pin supports (base) */}
          <circle cx="100" cy={colH + 8} r="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
          {/* Buckled column — sinusoidal S-curve */}
          <motion.path
            d={`M 100,${colH} C ${100 + buckleAmp},${colH * 0.75} ${100 - buckleAmp},${colH * 0.25} 100,0`}
            fill="none" stroke="url(#metal_finish)" strokeWidth="18" strokeLinecap="round"
            initial={{ d: `M 100,${colH} C ${100 + buckleAmp},${colH * 0.75} ${100 - buckleAmp},${colH * 0.25} 100,0` }}
            animate={{ d: `M 100,${colH} C ${100 + buckleAmp},${colH * 0.75} ${100 - buckleAmp},${colH * 0.25} 100,0` }}
            transition={{ type: 'spring', stiffness: 40, damping: 12 }}
          />
          {/* Top pin */}
          <circle cx="100" cy="0" r="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
          {/* Load arrow on top */}
          <motion.g>
            <line x1="100" y1="-50" x2="100" y2="-10" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
            <polygon points="100,-10 93,-26 107,-26" fill="#f43f5e" />
            <text x="100" y="-54" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="900" fontFamily="monospace">P_cr</text>
          </motion.g>
          {/* L dimension */}
          <motion.line x1="-50" y1="0" x2="-50" y2={colH} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3"
            initial={{ y2: colH }}
            animate={{ y2: colH }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <line x1="-56" y1="0" x2="-44" y2="0" stroke="#94a3b8" strokeWidth="1" />
          <motion.line x1="-56" y1={colH} x2="-44" y2={colH} stroke="#94a3b8" strokeWidth="1"
            initial={{ y1: colH, y2: colH }}
            animate={{ y1: colH, y2: colH }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text 
            y={colH / 2}
            initial={{ y: colH / 2 }}
            animate={{ y: colH / 2 }} x="-58" textAnchor="end" fill="#94a3b8" fontSize="11" fontWeight="700" fontFamily="monospace">L={L_col}m</motion.text>
          {/* Result */}
          <text x="100" y={colH + 42} textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">Pcr = {(P_cr / 1000).toFixed(0)} kN</text>
          <text x="100" y={colH + 60} textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">π²EI/L²</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
