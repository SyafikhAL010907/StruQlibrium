"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Trophy, Activity, Zap, HardHat, Drill, Ruler, TowerControl as Tower, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { useUji } from '../context/UjiContext';
import { MODULES } from '../data/missions';
import Link from 'next/link';

export const CustomSlider = ({ label, val, min, max, step, unit, keyName, colorClass, hexColor, onChange }: any) => (
  <div className="mb-4 sm:mb-6 group relative">
    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
      <div className="flex items-center gap-1.5 sm:gap-2">
         <span className={`w-1 h-3 rounded-full`} style={{ backgroundColor: hexColor }} />
         <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <div className="bg-slate-100 dark:bg-slate-900/90 px-2 sm:px-3 py-0.5 sm:py-1 rounded border border-slate-200 dark:border-blue-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <span className={`text-[10px] sm:text-[12px] font-mono font-bold ${colorClass}`}>{val}{unit}</span>
      </div>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={val} 
      onChange={(e) => onChange(keyName, Number(e.target.value))}
      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-crosshair hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
      style={{ accentColor: hexColor }}
    />
  </div>
);

const SupportSystem = ({ type, x, y }: { type: string, x: number, y: number }) => (
  <g transform={`translate(${x},${y})`}>
    <defs>
      <pattern id="concrete_hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#475569" strokeWidth="2" />
      </pattern>
    </defs>
    <rect x="-35" y="20" width="70" height="15" fill="url(#concrete_hatch)" stroke="#475569" strokeWidth="1.5" rx="2" />
    <line x1="-35" y1="20" x2="35" y2="20" stroke="#94a3b8" strokeWidth="2" />
    {type === 'pin' ? (
      <g>
        <path d="M -20,20 L 0,0 L 20,20 Z" fill="#1e293b" className="dark:fill-[#1e293b] fill-slate-300" stroke="#cbd5e1" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="0" cy="0" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        <circle cx="-12" cy="16" r="2" fill="#94a3b8" />
        <circle cx="12" cy="16" r="2" fill="#94a3b8" />
      </g>
    ) : (
      <g>
        <circle cx="-12" cy="14" r="6" fill="#1e293b" className="dark:fill-[#1e293b] fill-slate-300" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="12" cy="14" r="6" fill="#1e293b" className="dark:fill-[#1e293b] fill-slate-300" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M -18,2 L 18,2" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
        <line x1="-25" y1="20" x2="25" y2="20" stroke="#cbd5e1" strokeWidth="3" />
      </g>
    )}
  </g>
);

