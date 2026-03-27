"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionM5() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { Sx = 80, Sy = 20 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.Sx === 80 && i.Sy === 20);
  }, [setCheckFn]);

  const C = (Sx + Sy) / 2;
  const R = Math.abs(Sx - Sy) / 2;
  const sc = 1.0; // SVG scale: 1 MPa = 1 px (viewBox handles sizing)

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[MEDIUM] Kondisi tegangan biaksial tanpa geser: σx=80MPa, σy=20MPa. Gambar Lingkaran Mohr dan tentukan R = |σx−σy|/2. Target: R = 30 MPa."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Tegangan σx" val={Sx} min={0} max={150} step={5} unit="MPa" keyName="Sx" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Tegangan σy" val={Sy} min={-50} max={100} step={5} unit="MPa" keyName="Sy" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-20 -100 380 240" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* σ axis */}
          <line x1="-10" y1="0" x2="360" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="355" y="-8" fill="#94a3b8" fontSize="11" fontWeight="700">σ (MPa)</text>
          {/* Origin */}
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#94a3b8" strokeWidth="1" />
          <text x="0" y="20" textAnchor="middle" fill="#64748b" fontSize="10">0</text>
          {/* Mohr Circle */}
          <motion.circle
            cx={C} cy={0} r={R}
            fill="rgba(244,63,94,0.08)" stroke="#f43f5e" strokeWidth="3"
            animate={{ cx: C, r: R }} transition={{ type: 'spring', stiffness: 50, damping: 12 }}
            filter="url(#ultraGlow)"
          />
          {/* σy point */}
          <motion.circle cx={Sy} cy={0} r={6} fill="#60a5fa" stroke="white" strokeWidth="2"
            animate={{ cx: Sy }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text animate={{ x: Sy }} y="-14" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="900" fontFamily="monospace">σy={Sy}</motion.text>
          {/* σx point */}
          <motion.circle cx={Sx} cy={0} r={6} fill="#f43f5e" stroke="white" strokeWidth="2"
            animate={{ cx: Sx }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text animate={{ x: Sx }} y="-14" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="900" fontFamily="monospace">σx={Sx}</motion.text>
          {/* Center mark */}
          <motion.line cx={C} cy={0} r={4} animate={{ cx: C }} transition={{ type: 'spring', stiffness: 50, damping: 12 }}>
            <animateTransform attributeName="transform" type="translate" values={`${C},0`} />
          </motion.line>
          <motion.circle cx={C} cy={0} r={4} fill="#f43f5e" animate={{ cx: C }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text animate={{ x: C }} y="18" textAnchor="middle" fill="#f43f5e" fontSize="10" fontFamily="monospace">C={C.toFixed(0)}</motion.text>
          {/* Principal stresses on axis */}
          <motion.line x1={C - R} y1="-8" x2={C - R} y2="8" stroke="#34d399" strokeWidth="2"
            animate={{ x1: C - R, x2: C - R }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text animate={{ x: C - R }} y="24" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">σ2={((C - R)).toFixed(0)}</motion.text>
          <motion.line x1={C + R} y1="-8" x2={C + R} y2="8" stroke="#34d399" strokeWidth="2"
            animate={{ x1: C + R, x2: C + R }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text animate={{ x: C + R }} y="24" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">σ1={((C + R)).toFixed(0)}</motion.text>
          {/* Result */}
          <text x="170" y="100" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="900" fontFamily="monospace">R = {R.toFixed(1)} MPa</text>
          <text x="170" y="120" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">Target: 30 MPa</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
