"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, SupportSystem, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionH2() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { L = 12, W_veh = 80, veh_x = 6 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.L === 12 && i.W_veh === 80 && i.veh_x === 6);
  }, [setCheckFn]);

  const safeX = Math.min(veh_x, L);
  const R_A = W_veh * (L - safeX) / L;
  const R_B = W_veh * safeX / L;
  const M_x = R_A * safeX; // Moment at truck position

  const svgW = 500;
  const vx = (safeX / L) * svgW;
  const deflection = Math.min(W_veh * 0.5, 60);
  const d = `M 0,0 Q ${svgW / 2},${deflection} ${svgW},0`;

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[HARD] Truk W=80kN melintasi jembatan L=12m. Analisis pengaruh posisi x terhadap momen maksimal (Influence Line). Momen max terjadi saat x=L/2=6m."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Bentang Jembatan (L)" val={L} min={8} max={20} step={1} unit="m" keyName="L" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Berat Kendaraan (W)" val={W_veh} min={20} max={150} step={10} unit="kN" keyName="W_veh" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Posisi Kendaraan (x)" val={safeX} min={0} max={L} step={0.5} unit="m" keyName="veh_x" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-50 -120 600 330" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Bridge beam with deflection */}
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="20" strokeLinecap="round"
            initial={{ d }}
            animate={{ d }} transition={{ type: 'spring', stiffness: 40, damping: 12 }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          {/* Truck */}
          <motion.g
            initial={{ x: vx, y: -22 + deflection * (1 - Math.abs(vx - svgW / 2) / (svgW / 2)) * 0.5 }}
            animate={{ x: vx, y: -22 + deflection * (1 - Math.abs(vx - svgW / 2) / (svgW / 2)) * 0.5 }}
            transition={{ type: 'spring', stiffness: 40, damping: 12 }}
          >
            <rect x="-44" y="-28" width="88" height="24" rx="5" fill="#f43f5e" />
            <rect x="32" y="-24" width="22" height="14" rx="3" fill="#cbd5e1" />
            <rect x="35" y="-22" width="16" height="8" rx="1" fill="#1e293b" opacity="0.5" />
            <circle cx="-28" cy="-4" r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="28" cy="-4" r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
            <text y="-40" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">{W_veh}kN</text>
          </motion.g>
          {/* Influence line — parabolic moment diagram */}
          <path d={`M 0,100 Q ${svgW / 2},${100 + Math.min(W_veh * 0.8, 80)} ${svgW},100`}
            fill="rgba(244,63,94,0.1)" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,4" />
          <text x={svgW / 2} y={100 + Math.min(W_veh * 0.8, 80) + 16} textAnchor="middle" fill="#f43f5e" fontSize="11" fontFamily="monospace">Influence Line — Mx</text>
          {/* Live moment */}
          <motion.line x1={vx} y1="30" x2={vx} y2="96" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,3"
            initial={{ x1: vx, x2: vx }}
            animate={{ x1: vx, x2: vx }} transition={{ type: 'spring', stiffness: 40, damping: 12 }} />
          {/* Reactions & moment */}
          <text x="0" y="190" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="900" fontFamily="monospace">RA={R_A.toFixed(1)}kN</text>
          <text x={svgW} y="190" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="900" fontFamily="monospace">RB={R_B.toFixed(1)}kN</text>
          <text x={svgW / 2} y="190" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="900" fontFamily="monospace">Mx={M_x.toFixed(1)}kNm</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
