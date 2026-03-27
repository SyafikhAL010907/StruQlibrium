"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBattlefield } from '../../layout';
import { CustomSlider, VisualDefs } from '@/components/battlefield/BattlefieldElements';
import { motion } from 'framer-motion';

export default function MissionH4() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { inputs, handleChange, setCheckFn } = useBattlefield();
  const { P_ecc = 500, e = 5, A_col = 100, Z_col = 200 } = inputs;

  useEffect(() => {
    setCheckFn((i) => i.P_ecc === 500 && i.e === 5 && i.A_col === 100 && i.Z_col === 200);
  }, [setCheckFn]);

  // σ_max = P/A + Pe/Z, σ_min = P/A - Pe/Z
  const sigma_axial = P_ecc / A_col;
  const sigma_bending = (P_ecc * e) / Z_col;
  const sigma_max = sigma_axial + sigma_bending;
  const sigma_min = sigma_axial - sigma_bending;

  // Stress distribution width in SVG
  const scMax = Math.min(Math.abs(sigma_max) * 1.2, 100);
  const scMin = Math.min(Math.abs(sigma_min) * 1.2, 100);

  return (
    <>
      <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
        <div className="absolute top-6 left-4 sm:left-5 w-1 h-12 bg-rose-600 rounded-full group-hover:h-16 transition-all duration-500" />
        <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-black italic pl-6 sm:pl-8">
          "[HARD] Kolom pendek menerima beban eksentrik P=500kN pada e=5cm dari pusat. A=100cm², Z=200cm³. Hitung: σ_max = P/A + Pe/Z. Target: σ_max = 17.5 MPa."
        </p>
      </div>
      <div className="grow min-h-[220px]">
        <CustomSlider label="Beban Aksial (P)" val={P_ecc} min={100} max={1000} step={50} unit="kN" keyName="P_ecc" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Eksentrisitas (e)" val={e} min={0} max={15} step={0.5} unit="cm" keyName="e" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Luas Penampang (A)" val={A_col} min={50} max={200} step={10} unit="cm²" keyName="A_col" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
        <CustomSlider label="Modulus Penampang (Z)" val={Z_col} min={100} max={400} step={20} unit="cm³" keyName="Z_col" colorClass="text-rose-600 dark:text-rose-400" hexColor="#f43f5e" onChange={handleChange} />
      </div>

      {isMounted && typeof document !== 'undefined' && document.getElementById('visualizer-portal') && createPortal(
        <svg viewBox="-160 -30 500 340" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
          <VisualDefs />
          {/* Column cross-section (front view) */}
          <rect x="60" y="40" width="120" height="220" fill="url(#metal_finish)" rx="6" />
          {/* Centroid marker */}
          <line x1="60" y1="150" x2="180" y2="150" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
          <circle cx="120" cy="150" r="4" fill="#94a3b8" />
          {/* Eccentric load arrow */}
          <motion.g 
            initial={{ x: e * 3 }}
            animate={{ x: e * 3 }} transition={{ type: 'spring', stiffness: 60, damping: 15 }}>
            <line x1="120" y1="-30" x2="120" y2="38" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" />
            <polygon points="120,38 113,24 127,24" fill="#f43f5e" />
            <text x="120" y="-36" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="900" fontFamily="monospace">{P_ecc} kN</text>
            {/* Eccentricity label */}
            <line x1="120" y1="10" x2={120 - e * 3} y2="10" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x={120 - e * 1.5} y="5" textAnchor="middle" fill="#f43f5e" fontSize="10" fontFamily="monospace">e={e}</text>
          </motion.g>
          {/* Stress distribution diagram (right side) */}
          <motion.polygon
            points={`185,40 ${185 + scMax},40 ${185 + (sigma_min > 0 ? scMin : -scMin)},260 185,260`}
            fill="rgba(244,63,94,0.15)" stroke="#f43f5e" strokeWidth="2"
            initial={{ points: `185,40 ${185 + scMax},40 ${185 + (sigma_min > 0 ? scMin : -scMin)},260 185,260` }}
            animate={{ points: `185,40 ${185 + scMax},40 ${185 + (sigma_min > 0 ? scMin : -scMin)},260 185,260` }}
            transition={{ type: 'spring', stiffness: 50, damping: 12 }}
          />
          <text x="190" y="36" fill="#f43f5e" fontSize="10" fontWeight="900" fontFamily="monospace">σ_max</text>
          <text x="190" y="275" fill="#60a5fa" fontSize="10" fontWeight="900" fontFamily="monospace">σ_min</text>
          {/* Result */}
          <text x="110" y="290" textAnchor="middle" fill="#f43f5e" fontSize="12" fontWeight="900" fontFamily="monospace">σ_max = {sigma_max.toFixed(2)} kN/cm²</text>
          <text x="110" y="308" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">σ_min = {sigma_min.toFixed(2)} kN/cm²  |  Target: 17.5</text>
        </svg>,
        document.getElementById('visualizer-portal')!
      )}
    </>
  );
}