export function MissionController({ missionIndex }: { missionIndex: number }) {
  const { missionInputs, setMissionInput, missionStatus, setMissionStatus, setIsFinished } = useUji();
  const [showAnswer, setShowAnswer] = React.useState(false);
  
  const activeMod = useMemo(() => MODULES[missionIndex] || MODULES[0], [missionIndex]);
  const inputs = missionInputs[missionIndex];
  const isSuccess = missionStatus[missionIndex];
  
  const getTheme = (color: string) => {
    const themes: Record<string, any> = {
      violet: { text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500', light: 'bg-violet-100 dark:bg-violet-500/20' },
      cyan: { text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-500', light: 'bg-cyan-100 dark:bg-cyan-500/20' },
      emerald: { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500', light: 'bg-emerald-100 dark:bg-emerald-500/20' },
      rose: { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500', light: 'bg-rose-100 dark:bg-rose-500/20' },
      amber: { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500', light: 'bg-amber-100 dark:bg-amber-500/20' },
      blue: { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500', light: 'bg-blue-100 dark:bg-blue-500/20' },
      indigo: { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500', light: 'bg-indigo-100 dark:bg-indigo-500/20' }
    };
    return themes[color] || themes.blue;
  };
  const activeTheme = getTheme(activeMod.color);

  const handleChange = (key: string, value: number) => {
    setMissionInput(missionIndex, key, value);
    if (isSuccess) setMissionStatus(missionIndex, false);
  };

  const renderControls = () => {
    const { L, P, a, oh, w, w_max, P_buckle, W_veh, veh_x, Sx, Sy, Txy, H_wall, gamma, Mp, ang_rot, M_load } = inputs;
    const s = (lbl: string, val: number, mn: number, mx: number, st: number, un: string, k: string, cl: string, hx: string) => 
      <CustomSlider key={k} label={lbl} val={val} min={mn} max={mx} step={st} unit={un} keyName={k} colorClass={`text-${cl}-600 dark:text-${cl}-400`} hexColor={hx} onChange={handleChange} />;
      
    switch (activeMod.type) {
      case 'point': return <React.Fragment>{s('Panjang Rentang',L,2,10,1,'m','L','blue','#60a5fa')}{s('Beban Titik',P,0,50,5,'kN','P','rose','#fb7185')}{s('Kedudukan',a,0,L,0.5,'m','a','violet','#a78bfa')}</React.Fragment>;
      case 'overhang': return <React.Fragment>{s('Panjang Utama',L,4,12,1,'m','L','emerald','#34d399')}{s('Anjungan (oh)',oh,1,L-1,0.5,'m','oh','cyan','#22d3ee')}{s('Beban Hujung',P,0,50,5,'kN','P','rose','#fb7185')}</React.Fragment>;
      case 'udl': return <React.Fragment>{s('Panjang Rentang',L,2,10,1,'m','L','cyan','#22d3ee')}{s('Beban Agihan (w)',w,0,20,1,'kN/m','w','rose','#fb7185')}</React.Fragment>;
      case 'triangular': return <React.Fragment>{s('Ketinggian Dinding',L,2,10,1,'m','L','rose','#fb7185')}{s('Tekanan Maks',w_max,0,30,2,'kN/m','w_max','cyan','#22d3ee')}</React.Fragment>;
      case 'combined': return <React.Fragment>{s('Panjang Balok',L,2,10,1,'m','L','blue','#60a5fa')}{s('Beban Agihan',w,0,10,1,'kN/m','w','cyan','#22d3ee')}{s('Beban Titik',P,0,40,5,'kN','P','rose','#fb7185')}</React.Fragment>;
      case 'buckling': return <React.Fragment>{s('Panjang Tiang',L,2,8,1,'m','L','blue','#60a5fa')}{s('Beban Paksi',P_buckle,0,200,10,'kN','P_buckle','rose','#fb7185')}</React.Fragment>;
      case 'moving-load': return <React.Fragment>{s('Lebar Rentang',L,4,16,2,'m','L','blue','#60a5fa')}{s('Berat Trak',W_veh,10,100,10,'kN','W_veh','rose','#fb7185')}{s('Kedudukan Trak',veh_x,0,L,0.5,'m','veh_x','emerald','#34d399')}</React.Fragment>;
      case 'mohr': return <React.Fragment>{s('Stress Paksi X',Sx,-100,100,10,'MPa','Sx','rose','#fb7185')}{s('Stress Paksi Y',Sy,-100,100,10,'MPa','Sy','blue','#60a5fa')}{s('Shear Stress',Txy,0,100,10,'MPa','Txy','amber','#fbbf24')}</React.Fragment>;
      case 'retaining': return <React.Fragment>{s('Tinggi Dinding',H_wall,2,10,1,'m','H_wall','cyan','#22d3ee')}{s('Densiti Tanah',gamma,10,22,1,'kN/m³','gamma','amber','#fbbf24')}</React.Fragment>;
      case 'plastic': return <React.Fragment>{s('Momen Kerja',M_load,0,120,10,'kNm','M_load','rose','#fb7185')}{s('Kapasiti Plastik Mp',Mp,40,100,10,'kNm','Mp','fuchsia','#e879f9')}</React.Fragment>;
      case 'stress-rot': return <React.Fragment>{s('Sudut Putaran',ang_rot,0,90,5,'°','ang_rot','violet','#a78bfa')}</React.Fragment>;
      default: return <div className="text-slate-500 italic text-[10px] text-center border border-dashed border-slate-300 dark:border-slate-800 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/40">Real-time Parameters Ready</div>;
    }
  };

  const renderVisualizer = () => {
    const { L, P, a, oh, w, w_max, P_buckle, W_veh, veh_x, Sx, Sy, Txy, H_wall, gamma, Mp, M_load, ang_rot } = inputs;
    const svgW = 600;

    const VisualDefs = () => (
      <defs>
        <filter id="ultraGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
        <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
        <linearGradient id="metal_finish" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#475569" /><stop offset="30%" stopColor="#94a3b8" /><stop offset="50%" stopColor="#f8fafc" /><stop offset="70%" stopColor="#94a3b8" /><stop offset="100%" stopColor="#1e293b" /></linearGradient>
      </defs>
    );

    const getElasticPath = (amp = 1) => {
      let d = `M 0,0 `;
      for(let i=1; i<=30; i++) {
        let x = (i/30) * svgW;
        let y = amp * Math.sin(Math.PI * (i/30));
        d += `L ${x},${y} `;
      }
      return d;
    };

    switch (activeMod.type) {
      case 'point': {
        const ax = (a/L)*svgW;
        const d = getElasticPath(P*0.9);
        return (<svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible"><VisualDefs/>
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          <motion.g animate={{ x: ax, y: -60 - P*0.6 }}>
            <line x1="0" y1="0" x2="0" y2="55" stroke="#ef4444" strokeWidth="8" markerEnd="url(#arrowRed)" filter="url(#ultraGlow)" />
            <text y="-20" textAnchor="middle" fill="#ef4444" className="text-[16px] font-black font-mono">{P}kN</text>
          </motion.g>
        </svg>);
      }
      case 'overhang': {
        const L_main = L - oh; 
        const supportX = (L_main / L) * svgW;
        const deflPos = P * 0.8;
        let d = `M 0,0 Q ${supportX/2},${-deflPos*0.2} ${supportX},0 Q ${supportX + ((svgW - supportX)/2)},${deflPos/2} ${svgW},${deflPos}`;
        
        return (<svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible"><VisualDefs/>
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={supportX} y={0} />
          <motion.g animate={{ x: svgW, y: deflPos - 60 - P*0.6 }}>
            <line x1="0" y1="0" x2="0" y2="55" stroke="#ef4444" strokeWidth="8" markerEnd="url(#arrowRed)" filter="url(#ultraGlow)" />
            <text y="-20" textAnchor="middle" fill="#ef4444" className="text-[16px] font-black font-mono">{P}kN</text>
          </motion.g>
        </svg>);
      }
      case 'udl': {
        const d = getElasticPath(w * 3);
        const arrows = Array.from({ length: 11 }, (_, i) => i * (svgW/10));
        return (<svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible"><VisualDefs/>
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          <motion.g animate={{ y: -40 - w * 1.5 }}>
            <rect x="0" y="25" width={svgW} height="10" fill="#0ea5e9" opacity="0.3" rx="4" />
            {arrows.map((ax, i) => (
              <line key={i} x1={ax} y1="0" x2={ax} y2="35" stroke="#0ea5e9" strokeWidth="4" markerEnd="url(#arrowRed)" />
            ))}
            <text x={svgW/2} y="-10" textAnchor="middle" fill="#0ea5e9" className="text-[16px] font-black font-mono">w = {w} kN/m</text>
          </motion.g>
        </svg>);
      }
      case 'combined': {
        const ax = (svgW / 2);
        const d = getElasticPath((P*0.5) + (w*1.5));
        const arrows = Array.from({ length: 11 }, (_, i) => i * (svgW/10));
        return (<svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible"><VisualDefs/>
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          <motion.g animate={{ y: -40 - w }}>
            <rect x="0" y="25" width={svgW} height="10" fill="#0ea5e9" opacity="0.3" rx="4" />
            {arrows.map((arr_x, i) => (
              <line key={i} x1={arr_x} y1="0" x2={arr_x} y2="35" stroke="#0ea5e9" strokeWidth="4" markerEnd="url(#arrowRed)" />
            ))}
            <text x={svgW/4} y="-10" textAnchor="middle" fill="#0ea5e9" className="text-[16px] font-black font-mono">{w} kN/m</text>
          </motion.g>
          <motion.g animate={{ x: ax, y: -60 - P*0.5 - w }}>
            <line x1="0" y1="0" x2="0" y2="55" stroke="#ef4444" strokeWidth="8" markerEnd="url(#arrowRed)" filter="url(#ultraGlow)" />
            <text y="-20" textAnchor="middle" fill="#ef4444" className="text-[16px] font-black font-mono">{P}kN</text>
          </motion.g>
        </svg>);
      }
      case 'triangular': {
        const wallH = 250; 
        const pressMax = w_max * 10;
        return (<svg viewBox="-150 -50 400 350" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible"><VisualDefs/>
          <rect x="0" y="0" width="30" height={wallH} fill="url(#metal_finish)" rx="4" />
          <pattern id="soil_hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#475569" strokeWidth="2" />
          </pattern>
          <rect x="30" y="0" width="100" height={wallH} fill="url(#soil_hatch)" />
          <motion.path d={`M -${pressMax},${wallH} L 0,0 L 0,${wallH} Z`} fill="#3b82f6" opacity="0.2" animate={{ d: `M -${pressMax},${wallH} L 0,0 L 0,${wallH} Z` }} />
          {Array.from({ length: 7 }, (_, i) => {
             const yPos = (wallH/6)*i;
             const pressW = (pressMax/6)*i;
             if (pressW === 0) return null;
             return <motion.line key={i} x1={-pressW} y1={yPos} x2={0} y2={yPos} stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrowRed)" animate={{ x1: -pressW, y1: yPos }} />
          })}
          <text x={-pressMax - 20} y={wallH} textAnchor="end" fill="#3b82f6" className="text-[16px] font-black font-mono">{w_max} kN/m</text>
        </svg>);
      }
      case 'moving-load': {
        const vx = (veh_x/L)*svgW;
        const d = `M 0,0 Q ${svgW/2},${W_veh * 1.5} ${svgW},0`;
        return (<svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible"><VisualDefs/>
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          <motion.g animate={{ x: vx, y: -25 + (W_veh * 0.75) * (1 - Math.abs(vx - svgW/2)/(svgW/2)) }}>
             <rect x="-40" y="-30" width="80" height="25" fill="#f59e0b" rx="4" />
             <rect x="30" y="-25" width="20" height="15" fill="#cbd5e1" rx="2" />
             <circle cx="-25" cy="-5" r="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
             <circle cx="25" cy="-5" r="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
             <text y="-40" textAnchor="middle" fill="#f59e0b" className="text-[16px] font-black font-mono">{W_veh}kN</text>
          </motion.g>
        </svg>);
      }
      case 'buckling': {
        const wallH = 250;
        const bow = (P_buckle / 200) * 80;
        return (<svg viewBox="-150 -50 300 400" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible"><VisualDefs/>
          <SupportSystem type="pin" x={0} y={wallH} />
          <motion.path d={`M 0,0 Q ${bow},${wallH/2} 0,${wallH}`} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d: `M 0,0 Q ${bow},${wallH/2} 0,${wallH}` }} />
          <motion.g animate={{ y: -50 }}>
            <line x1="0" y1="-20" x2="0" y2="35" stroke="#ef4444" strokeWidth="8" markerEnd="url(#arrowRed)" />
            <text x="0" y="-35" textAnchor="middle" fill="#ef4444" className="text-[16px] font-black font-mono">{P_buckle}kN</text>
          </motion.g>
        </svg>);
      }
      case 'retaining': {
        const wallH = H_wall * 40;
        return (<svg viewBox="-100 -50 400 400" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible"><VisualDefs/>
          <rect x="0" y="0" width="20" height={wallH} fill="url(#metal_finish)" rx="4" />
          <pattern id="soil_layer" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#fbbf24" strokeWidth="4" opacity="0.3" />
          </pattern>
          <motion.rect x="20" y="0" width="200" height={wallH} fill="url(#soil_layer)" animate={{ height: wallH }} />
          <text x="120" y={wallH/2} textAnchor="middle" fill="#d97706" className="text-[16px] font-black font-mono">γ = {gamma}</text>
        </svg>);
      }
      case 'plastic': {
        const hingeY = (M_load > Mp) ? (M_load - Mp) * 1.5 : 0;
        const d = `M 0,0 L ${svgW/2},${hingeY} L ${svgW},0`;
        return (<svg viewBox="-50 -150 700 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible"><VisualDefs/>
          <motion.path d={d} fill="none" stroke="url(#metal_finish)" strokeWidth="22" strokeLinecap="round" animate={{ d }} />
          <SupportSystem type="pin" x={0} y={0} />
          <SupportSystem type="roller" x={svgW} y={0} />
          {M_load > Mp && (
             <motion.circle cx={svgW/2} cy={hingeY} r="12" fill="#ef4444" animate={{ cy: hingeY }} filter="url(#ultraGlow)" />
          )}
          <motion.g animate={{ x: svgW/2, y: hingeY - 60 }}>
            <line x1="0" y1="0" x2="0" y2="40" stroke="#f43f5e" strokeWidth="8" markerEnd="url(#arrowRed)" />
            <text y="-20" textAnchor="middle" fill="#f43f5e" className="text-[16px] font-black font-mono">M={M_load}</text>
          </motion.g>
        </svg>);
      }
      case 'mohr': {
        const C = (Sx+Sy)/2;
        const R = Math.sqrt(((Sx-Sy)/2)**2 + Txy**2);
        return (<svg viewBox="-150 -150 300 300" preserveAspectRatio="xMidYMid meet" className="h-full mx-auto overflow-visible"><VisualDefs/>
          <g opacity="0.3" className="dark:opacity-10"><line x1="-150" y1="0" x2="150" y2="0" stroke="#94a3b8"/><line x1="0" y1="-150" x2="0" y2="150" stroke="#94a3b8"/></g>
          <motion.circle cx={C} cy="0" r={R} fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="6" animate={{ cx: C, r: R }} filter="url(#ultraGlow)" />
          <motion.line x1={Sx} y1={-Txy} x2={Sy} y2={Txy} stroke="#f43f5e" strokeWidth="4" strokeDasharray="10,5" animate={{ x1: Sx, y1: -Txy, x2: Sy, y2: Txy }} />
          <circle cx={Sx} cy={-Txy} r={8} fill="#fb7185" stroke="white" strokeWidth="2" />
          <circle cx={Sy} cy={Txy} r={8} fill="#60a5fa" stroke="white" strokeWidth="2" />
        </svg>);
      }
      default: return (<div className="flex flex-col items-center justify-center gap-6 text-slate-400 dark:text-slate-700 animate-pulse">
        <Tower className="w-16 h-16 opacity-20 dark:opacity-10" />
        <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-[1em]">Interaction Sandbox</span>
      </div>);
    }
  };

  const checkAns = () => {
    const valid = activeMod.checkFn(inputs);
    setMissionStatus(missionIndex, valid);
    if (valid) setShowAnswer(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-stretch mt-6">
       {/* ASIDE (Panel Kontrol) */}
       <aside className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 h-full order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div key={missionIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: 'spring', damping: 28 }}
              className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/5 p-6 sm:p-10 rounded-3xl sm:rounded-[3rem] shadow-xl backdrop-blur-2xl relative overflow-hidden flex flex-col h-full"
            >
               <div className="flex justify-between items-start mb-6 sm:mb-12 relative z-10">
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className={`text-[10px] font-black ${activeTheme.text} uppercase tracking-[0.4em]`}>Briefing</h4>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tighter uppercase leading-[1.1]">{activeMod.name}</h2>
                  </div>
                  <div className={`p-3 sm:p-5 rounded-2xl sm:rounded-3xl ${activeTheme.light} ${activeTheme.text} shadow-inner ring-1 ring-slate-200 dark:ring-white/10`}>
                    {activeMod.icon}
                  </div>
               </div>

               <div className="p-5 sm:p-8 bg-slate-50 dark:bg-slate-950/90 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 sm:mb-10 shadow-inner relative group">
                  <div className={`absolute top-6 left-4 sm:left-5 w-1 h-12 bg-blue-500 rounded-full group-hover:h-16 transition-all duration-500`} />
                  <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-[15px] leading-relaxed font-bold italic pl-6 sm:pl-8">"{activeMod.question}"</p>
               </div>

               {/* Ensure sliders have enough height and look right on mobile */}
               <div className="grow min-h-[150px]">{renderControls()}</div>

               <div className="mt-8 space-y-3 sm:space-y-4 relative z-10 w-full">
                  <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={checkAns} 
                    className={`w-full py-4 sm:py-5 rounded-[1.2rem] sm:rounded-3xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[12px] transition-all ${activeTheme.bg} text-white shadow-lg border-t border-white/30 truncate px-2`}
                  >
                    Validasi Parameter
                  </motion.button>
                  <button onClick={() => setShowAnswer(!showAnswer)} className="w-full py-3 sm:py-4 rounded-xl font-black uppercase tracking-widest text-[9px] bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 sm:gap-3 border border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white transition-all">
                    <BookOpen size={14} /> {showAnswer ? 'TUTUP TARGET' : 'LIHAT TARGET DATA'}
                  </button>

                  {/* NAVIGATION BUTTONS */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-white/5">
                    {missionIndex > 0 ? (
                      <Link href={`/UjiKompetensi/soal/${missionIndex}`} className="flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white transition-all">
                        <ArrowLeft size={14} /> SEBELUMNYA
                      </Link>
                    ) : (
                      <div className="flex-1 opacity-50 cursor-not-allowed py-3 rounded-xl font-black uppercase tracking-widest text-[9px] bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5">
                        <ArrowLeft size={14} /> SEBELUMNYA
                      </div>
                    )}
                    {missionIndex < 39 ? (
                      <Link href={`/UjiKompetensi/soal/${missionIndex + 2}`} className="flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5 hover:text-slate-800 dark:hover:text-white transition-all">
                        SELANJUTNYA <ArrowRight size={14} />
                      </Link>
                    ) : (
                       <div className="flex-1 opacity-50 cursor-not-allowed py-3 rounded-xl font-black uppercase tracking-widest text-[9px] bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5">
                        SELANJUTNYA <ArrowRight size={14} />
                      </div>
                    )}
                  </div>
               </div>

               <AnimatePresence>
                 {isSuccess && (
                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className={`mt-4 sm:mt-6 p-4 sm:p-5 rounded-[1.2rem] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-black uppercase text-[9px] sm:text-[10px] bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 w-full`}>
                     <div className="flex items-center gap-2 sm:gap-3">
                       <CheckCircle size={18}/> Parameter Valid! Lanjut!
                     </div>
                     {missionIndex < 39 ? (
                       <Link href={`/UjiKompetensi/soal/${missionIndex + 2}`} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto text-center justify-center shadow-lg">
                         Soal Berikutnya <ArrowRight size={14} />
                       </Link>
                     ) : (
                       <button onClick={() => setIsFinished(true)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto text-center justify-center shadow-lg">
                         Selesaikan Ujian <CheckCircle size={14} />
                       </button>
                     )}
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>
          </AnimatePresence>
       </aside>

       {/* MAIN (Sandbox Simulasi) */}
       <main className="lg:col-span-8 h-full flex flex-col order-1 lg:order-2">
          <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-4 sm:p-10 lg:p-12 rounded-4xl sm:rounded-[4rem] shadow-xl backdrop-blur-3xl flex flex-col h-full min-h-[350px] sm:min-h-[500px] lg:min-h-[700px] relative ring-1 ring-slate-100 dark:ring-white/10">
             <div className="flex items-center justify-between mb-6 sm:mb-12 opacity-50 dark:opacity-30">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Ruler size={14} className="text-blue-500 dark:text-blue-400" />
                  <span className="text-[9px] sm:text-[12px] font-black uppercase tracking-[0.3em] sm:tracking-[1em] text-slate-800 dark:text-white">Interactive Sandbox</span>
                </div>
                <div className="flex gap-3 sm:gap-4 text-slate-600 dark:text-slate-400">
                  <Drill size={14} />
                  <HardHat size={14} />
                </div>
             </div>

             <div className="grow bg-slate-50 dark:bg-[#000000]/70 rounded-3xl sm:rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-inner relative overflow-hidden flex items-center justify-center p-4 sm:p-10 lg:p-16">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none dark:hidden" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-20 w-full h-full flex items-center justify-center">
                  {renderVisualizer()}
                </div>
             </div>

             <footer className="mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-slate-100 dark:bg-slate-950/80 p-4 sm:p-8 rounded-3xl sm:rounded-4xl border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-md">
                   <div className="space-y-1 sm:space-y-2">
                     <h5 className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-600 uppercase font-black tracking-widest">Logic Core</h5>
                     <p className="text-xs sm:text-lg font-black text-slate-800 dark:text-white tracking-tighter italic">Structural v4.2</p>
                   </div>
                   <Activity className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                </div>
                <div className="hidden sm:flex bg-slate-100 dark:bg-slate-950/80 p-5 sm:p-8 rounded-3xl sm:rounded-4xl border border-slate-200 dark:border-white/5 items-center justify-between shadow-md">
                   <div className="space-y-1 sm:space-y-2">
                     <h5 className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-600 uppercase font-black tracking-widest">Status</h5>
                     <p className="text-sm sm:text-lg font-black text-emerald-600 dark:text-emerald-500 tracking-tighter">Certified Stable</p>
                   </div>
                   <Zap className="text-emerald-500 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
             </footer>
          </div>
       </main>
    </div>
  );
}
