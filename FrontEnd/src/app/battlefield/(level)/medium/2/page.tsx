"use client";

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionM2() {
  const { inputs, handleChange, theme, setCheckFn } = useBattlefield();
  const { L = 8, W_veh = 50, veh_x = 4 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.L === 8 && i.W_veh === 50 && i.veh_x === 4);
  }, [setCheckFn]);

  const svgW = 600;
  const vx = (veh_x/L)*svgW;
  const d = `M 0,0 Q ${svgW/2},${W_veh * 1.5} ${svgW},0`;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-full group-hover:w-2 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-300 text-[14px] sm:text-[16px] leading-relaxed font-medium italic pl-6 sm:pl-8">
          "Trak treler <span className="text-emerald-600 font-black">W=50kN</span> melintasi jambatan persekutuan <span className="text-emerald-600 font-black">8m</span>. Simulasi kedudukan kritikal pada <span className="text-emerald-600 font-black">x=4m</span>."
        </p>
      </div>

      <div className="grow min-h-[200px]">
        <CustomSlider label="Lebar Rentang" val={L} min={4} max={16} step={2} unit="m" keyName="L" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Berat Trak" val={W_veh} min={10} max={100} step={10} unit="kN" keyName="W_veh" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
        <CustomSlider label="Kedudukan Trak" val={veh_x} min={0} max={L} step={0.5} unit="m" keyName="veh_x" colorClass={theme.text} hexColor={theme.hex} onChange={handleChange} />
      </div>

      {typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          <motion.path 
            d={d} fill="none" 
            stroke="url(#metal_finish)" 
            strokeWidth="22" 
            strokeLinecap="round" 
            animate={{ d }} 
            filter="url(#ultraGlow)" 
          />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          <motion.g animate={{ x: vx, y: -25 + (W_veh * 0.75) * (1 - Math.abs(vx - svgW/2)/(svgW/2)) }}>
             <rect x="-40" y="-30" width="80" height="25" fill="#f59e0b" rx="4" />
             <rect x="30" y="-25" width="20" height="15" fill="#cbd5e1" rx="2" />
             <circle cx="-25" cy="-5" r="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
             <circle cx="25" cy="-5" r="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
             <text y="-40" textAnchor="middle" fill="#f59e0b" className="text-[16px] font-black font-mono">{W_veh}kN</text>
          </motion.g>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
