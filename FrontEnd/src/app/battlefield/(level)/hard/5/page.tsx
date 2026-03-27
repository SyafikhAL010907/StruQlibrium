"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionH5() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { Sx = 100, Sy = -50, Txy = 80 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.Sx === 100 && i.Sy === -50 && i.Txy === 80);
  }, [setCheckFn]);

  const C = (Sx + Sy) / 2;
  const R = Math.sqrt(((Sx - Sy) / 2) ** 2 + Txy ** 2);
  const sigma1 = C + R;
  const sigma2 = C - R;
  const theta_p = (Math.atan2(2 * Txy, Sx - Sy) / 2) * (180 / Math.PI);

  const sc = 0.8;
  const Cs = C * sc;
  const Rs = Math.max(R * sc, 4);
  const Sxs = Sx * sc, Sys_v = Sy * sc, Txys = Txy * sc;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[HARD] Kerangka sayap pesawat: σx=100MPa (tension), σy=−50MPa (compression), τxy=80MPa (shear). Verifikasi kondisi tegangan utama menggunakan Lingkaran Mohr."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Tegangan Normal σx" val={Sx} min={-150} max={150} step={5} unit="MPa" keyName="Sx" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Tegangan Normal σy" val={Sy} min={-150} max={150} step={5} unit="MPa" keyName="Sy" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Tegangan Geser τxy" val={Txy} min={0} max={120} step={5} unit="MPa" keyName="Txy" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-170 -180 440 380" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Axes */}
          <line x1="-165" y1="0" x2="260" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="0" y1="-175" x2="0" y2="175" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="255" y="-6" fill="#94a3b8" fontSize="10" fontWeight="700">σ (MPa)</text>
          <text x="5" y="-168" fill="#94a3b8" fontSize="10" fontWeight="700">τ (MPa)</text>
          {/* Tick marks */}
          {[-120, -80, -40, 40, 80, 120].map(v => (
            <g key={v}>
              <line x1={v * sc} y1="-4" x2={v * sc} y2="4" stroke="#94a3b8" strokeWidth="1" />
              <line x1="-4" y1={v * sc} x2="4" y2={v * sc} stroke="#94a3b8" strokeWidth="1" />
            </g>
          ))}
          {/* Mohr Circle */}
          <motion.circle cx={Cs} cy={0} r={Rs}
            fill="rgba(244,63,94,0.1)" stroke="#f43f5e" strokeWidth="3"
            initial={{ cx: Cs, r: Rs }}
            animate={{ cx: Cs, r: Rs }} transition={{ type: 'spring', stiffness: 50, damping: 12 }}
            filter="url(#ultraGlow)" />
          {/* Diameter line */}
          <motion.line x1={Sxs} y1={-Txys} x2={Sys_v} y2={Txys}
            stroke="#f43f5e" strokeWidth="2" strokeDasharray="8,5" opacity="0.8"
            initial={{ x1: Sxs, y1: -Txys, x2: Sys_v, y2: Txys }}
            animate={{ x1: Sxs, y1: -Txys, x2: Sys_v, y2: Txys }}
            transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          {/* Center */}
          <motion.circle cx={Cs} cy={0} r={4} fill="#f43f5e"
            initial={{ cx: Cs }}
            animate={{ cx: Cs }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          {/* Data points */}
          <motion.circle cx={Sxs} cy={-Txys} r={7} fill="#f43f5e" stroke="white" strokeWidth="2"
            initial={{ cx: Sxs, cy: -Txys }}
            animate={{ cx: Sxs, cy: -Txys }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text 
            x={Sxs + 10} y={-Txys - 10}
            initial={{ x: Sxs + 10, y: -Txys - 10 }}
            animate={{ x: Sxs + 10, y: -Txys - 10 }} fill="#f43f5e" fontSize="10" fontWeight="900" fontFamily="monospace">A(σx,τxy)</motion.text>
          <motion.circle cx={Sys_v} cy={Txys} r={7} fill="#60a5fa" stroke="white" strokeWidth="2"
            initial={{ cx: Sys_v, cy: Txys }}
            animate={{ cx: Sys_v, cy: Txys }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text 
            x={Sys_v - 70} y={Txys + 14}
            initial={{ x: Sys_v - 70, y: Txys + 14 }}
            animate={{ x: Sys_v - 70, y: Txys + 14 }} fill="#60a5fa" fontSize="10" fontWeight="900" fontFamily="monospace">B(σy,−τxy)</motion.text>
          {/* Principal stresses */}
          <motion.circle cx={Cs + Rs} cy={0} r={5} fill="#34d399" stroke="white" strokeWidth="1.5"
            initial={{ cx: Cs + Rs }}
            animate={{ cx: Cs + Rs }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text 
            x={Cs + Rs}
            initial={{ x: Cs + Rs }}
            animate={{ x: Cs + Rs }} y="18" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace">σ1={sigma1.toFixed(0)}</motion.text>
          <motion.circle cx={Cs - Rs} cy={0} r={5} fill="#34d399" stroke="white" strokeWidth="1.5"
            initial={{ cx: Cs - Rs }}
            animate={{ cx: Cs - Rs }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text 
            x={Cs - Rs}
            initial={{ x: Cs - Rs }}
            animate={{ x: Cs - Rs }} y="18" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace">σ2={sigma2.toFixed(0)}</motion.text>
          {/* τ_max */}
          <motion.circle cx={Cs} cy={-Rs} r={5} fill="#a78bfa" stroke="white" strokeWidth="1.5"
            initial={{ cx: Cs, cy: -Rs }}
            animate={{ cx: Cs, cy: -Rs }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.text 
            x={Cs + 10} y={-Rs}
            initial={{ x: Cs + 10, y: -Rs }}
            animate={{ x: Cs + 10, y: -Rs }} fill="#a78bfa" fontSize="9" fontFamily="monospace">τmax={R.toFixed(0)}</motion.text>
          {/* Stats */}
          <text x="-160" y="155" fill="#f43f5e" fontSize="10" fontWeight="900" fontFamily="monospace">C={C.toFixed(1)}  R={R.toFixed(1)} MPa  θp={theta_p.toFixed(1)}°</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
