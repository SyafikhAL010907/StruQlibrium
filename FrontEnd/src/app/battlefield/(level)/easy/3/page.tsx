"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function Mission3() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { L = 8, w = 5 } = inputs;
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(!!document.getElementById('visualizer-portal'));
    setCheckFn((i) => (i.L || 0) === 8 && (i.w || 0) === 5);
  }, [setCheckFn]);

  const safeL = L || 8;
  const safeW = w || 0;
  
  const svgW = 600;
  const getElasticPath = (amp = 1) => {
    let d = `M 0,0 `;
    for(let i=1; i<=30; i++) {
      let x = (i/30) * svgW;
      let y = amp * Math.sin(Math.PI * (i/30));
      d += `L ${x},${y} `;
    }
    return d;
  };
  const d = getElasticPath(safeW * 3);
  const arrows = Array.from({ length: 11 }, (_, i) => i * (svgW/10));

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-cyan-500 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-bold italic pl-6 sm:pl-8">
          "Lantai kilang dengan beban jentera agihan w=5 kN/m. Cari panjang rentang L agar momen tidak melebihi 40 kNm. (Target L=8)"
        </p>
      </div>

      <div className="grow min-h-[150px]">
        <CustomSlider label="Panjang Rentang" val={L} min={2} max={10} step={1} unit="m" keyName="L" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Beban Agihan (w)" val={w} min={0} max={20} step={1} unit="kN/m" keyName="w" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
      </div>

      {portalReady && createPortal(
        <svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          <motion.g animate={{ y: -40 - safeW * 1.5 }}>
            <rect x="0" y="25" width={svgW} height="10" fill="#0ea5e9" opacity="0.3" rx="4" />
            {arrows.map((ax, i) => (
              <line key={i} x1={ax} y1="0" x2={ax} y2="35" stroke="#0ea5e9" strokeWidth="4" markerEnd="url(#arrowRed)" />
            ))}
            <text x={svgW/2} y="-10" textAnchor="middle" fill="#0ea5e9" className="text-[16px] font-black font-mono">w = {safeW} kN/m</text>
          </motion.g>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
