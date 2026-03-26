"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionM1() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { L = 5, P_buckle = 100 } = inputs;
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(!!document.getElementById('visualizer-portal'));
    setCheckFn((i) => (i.L || 0) === 5 && (i.P_buckle || 0) === 100);
  }, [setCheckFn]);

  const safeP = P_buckle || 0;
  const wallH = 250;
  const bow = (safeP / 200) * 80;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 rounded-full group-hover:w-2 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-300 text-[14px] sm:text-[16px] leading-relaxed font-medium italic pl-6 sm:pl-8">
          "Cerucuk keluli bangunan tinggi: Tentukan beban kritikal tekuk <span className="text-rose-500 font-black">P=100 kN</span> pada kedalaman <span className="text-rose-500 font-black">5m</span>."
        </p>
      </div>

      <div className="grow min-h-[150px]">
        <CustomSlider label="Panjang Tiang" val={L} min={2} max={8} step={1} unit="m" keyName="L" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Beban Paksi" val={P_buckle} min={0} max={200} step={10} unit="kN" keyName="P_buckle" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
      </div>

      {portalReady && createPortal(
        <svg viewBox="-200 -50 400 400" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible">
          <VisualDefs />
          <SupportSystem type="pin" x={0} y={wallH} />
          <motion.path 
            d={`M 0,0 Q ${bow},${wallH/2} 0,${wallH}`} 
            fill="none" 
            stroke="url(#metal_finish)" 
            strokeWidth="22" 
            strokeLinecap="round" 
            animate={{ d: `M 0,0 Q ${bow},${wallH/2} 0,${wallH}` }} 
            filter="url(#ultraGlow)"
          />
          <motion.g animate={{ y: -50 }}>
            <line x1="0" y1="-20" x2="0" y2="35" stroke="#ef4444" strokeWidth="8" markerEnd="url(#arrowRed)" filter="url(#ultraGlow)" />
            <text x="0" y="-35" textAnchor="middle" fill="#ef4444" className="text-[16px] font-black font-mono">{safeP}kN</text>
          </motion.g>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
