import React from 'react'

interface ElevateLogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showTagline?: boolean
  tagline?: string
  className?: string
  layout?: 'horizontal' | 'stacked' | 'emblem-only'
}

const sizes = {
  sm: { iconH: 'h-6',  text: 'text-sm',   sub: 'text-[9px]' },
  md: { iconH: 'h-8',  text: 'text-base', sub: 'text-[10px]' },
  lg: { iconH: 'h-11', text: 'text-xl',   sub: 'text-xs' },
  xl: { iconH: 'h-14', text: 'text-2xl',  sub: 'text-sm' },
}

/**
 * Logotipo Oficial de Elevate Node.
 * Emblema extraído con transparencia pura (sin fondos ni texturas) y tipografía geométrica exacta.
 */
export const ElevateLogo: React.FC<ElevateLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  tagline = 'PLATAFORMA MULTIMODAL',
  className = '',
  layout = 'horizontal',
}) => {
  const s = sizes[size]
  const isDark = variant === 'dark'

  // Si se solicita únicamente el emblema
  if (layout === 'emblem-only') {
    return (
      <img
        src="/elevate-node-emblem.png"
        alt="Elevate Node Icon"
        className={`${s.iconH} w-auto object-contain shrink-0 ${className}`}
      />
    )
  }

  // Si se solicita layout apilado vertical
  if (layout === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <img
          src={isDark ? '/elevate-node-logo-white.png' : '/elevate-node-logo.png'}
          alt="Elevate Node"
          className={`${s.iconH} w-auto object-contain shrink-0`}
        />
        {showTagline && tagline && (
          <span className={`font-bold tracking-[0.18em] uppercase mt-1 ${s.sub} text-[#D4A017]`}>
            {tagline}
          </span>
        )}
      </div>
    )
  }

  // Layout horizontal estándar: Emblema extraído a la izquierda + Texto alineado a la derecha
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src="/elevate-node-emblem.png"
        alt="Elevate Node Emblem"
        className={`${s.iconH} w-auto object-contain shrink-0 drop-shadow-sm`}
      />
      <div className="flex flex-col justify-center">
        <span
          className={`font-black tracking-tight leading-none uppercase ${s.text} ${
            isDark ? 'text-white' : 'text-[#0A1628]'
          }`}
          style={{ letterSpacing: '0.04em' }}
        >
          ELEVATE NODE
        </span>
        {showTagline && tagline && (
          <span
            className={`font-bold tracking-[0.18em] uppercase leading-tight mt-0.5 ${s.sub} text-[#D4A017]`}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  )
}
