"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionM4() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { T = 2, G = 80, L_shaft = 1, r = 25 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.T === 2 && i.G === 80 && i.L_shaft === 1 && i.r === 25);
  }, [setCheckFn]);

  // φ = TL / (G * J), J = π r⁴/2
  // T in kNm → Nmm: T*10⁶, G in GPa → N/mm²: G*10³, L in m → mm: L*10³, r in mm
  const J = Math.PI * Math.pow(r, 4) / 2;
  const phi_rad = (T * 1e6) * (L_shaft * 1e3) / (G * 1e3 * J);
  const phi_deg = phi_rad * (180 / Math.PI);
  const twistAngle = Math.min(phi_deg * 6, 45); // visual exaggeration

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[MEDIUM] Poros baja bulat T=2kNm, G=80GPa, L=1m, r=25mm. Hitung sudut puntir: φ = TL/(GJ), J=πr⁴/2. Atur slider ke nilai target untuk verifikasi."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Momen Puntir (T)" val={T} min={1} max={6} step={0.5} unit="kNm" keyName="T" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Modulus Geser (G)" val={G} min={40} max={120} step={5} unit="GPa" keyName="G" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Panjang Poros (L)" val={L_shaft} min={0.5} max={3} step={0.5} unit="m" keyName="L_shaft" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Jari-jari (r)" val={r} min={10} max={50} step={5} unit="mm" keyName="r" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-60 -120 520 280" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Shaft body */}
          <rect x="0" y="-30" width="400" height="60" fill="url(#metal_finish)" rx="30" />
          {/* Left face ellipse */}
          <ellipse cx="0" cy="0" rx="12" ry="30" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
          {/* Right face ellipse (twisted) */}
          <motion.g animate={{ rotate: twistAngle }} style={{ transformOrigin: '400px 0px' }} transition={{ type: 'spring', stiffness: 50, damping: 12 }}>
            <ellipse cx="400" cy="0" rx="12" ry="30" fill="#64748b" stroke="#f43f5e" strokeWidth="2" />
            {/* Cross marks to show rotation */}
            <line x1="400" y1="-26" x2="400" y2="26" stroke="#f43f5e" strokeWidth="3" opacity="0.7" />
            <line x1="376" y1="0" x2="424" y2="0" stroke="#f43f5e" strokeWidth="3" opacity="0.7" />
          </motion.g>
          {/* Torque arrows — left (counter-clockwise) */}
          <path d="M -25,-25 A 30,30 0 1,1 -25,25" fill="none" stroke="#f43f5e" strokeWidth="3" />
          <polygon points="-25,25 -15,15 -35,15" fill="#f43f5e" />
          <text x="-45" y="-38" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="900" fontFamily="monospace">T={T}kNm</text>
          {/* Torque arrow — right (clockwise) */}
          <path d="M 425,-25 A 30,30 0 1,0 425,25" fill="none" stroke="#60a5fa" strokeWidth="3" />
          <polygon points="425,25 415,15 435,15" fill="#60a5fa" />
          {/* Result */}
          <text x="200" y="80" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="900" fontFamily="monospace">φ = {phi_deg.toFixed(3)}°   ({phi_rad.toFixed(5)} rad)</text>
          <text x="200" y="102" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">J = {(J / 1000).toFixed(0)} ×10³ mm⁴</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
