"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionE5() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { Fx = 30, Fy = 40 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.Fx === 30 && i.Fy === 40);
  }, [setCheckFn]);

  const R = Math.sqrt(Fx ** 2 + Fy ** 2);
  const angle = Math.atan2(Fy, Fx) * (180 / Math.PI);
  const sc = 2.2;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[EASY] Dua gaya tegak lurus: Fx=30kN (horizontal) dan Fy=40kN (vertikal). Hitung resultan: R = √(Fx²+Fy²). Target: R = 50 kN."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Gaya Horizontal (Fx)" val={Fx} min={0} max={60} step={5} unit="kN" keyName="Fx" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Gaya Vertikal (Fy)" val={Fy} min={0} max={60} step={5} unit="kN" keyName="Fy" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-60 -160 400 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Axes */}
          <line x1="-40" y1="0" x2="200" y2="0" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
          <line x1="0" y1="20" x2="0" y2="-155" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
          {/* Fx arrow (horizontal) */}
          <motion.line x1="0" y1="0" x2={Fx * sc} y2="0" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round"
            animate={{ x2: Fx * sc }} transition={{ type: 'spring', stiffness: 60, damping: 15 }} />
          <motion.polygon points={`${Fx * sc},0 ${Fx * sc - 14},-7 ${Fx * sc - 14},7`} fill="#60a5fa"
            animate={{ transform: `translateX(${Fx * sc - Fx * sc * 0 }px)` }} />
          <motion.text animate={{ x: Fx * sc * 0.5 }} y="18" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="900" fontFamily="monospace">
            Fx={Fx}
          </motion.text>
          {/* Fy arrow (vertical, upward) */}
          <motion.line x1="0" y1="0" x2="0" y2={-Fy * sc} stroke="#34d399" strokeWidth="5" strokeLinecap="round"
            animate={{ y2: -Fy * sc }} transition={{ type: 'spring', stiffness: 60, damping: 15 }} />
          <motion.polygon points={`0,${-Fy * sc} -7,${-Fy * sc + 14} 7,${-Fy * sc + 14}`} fill="#34d399"
            animate={{ transform: `translateY(${-Fy * sc}px)` }} />
          <motion.text animate={{ y: -Fy * sc * 0.5 }} x="-22" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="900" fontFamily="monospace">
            Fy={Fy}
          </motion.text>
          {/* Dashed construction lines */}
          <motion.line x1={Fx * sc} y1="0" x2={Fx * sc} y2={-Fy * sc} stroke="#64748b" strokeWidth="1.5" strokeDasharray="5,4"
            animate={{ x1: Fx * sc, x2: Fx * sc, y2: -Fy * sc }} transition={{ type: 'spring', stiffness: 60, damping: 15 }} />
          <motion.line x1="0" y1={-Fy * sc} x2={Fx * sc} y2={-Fy * sc} stroke="#64748b" strokeWidth="1.5" strokeDasharray="5,4"
            animate={{ y1: -Fy * sc, x2: Fx * sc, y2: -Fy * sc }} transition={{ type: 'spring', stiffness: 60, damping: 15 }} />
          {/* Resultant R */}
          <motion.line x1="0" y1="0" x2={Fx * sc} y2={-Fy * sc} stroke="#f43f5e" strokeWidth="5" strokeLinecap="round"
            animate={{ x2: Fx * sc, y2: -Fy * sc }} transition={{ type: 'spring', stiffness: 60, damping: 15 }} />
          <motion.polygon fill="#f43f5e"
            animate={{ points: `${Fx * sc},${-Fy * sc} ${Fx * sc - 14 * Math.cos(Math.atan2(-Fy, Fx))},${-Fy * sc - 14 * Math.sin(Math.atan2(-Fy, Fx))} ${Fx * sc - 14 * Math.cos(Math.atan2(-Fy, Fx)) - 7 * Math.sin(Math.atan2(-Fy, Fx))},${-Fy * sc - 14 * Math.sin(Math.atan2(-Fy, Fx)) + 7 * Math.cos(Math.atan2(-Fy, Fx))}` }} />
          {/* Angle arc */}
          <path d={`M 30,0 A 30,30 0 0,0 ${30 * Math.cos(-Math.atan2(Fy, Fx))},${30 * Math.sin(-Math.atan2(Fy, Fx))}`}
            fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.5" />
          <text x={Fx * sc * 0.7} y={-Fy * sc * 0.5 - 12} textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">R</text>
          {/* Result label */}
          <text x="150" y="60" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="900" fontFamily="monospace">R = {R.toFixed(1)} kN</text>
          <text x="150" y="82" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">θ = {angle.toFixed(1)}°</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
