"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function Mission4() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { L = 6, w_max = 12 } = inputs;
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(!!document.getElementById('visualizer-portal'));
    setCheckFn((i) => (i.L || 0) === 6 && (i.w_max || 0) === 12);
  }, [setCheckFn]);

  const safeL = L || 6;
  const safeWMax = w_max || 0;
  const wallH = 250; 
  const pressMaxValue = safeWMax * 10;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-500 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-bold italic pl-6 sm:pl-8">
          "Dinding empangan menahan tekanan hidrostatik air w_max=12 kN/m pada ketinggian 6m."
        </p>
      </div>

      <div className="grow min-h-[150px]">
        <CustomSlider label="Ketinggian Dinding" val={L} min={2} max={10} step={1} unit="m" keyName="L" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Tekanan Maks" val={w_max} min={0} max={30} step={2} unit="kN/m" keyName="w_max" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
      </div>

      {portalReady && createPortal(
        <svg viewBox="-150 -50 400 350" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible">
          <VisualDefs />
          <rect x="0" y="0" width="30" height={wallH} fill="url(#metal_finish)" rx="4" />
          <rect x="30" y="0" width="100" height={wallH} fill="rgba(71,85,105,0.1)" />
          <motion.path d={`M -${pressMaxValue},${wallH} L 0,0 L 0,${wallH} Z`} fill="#3b82f6" opacity="0.2" animate={{ d: `M -${pressMaxValue},${wallH} L 0,0 L 0,${wallH} Z` }} />
          {Array.from({ length: 7 }, (_, i) => {
             const yPos = (wallH/6)*i;
             const pressW = (pressMaxValue/6)*i;
             if (pressW === 0) return null;
             return <motion.line key={i} x1={-pressW} y1={yPos} x2={0} y2={yPos} stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrowRed)" animate={{ x1: -pressW, y1: yPos }} />
          })}
          <text x={-pressMaxValue - 20} y={wallH} textAnchor="end" fill="#3b82f6" className="text-[16px] font-black font-mono">{safeWMax} kN/m</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
