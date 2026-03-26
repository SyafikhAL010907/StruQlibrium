"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function Mission5() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { L = 6, w = 5, P = 20 } = inputs;
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(!!document.getElementById('visualizer-portal'));
    setCheckFn((i) => (i.L || 0) === 6 && (i.w || 0) === 5 && (i.P || 0) === 20);
  }, [setCheckFn]);

  const safeL = L || 6;
  const safeW = w || 0;
  const safeP = P || 0;

  const svgW = 600;
  const ax = (svgW / 2);
  const getElasticPath = (amp = 1) => {
    let d = `M 0,0 `;
    for(let i=1; i<=30; i++) {
      let x = (i/30) * svgW;
      let y = amp * Math.sin(Math.PI * (i/30));
      d += `L ${x},${y} `;
    }
    return d;
  };
  const d = getElasticPath((safeP*0.5) + (safeW*1.5));
  const arrows = Array.from({ length: 11 }, (_, i) => i * (svgW/10));

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-indigo-500 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-bold italic pl-6 sm:pl-8">
          "Boom kren pelabuhan 6m memikul beban angin w=5 kN/m dan kontena P=20kN di tengah."
        </p>
      </div>

      <div className="grow min-h-[220px]">
        <CustomSlider label="Panjang Balok" val={L} min={2} max={10} step={1} unit="m" keyName="L" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Beban Agihan" val={w} min={0} max={10} step={1} unit="kN/m" keyName="w" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Beban Titik" val={P} min={0} max={40} step={5} unit="kN" keyName="P" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
      </div>

      {portalReady && createPortal(
        <svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          <motion.g animate={{ y: -40 - safeW }}>
            <rect x="0" y="25" width={svgW} height="10" fill="#0ea5e9" opacity="0.3" rx="4" />
            {arrows.map((arr_x, i) => (
              <line key={i} x1={arr_x} y1="0" x2={arr_x} y2="35" stroke="#0ea5e9" strokeWidth="4" markerEnd="url(#arrowRed)" />
            ))}
            <text x={svgW/4} y="-10" textAnchor="middle" fill="#0ea5e9" className="text-[16px] font-black font-mono">{safeW} kN/m</text>
          </motion.g>
          <motion.g animate={{ x: ax, y: -60 - safeP*0.5 - safeW }}>
            <line x1="0" y1="0" x2="0" y2="55" stroke="#ef4444" strokeWidth="8" markerEnd="url(#arrowRed)" filter="url(#ultraGlow)" />
            <text y="-20" textAnchor="middle" fill="#ef4444" className="text-[16px] font-black font-mono">{safeP}kN</text>
          </motion.g>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
