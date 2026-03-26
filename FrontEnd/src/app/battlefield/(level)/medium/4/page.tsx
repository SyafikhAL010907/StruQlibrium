"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionM4() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { H_wall = 6, gamma = 18 } = inputs;
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(!!document.getElementById('visualizer-portal'));
    setCheckFn((i) => (i.H_wall || 0) === 6 && (i.gamma || 0) === 18);
  }, [setCheckFn]);

  const safeH = H_wall || 6;
  const safeGamma = gamma || 18;
  const wallH = safeH * 40;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-full group-hover:w-2 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-300 text-[14px] sm:text-[16px] leading-relaxed font-medium italic pl-6 sm:pl-8">
          "Dinding penahan cerun <span className="text-cyan-600 font-black">H={H_wall}m</span> menahan tanah runtuh dengan densiti <span className="text-cyan-600 font-black">{gamma} kN/m³</span>."
        </p>
      </div>

      <div className="grow min-h-[150px]">
        <CustomSlider label="Tinggi Dinding" val={H_wall} min={2} max={10} step={1} unit="m" keyName="H_wall" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Densiti Tanah" val={gamma} min={10} max={22} step={1} unit="kN/m³" keyName="gamma" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
      </div>

      {portalReady && createPortal(
        <svg viewBox="-150 -50 500 500" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible">
          <VisualDefs />
          {/* Wall Structure */}
          <rect x="0" y="0" width="30" height={wallH} fill="url(#metal_finish)" rx="4" filter="url(#ultraGlow)" />
          
          {/* Pressure Distribution (Triangular) */}
          <motion.path 
            d={`M 0,0 L ${safeGamma * 5},${wallH} L 0,${wallH} Z`} 
            fill="rgba(217,119,6,0.3)" 
            stroke="#d97706" 
            strokeWidth="2"
            animate={{ d: `M 0,0 L ${safeGamma * 5},${wallH} L 0,${wallH} Z` }}
          />
          
          {/* Soil Indicator */}
          <rect x="30" y="0" width="250" height={wallH} fill="rgba(217,119,6,0.05)" />
          
          {/* Force Arrows */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((p, i) => (
            <motion.line 
              key={i}
              x1={safeGamma * 5 * p} y1={wallH * p} x2="5" y2={wallH * p} 
              stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowRed)"
              animate={{ x1: safeGamma * 5 * p, y1: wallH * p }}
            />
          ))}

          <text x="150" y={wallH/2} textAnchor="middle" fill="#d97706" className="text-[16px] font-black font-mono">γ = {safeGamma} kN/m³</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
