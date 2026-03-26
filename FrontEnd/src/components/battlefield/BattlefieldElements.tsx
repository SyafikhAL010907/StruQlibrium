"use client";

import React, { memo } from 'react';
import { motion } from 'framer-motion';

// Reusable Slider Component
export const CustomSlider = memo(({ label, val, min, max, step, unit, keyName, colorClass, hexColor, onChange }: any) => (
  <div className="mb-4 sm:mb-6 group relative">
    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
      <div className="flex items-center gap-1.5 sm:gap-2">
         <span className={`w-1 h-3 rounded-full`} style={{ backgroundColor: hexColor }} />
         <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <div className="bg-slate-100 dark:bg-slate-900/90 px-2 sm:px-3 py-0.5 sm:py-1 rounded border border-slate-200 dark:border-blue-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <span className={`text-[10px] sm:text-[12px] font-mono font-bold ${colorClass}`}>{val}{unit}</span>
      </div>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={val} 
      onChange={(e) => onChange(keyName, Number(e.target.value))}
      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-crosshair hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
      style={{ accentColor: hexColor }}
    />
  </div>
));

// Reusable Support System Component
export const SupportSystem = memo(({ type, x, y }: { type: string, x: number, y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <defs>
      <pattern id="concrete_hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#475569" strokeWidth="2" />
      </pattern>
    </defs>
    <rect x="-35" y="20" width="70" height="15" fill="url(#concrete_hatch)" stroke="#475569" strokeWidth="1.5" rx="2" />
    <line x1="-35" y1="20" x2="35" y2="20" stroke="#94a3b8" strokeWidth="2" />
    {type === 'pin' ? (
      <g>
        <path d="M -20,20 L 0,0 L 20,20 Z" fill="#1e293b" className="dark:fill-[#1e293b] fill-slate-300" stroke="#cbd5e1" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="0" cy="0" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        <circle cx="-12" cy="16" r="2" fill="#94a3b8" />
        <circle cx="12" cy="16" r="2" fill="#94a3b8" />
      </g>
    ) : (
      <g>
        <circle cx="-12" cy="14" r="6" fill="#1e293b" className="dark:fill-[#1e293b] fill-slate-300" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="12" cy="14" r="6" fill="#1e293b" className="dark:fill-[#1e293b] fill-slate-300" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M -18,2 L 18,2" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
        <line x1="-25" y1="20" x2="25" y2="20" stroke="#cbd5e1" strokeWidth="3" />
      </g>
    )}
  </g>
));

export const VisualDefs = memo(() => (
  <defs>
    <filter id="ultraGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
    <linearGradient id="metal_finish" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#475569" /><stop offset="30%" stopColor="#94a3b8" /><stop offset="50%" stopColor="#f8fafc" /><stop offset="70%" stopColor="#94a3b8" /><stop offset="100%" stopColor="#1e293b" /></linearGradient>
  </defs>
));
