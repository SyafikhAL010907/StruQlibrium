"use client";

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionH5() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { Mp = 40, M_load = 120 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.M_load === 120 && i.Mp === 40);
  }, [setCheckFn]);

  const svgW = 600;
  const hingeY = (M_load > (Mp || 40)) ? (M_load - (Mp || 40)) * 1.5 : 0;
  const d = `M 0,0 L ${svgW/2},${hingeY} L ${svgW},0`;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[ULTRA-HARD] Analisis limit ekstrem: Balok jambatan keluli mengalami beban lampau M=120 kNm sedangkan kapasiti hanya Mp=40 kNm. Perhatikan pembentukan sendi plastis yang kritikal!"
        </p>
      </div>

      <div className="grow min-h-[150px]">
        <CustomSlider label="Momen Kerja" val={M_load} min={40} max={120} step={5} unit="kNm" keyName="M_load" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Kapasiti Plastik Mp" val={Mp} min={20} max={100} step={5} unit="kNm" keyName="Mp" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          {M_load > (Mp || 40) && (
             <motion.circle cx={svgW/2} cy={hingeY} r="12" fill="#ef4444" animate={{ cy: hingeY }} filter="url(#ultraGlow)" />
          )}
          <motion.g animate={{ x: svgW/2, y: hingeY - 60 }}>
            <line x1="0" y1="0" x2="0" y2="40" stroke="#f43f5e" strokeWidth="8" markerEnd="url(#arrowRed)" />
            <text y="-20" textAnchor="middle" fill="#f43f5e" className="text-[16px] font-black font-mono">M={M_load}</text>
          </motion.g>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
