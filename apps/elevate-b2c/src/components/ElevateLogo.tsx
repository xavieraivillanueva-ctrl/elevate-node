import React from 'react'

interface ElevateLogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showTagline?: boolean
  tagline?: string
  className?: string
  layout?: 'full' | 'inline' | 'mark'
}

const sizeConfig = {
  sm: { imgH: 'h-8', text: 'text-xs', sub: 'text-[9px]' },
  md: { imgH: 'h-11', text: 'text-sm', sub: 'text-[10px]' },
  lg: { imgH: 'h-16', text: 'text-base', sub: 'text-xs' },
  xl: { imgH: 'h-24', text: 'text-lg', sub: 'text-xs' },
}

/**
 * Logotipo Oficial Elevate Node.
 * Basado en el emblema oficial de dos pistas entrelazadas (azul marino + oro) con nodos y tipografía geométrica.
 */
export const ElevateLogo: React.FC<ElevateLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  tagline = 'PLATAFORMA MULTIMODAL',
  className = '',
  layout = 'inline',
}) => {
  const cfg = sizeConfig[size]
  const isDark = variant === 'dark'

  // Si se pide solo el layout completo como imagen de la marca
  if (layout === 'full') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <div className={`overflow-hidden rounded-xl ${isDark ? 'bg-white/95 p-2 shadow-lg shadow-black/30 border border-[#D4A017]/40' : ''}`}>
          <img
            src="/elevate-node-logo.png"
            alt="Elevate Node"
            className={`${cfg.imgH} w-auto object-contain`}
          />
        </div>
        {showTagline && tagline && (
          <span
            className={`font-black tracking-[0.2em] uppercase mt-1.5 ${cfg.sub} ${
              isDark ? 'text-[#D4A017]' : 'text-[#0A1628]'
            }`}
          >
            {tagline}
          </span>
        )}
      </div>
    )
  }

  // Layout inline estándar para headers y navbars
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Contenedor del logotipo oficial */}
      <div className={`flex items-center justify-center shrink-0 rounded-xl overflow-hidden transition ${
        isDark 
          ? 'bg-white p-1.5 shadow-md shadow-black/40 border border-[#D4A017]/50' 
          : 'bg-white/90 p-1'
      }`}>
        <img
          src="/elevate-node-logo.png"
          alt="Elevate Node"
          className={`${cfg.imgH} w-auto object-contain max-w-[140px]`}
        />
      </div>

      {/* Tagline o subtítulo opcional */}
      {showTagline && tagline && (
        <div className="border-l border-[#C0C9D6] pl-3 py-0.5">
          <div
            className={`font-black tracking-[0.16em] uppercase leading-tight ${cfg.sub} ${
              isDark ? 'text-[#D4A017]' : 'text-[#0A1628]'
            }`}
          >
            {tagline}
          </div>
        </div>
      )}
    </div>
  )
}
