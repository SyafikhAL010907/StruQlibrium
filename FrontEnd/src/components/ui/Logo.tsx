import React from 'react';

interface LogoProps {
  size?: string;
  className?: string;
}

export default function Logo({ size = 'text-2xl', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center font-black uppercase tracking-tighter leading-none ${size} ${className}`}>
      {/* Bagian STRU: Hitam di Light, Putih di Dark */}
      <span className="text-slate-950 dark:text-white transition-colors duration-300">
        STRU
      </span>
      
      {/* Bagian Q: Gradasi Signature (Wajib text-transparent!) */}
      <span className="bg-linear-to-br from-[#e78b7b] via-[#8b4ec7] to-[#395ef3] text-transparent! bg-clip-text text-[1.15em] mx-0.5 transform transition-transform hover:scale-110 duration-300">
        Q
      </span>
      
      {/* Bagian LIBRIUM: Biru Elektrik */}
      <span className="text-blue-500 transition-colors duration-300">
        LIBRIUM
      </span>
    </div>
  );
}
