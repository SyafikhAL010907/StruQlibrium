"use client";

import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Zap, Activity } from "lucide-react";
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SOAL 1: Bridge & Truck ─────────────────────────────────────────────────
function Soal1() {
  const [inputs, setInputs] = useState({ L: 16, W_veh: 100, veh_x: 8 });
  const { L, W_veh, veh_x } = inputs;
  const handleChange = (key: string, val: number) =>
    setInputs(prev => ({ ...prev, [key]: val }));

  const svgW = 500;
  const vx = (veh_x / L) * svgW;
  const deflection = Math.min(W_veh * 0.8, 120);
  const d = `M 0,0 Q ${svgW / 2},${deflection} ${svgW},0`;

  return (
    <div className="space-y-4">
      {/* Brief */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-2xl
        bg-violet-100/30 dark:bg-violet-600/10
        border border-violet-200/50 dark:border-violet-500/20">
        <Zap className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
        <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-semibold">
          Uji lendutan jembatan saat dilintasi kendaraan berat.
          Atur panjang bentang, berat, dan posisi kendaraan secara real-time.
        </p>
      </div>

      {/* SVG Visualizer */}
      <div className="relative w-full rounded-2xl overflow-hidden border
        bg-linear-to-b from-slate-100/50 to-slate-200/50
        dark:from-slate-900/80 dark:to-slate-950/80
        border-slate-200 dark:border-white/5
        shadow-sm dark:shadow-none"
        style={{ aspectRatio: '2.4 / 1' }}
      >
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
          style={{ backgroundImage: 'linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <svg viewBox="-30 -90 560 210" preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full overflow-visible">
          <VisualDefs />
          {/* Ground line */}
          <line x1="-20" y1="40" x2={svgW + 20} y2="40" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />
          {/* Beam */}
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="16" strokeLinecap="round"
            animate={{ d }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          {/* Truck */}
          <motion.g
            animate={{ x: vx, y: -20 + deflection * (1 - Math.abs(vx - svgW / 2) / (svgW / 2)) * 0.6 }}
            transition={{ type: 'spring', stiffness: 50, damping: 12 }}
          >
            {/* Truck body */}
            <rect x="-38" y="-28" width="76" height="24" rx="5" fill="#7c3aed" />
            {/* Cab */}
            <rect x="28" y="-24" width="18" height="14" rx="3" fill="#a78bfa" />
            {/* Windshield */}
            <rect x="31" y="-22" width="12" height="7" rx="1" fill="#c4b5fd" opacity="0.7" />
            {/* Wheels */}
            <circle cx="-24" cy="-4" r="8" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
            <circle cx="24" cy="-4" r="8" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
            <circle cx="-24" cy="-4" r="3" fill="#6366f1" />
            <circle cx="24" cy="-4" r="3" fill="#6366f1" />
            {/* Load label */}
            <text y="-38" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="900" fontFamily="monospace">
              {W_veh} kN
            </text>
            {/* Downward force arrow */}
            <line x1="0" y1="-30" x2="0" y2="-10" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowRed)" opacity="0.6" />
          </motion.g>

          {/* Span dimension label */}
          <text x={svgW / 2} y="75" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="700" fontFamily="monospace">
            L = {L} m
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="rounded-2xl p-4 space-y-1
        bg-slate-100/40 dark:bg-white/5
        border border-slate-200/60 dark:border-white/5
        shadow-sm dark:shadow-none">
        <CustomSlider label="Bentang Jembatan (L)" val={L} min={8} max={24} step={1} unit="m"
          keyName="L" colorClass="text-violet-600 dark:text-violet-400" hexColor="#8b5cf6" onChange={handleChange} />
        <CustomSlider label="Berat Kendaraan (W)" val={W_veh} min={20} max={200} step={10} unit="kN"
          keyName="W_veh" colorClass="text-violet-600 dark:text-violet-400" hexColor="#8b5cf6" onChange={handleChange} />
        <CustomSlider label="Posisi Kendaraan (x)" val={veh_x} min={0} max={L} step={0.5} unit="m"
          keyName="veh_x" colorClass="text-violet-600 dark:text-violet-400" hexColor="#8b5cf6" onChange={handleChange} />
      </div>
    </div>
  );
}

// ─── SOAL 2: Mohr Circle ─────────────────────────────────────────────────────
function Soal2() {
  const [inputs, setInputs] = useState({ Sx: 100, Sy: -50, Txy: 80 });
  const { Sx, Sy, Txy } = inputs;
  const handleChange = (key: string, val: number) =>
    setInputs(prev => ({ ...prev, [key]: val }));

  const C = (Sx + Sy) / 2;
  const R = Math.sqrt(((Sx - Sy) / 2) ** 2 + Txy ** 2);
  const sc = 0.7;
  const Cs = C * sc;
  const Rs = Math.max(R * sc, 2);
  const Sxs = Sx * sc, Sys_v = Sy * sc, Txys = Txy * sc;

  return (
    <div className="space-y-4">
      {/* Brief */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-2xl
        bg-indigo-100/30 dark:bg-indigo-600/10
        border border-indigo-200/50 dark:border-indigo-500/20">
        <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-semibold">
          Analisis Lingkaran Mohr: Geser slider untuk mengubah tegangan normal dan geser, lalu amati perubahan kondisi tegangan utama secara real-time.
        </p>
      </div>

      {/* SVG Visualizer — responsive square */}
      <div className="relative w-full rounded-2xl overflow-hidden border
        bg-linear-to-b from-slate-100/50 to-slate-200/50
        dark:from-slate-900/80 dark:to-slate-950/80
        border-slate-200 dark:border-white/5
        shadow-sm dark:shadow-none"
        style={{ aspectRatio: '1 / 1', maxHeight: '260px' }}
      >
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.10]"
          style={{ backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <svg viewBox="-155 -155 310 310" preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full overflow-visible">
          <VisualDefs />

          {/* Axis lines */}
          <g opacity="0.35">
            <line x1="-148" y1="0" x2="148" y2="0" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="0" y1="-148" x2="0" y2="148" stroke="#94a3b8" strokeWidth="1.2" />
            {/* Tick marks */}
            {[-120, -80, -40, 40, 80, 120].map(v => (
              <g key={v}>
                <line x1={v} y1="-3" x2={v} y2="3" stroke="#94a3b8" strokeWidth="1" />
                <line x1="-3" y1={v} x2="3" y2={v} stroke="#94a3b8" strokeWidth="1" />
              </g>
            ))}
          </g>

          {/* Mohr Circle glow fill */}
          <motion.circle cx={Cs} cy={0} r={Rs}
            fill="rgba(99,102,241,0.08)" stroke="#6366f1" strokeWidth="2.5"
            animate={{ cx: Cs, r: Rs }} transition={{ type: 'spring', stiffness: 50, damping: 12 }}
            filter="url(#ultraGlow)" />

          {/* Diameter line */}
          <motion.line x1={Sxs} y1={-Txys} x2={Sys_v} y2={Txys}
            stroke="#818cf8" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.8"
            animate={{ x1: Sxs, y1: -Txys, x2: Sys_v, y2: Txys }}
            transition={{ type: 'spring', stiffness: 50, damping: 12 }} />

          {/* Center cross */}
          <motion.circle cx={Cs} cy={0} r={3} fill="#818cf8"
            animate={{ cx: Cs }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />

          {/* Data points */}
          <motion.circle cx={Sxs} cy={-Txys} r={5} fill="#8b5cf6" stroke="white" strokeWidth="1.5"
            animate={{ cx: Sxs, cy: -Txys }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />
          <motion.circle cx={Sys_v} cy={Txys} r={5} fill="#4f46e5" stroke="white" strokeWidth="1.5"
            animate={{ cx: Sys_v, cy: Txys }} transition={{ type: 'spring', stiffness: 50, damping: 12 }} />

          {/* Axis labels */}
          <text x="145" y="-5" textAnchor="end" fill="#64748b" fontSize="9" fontWeight="700">σ (MPa)</text>
          <text x="5" y="-143" textAnchor="start" fill="#64748b" fontSize="9" fontWeight="700">τ (MPa)</text>

          {/* Stats */}
          <text x="-148" y="148" fill="#6366f1" fontSize="9" fontWeight="900" fontFamily="monospace" opacity="0.8">
            C = {C.toFixed(1)}   R = {R.toFixed(1)} MPa
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="rounded-2xl p-4 space-y-1
        bg-slate-100/40 dark:bg-white/5
        border border-slate-200/60 dark:border-white/5
        shadow-sm dark:shadow-none">
        <CustomSlider label="Tegangan Normal X (σx)" val={Sx} min={-200} max={200} step={5} unit="MPa"
          keyName="Sx" colorClass="text-indigo-600 dark:text-indigo-400" hexColor="#6366f1" onChange={handleChange} />
        <CustomSlider label="Tegangan Normal Y (σy)" val={Sy} min={-200} max={200} step={5} unit="MPa"
          keyName="Sy" colorClass="text-indigo-600 dark:text-indigo-400" hexColor="#6366f1" onChange={handleChange} />
        <CustomSlider label="Tegangan Geser (τxy)" val={Txy} min={0} max={150} step={5} unit="MPa"
          keyName="Txy" colorClass="text-indigo-600 dark:text-indigo-400" hexColor="#6366f1" onChange={handleChange} />
      </div>
    </div>
  );
}

// ─── SOAL CONFIG ─────────────────────────────────────────────────────────────
const SOALS = [
  { label: 'Beban Bergerak', Component: Soal1, accent: 'violet' },
  { label: 'Lingkaran Mohr', Component: Soal2, accent: 'indigo' },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PageGAYA5() {
  const [soalIdx, setSoalIdx] = useState(0);
  const { Component: ActiveSoal, accent } = SOALS[soalIdx];

  const isViolet = accent === 'violet';

  return (
    <div className="space-y-6">
      {/* ── Header Row ── */}
      <div className="flex items-center justify-between">
        <h2 className="font-outfit text-xl font-black uppercase flex items-center gap-2.5 text-slate-900 dark:text-white">
          <BookOpen className="text-violet-600 w-5 h-5" />
          LATIHAN
        </h2>
        <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500">
          {soalIdx + 1} / {SOALS.length} SOAL
        </span>
      </div>

      {/* ── Tab Pills ── */}
      <div className="flex gap-2 p-1.5 rounded-2xl
        bg-slate-100 dark:bg-slate-800/50
        border border-slate-200 dark:border-slate-700/40">
        {SOALS.map(({ label }, i) => (
          <button
            key={i}
            onClick={() => setSoalIdx(i)}
            className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
              soalIdx === i
                ? i === 0
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Soal {i + 1} — {label}
          </button>
        ))}
      </div>

      {/* ── Soal Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={soalIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <ActiveSoal />
        </motion.div>
      </AnimatePresence>

      {/* ── Navigation ── */}
      <div className="grid grid-cols-2 gap-3 pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setSoalIdx(i => Math.max(0, i - 1))}
          disabled={soalIdx === 0}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl
            text-[11px] font-black uppercase tracking-widest
            bg-transparent
            text-slate-600 dark:text-slate-400
            border border-slate-300 dark:border-slate-700
            hover:border-violet-500 hover:text-violet-600 dark:hover:border-violet-500 dark:hover:text-violet-400
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-150"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Sebelumnya
        </button>

        <button
          onClick={() => setSoalIdx(i => Math.min(SOALS.length - 1, i + 1))}
          disabled={soalIdx === SOALS.length - 1}
          className={`flex items-center justify-center gap-2 py-3 rounded-2xl
            text-[11px] font-black uppercase tracking-widest text-white
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-150 ${
              isViolet
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30'
                : 'bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-600/30'
            }`}
        >
          Selanjutnya
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}