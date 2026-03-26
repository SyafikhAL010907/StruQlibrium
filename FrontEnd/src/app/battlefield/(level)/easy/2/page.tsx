"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function Mission2() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { L = 8, oh = 2, P = 15 } = inputs;
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(!!document.getElementById('visualizer-portal'));
    setCheckFn((i) => (i.L || 0) === 8 && (i.oh || 0) === 2 && (i.P || 0) === 15);
  }, [setCheckFn]);

  const safeL = L || 8;
  const safeOH = oh || 0;
  const safeP = P || 0;

  const svgW = 600;
  const L_main = safeL - safeOH; 
  const supportX = (L_main / safeL) * svgW;
  const deflPos = safeP * 0.8;
  let d = `M 0,0 Q ${supportX/2},${-deflPos*0.2} ${supportX},0 Q ${supportX + ((svgW - supportX)/2)},${deflPos/2} ${svgW},${deflPos}`;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-emerald-500 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-bold italic pl-6 sm:pl-8">
          "Struktur lantai balkoni L=8m dengan anjungan (overhang) 2m. Laraskan beban hujung seberat 15kN!"
        </p>
      </div>

      <div className="grow min-h-[200px]">
        <CustomSlider label="Panjang Utama" val={L} min={4} max={12} step={1} unit="m" keyName="L" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Anjungan (oh)" val={oh} min={1} max={L-1} step={0.5} unit="m" keyName="oh" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Beban Hujung" val={P} min={0} max={50} step={5} unit="kN" keyName="P" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
      </div>

      {portalReady && createPortal(
        <svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={supportX} y={0} />
          <motion.g animate={{ x: svgW, y: deflPos - 60 - safeP*0.6 }}>
            <line x1="0" y1="0" x2="0" y2="55" stroke="#ef4444" strokeWidth="8" markerEnd="url(#arrowRed)" filter="url(#ultraGlow)" />
            <text y="-20" textAnchor="middle" fill="#ef4444" className="text-[16px] font-black font-mono">{safeP}kN</text>
          </motion.g>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
