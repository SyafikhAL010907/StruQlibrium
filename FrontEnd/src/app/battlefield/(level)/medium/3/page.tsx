"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionM3() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { delta_T = 50, E = 200, alpha = 12 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.delta_T === 50 && i.E === 200 && i.alpha === 12);
  }, [setCheckFn]);

  // σ = E × α × ΔT (E in GPa, α in 10⁻⁶/°C)
  const stress = E * alpha * delta_T / 1000; // MPa (E×10³ MPa × α×10⁻⁶ × ΔT)
  const expansion = Math.min(delta_T * 1.2, 40);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[MEDIUM] Batang baja terjepit di kedua ujung mengalami kenaikan suhu ΔT=50°C. E=200 GPa, α=12×10⁻⁶/°C. Hitung tegangan termal: σ = E·α·ΔT. Target: σ = 120 MPa."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Kenaikan Suhu (ΔT)" val={delta_T} min={10} max={100} step={5} unit="°C" keyName="delta_T" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Modulus Elastis (E)" val={E} min={100} max={300} step={10} unit="GPa" keyName="E" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Koef. Termal (α×10⁻⁶)" val={alpha} min={6} max={20} step={1} unit="/°C" keyName="alpha" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-80 -100 560 250" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Left wall */}
          <rect x="-70" y="-60" width="70" height="120" fill="#1e293b" rx="4" />
          {[...Array(6)].map((_, i) => <line key={i} x1="-70" y1={-55 + i * 22} x2="-50" y2={-33 + i * 22} stroke="#94a3b8" strokeWidth="2" opacity="0.5" />)}
          {/* Right wall */}
          <rect x="400" y="-60" width="70" height="120" fill="#1e293b" rx="4" />
          {[...Array(6)].map((_, i) => <line key={i} x1="400" y1={-55 + i * 22} x2="420" y2={-33 + i * 22} stroke="#94a3b8" strokeWidth="2" opacity="0.5" />)}
          {/* Rod (constrained — length stays same, color changes) */}
          <rect x="0" y="-22" width="400" height="44" fill="url(#metal_finish)" rx="6" />
          {/* Heat waves */}
          {[80, 160, 240, 320].map((x) => (
            <motion.g key={x} animate={{ y: [-3, 3, -3] }} transition={{ duration: 1.2, repeat: Infinity, delay: x * 0.002 }}>
              <path d={`M ${x} -35 Q ${x + 8} -50 ${x + 16} -35`} fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.7" />
              <path d={`M ${x} -50 Q ${x + 8} -65 ${x + 16} -50`} fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity="0.4" />
            </motion.g>
          ))}
          {/* Compressive stress arrows (walls pushing in) */}
          <motion.g animate={{ x: -expansion * 0.3 }} transition={{ type: 'spring', stiffness: 60, damping: 15 }}>
            <line x1="-10" y1="0" x2="30" y2="0" stroke="#60a5fa" strokeWidth="4" />
            <polygon points="30,0 16,-7 16,7" fill="#60a5fa" />
          </motion.g>
          <motion.g animate={{ x: expansion * 0.3 }} transition={{ type: 'spring', stiffness: 60, damping: 15 }}>
            <line x1="410" y1="0" x2="370" y2="0" stroke="#60a5fa" strokeWidth="4" />
            <polygon points="370,0 384,-7 384,7" fill="#60a5fa" />
          </motion.g>
          {/* ΔT label */}
          <text x="200" y="-70" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">ΔT = +{delta_T}°C</text>
          {/* Result */}
          <text x="200" y="90" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="900" fontFamily="monospace">σ = {stress.toFixed(1)} MPa</text>
          <text x="200" y="112" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">Target: 120 MPa</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
