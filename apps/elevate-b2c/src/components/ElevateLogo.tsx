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
  sm: { iconH: 20, text: 'text-sm',   sub: 'text-[9px]' },
  md: { iconH: 28, text: 'text-base', sub: 'text-[10px]' },
  lg: { iconH: 36, text: 'text-xl',   sub: 'text-xs' },
  xl: { iconH: 48, text: 'text-2xl',  sub: 'text-sm' },
}

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
  const textColor = isDark ? 'text-white' : 'text-[#0A1628]'
  const imgStyle: React.CSSProperties = { height: s.iconH, width: 'auto', flexShrink: 0, objectFit: 'contain' }

  if (layout === 'emblem-only') {
    return (
      <img
        src="/elevate-node-emblem.png"
        alt="Elevate Node"
        style={imgStyle}
        className={className}
      />
    )
  }

  if (layout === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <img
          src={isDark ? '/elevate-node-logo-white.png' : '/elevate-node-logo.png'}
          alt="Elevate Node"
          style={{ ...imgStyle, height: s.iconH * 2 }}
        />
        {showTagline && tagline && (
          <span className={`font-bold tracking-[0.18em] uppercase mt-1 ${s.sub} text-[#D4A017]`}>
            {tagline}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src="/elevate-node-emblem.png"
        alt="Elevate Node"
        style={imgStyle}
      />
      <div className="flex flex-col justify-center">
        <span
          className={`font-black tracking-tight leading-none uppercase ${s.text} ${textColor}`}
          style={{ letterSpacing: '0.04em' }}
        >
          ELEVATE NODE
        </span>
        {showTagline && tagline && (
          <span className={`font-bold tracking-[0.18em] uppercase leading-tight mt-0.5 ${s.sub} text-[#D4A017]`}>
            {tagline}
          </span>
        )}
      </div>
    </div>
  )
}
