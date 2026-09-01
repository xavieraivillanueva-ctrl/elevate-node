import React from 'react';

export const ElevateLogo: React.FC<{ className?: string; variant?: 'dark' | 'light' | 'icon-only' }> = ({ 
  className = "h-8", 
  variant = 'dark' 
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon: Upward trend line with circular nodes */}
      <svg viewBox="0 0 100 70" className="h-8 w-auto shrink-0 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]" fill="none">
        {/* Navy/Cyan Node Line */}
        <path 
          d="M 12 52 C 28 50, 40 38, 54 28 C 66 18, 78 12, 88 12" 
          stroke="#00F0FF" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        {/* Gold Accent Line */}
        <path 
          d="M 16 62 C 34 60, 48 50, 60 42 C 72 34, 82 28, 86 28" 
          stroke="#E5A93C" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        {/* Nodes */}
        <circle cx="14" cy="52" r="6" fill="#0A1128" stroke="#00F0FF" strokeWidth="4" />
        <circle cx="54" cy="28" r="5" fill="#0A1128" stroke="#00F0FF" strokeWidth="3" />
        <circle cx="88" cy="12" r="7" fill="#E5A93C" stroke="#FFFFFF" strokeWidth="2.5" />
      </svg>

      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-sm uppercase ${variant === 'light' ? 'text-slate-900' : 'text-white'}`}>
            ELEVATE NODE
          </span>
          <span className="text-[8px] font-bold tracking-[0.2em] text-cyan-400 uppercase -mt-0.5">
            PLATAFORMA MULTIMODAL
          </span>
        </div>
      )}
    </div>
  );
};

export const DaryLashesLogo: React.FC<{ className?: string }> = ({ className = "h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center p-2 select-none ${className}`}>
      {/* Neon Glow Box */}
      <div className="text-center">
        <div className="inline-block px-4 py-1 rounded-xl bg-slate-950/80 border-2 border-pink-500/80 shadow-[0_0_20px_rgba(236,72,153,0.6)]">
          <span className="font-serif italic font-extrabold text-lg sm:text-xl tracking-wider text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.9)]">
            Dary
          </span>
          <span className="block text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-pink-400">
            LASHES
          </span>
        </div>
      </div>
    </div>
  );
};
