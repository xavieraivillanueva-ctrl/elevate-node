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

/** Emblema SVG inline — nunca depende de archivos externos */
const Emblem: React.FC<{ size: number; isDark: boolean }> = ({ size, isDark }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    {/* Hexágono exterior */}
    <polygon
      points="50,4 93,27 93,73 50,96 7,73 7,27"
      fill={isDark ? '#D4A017' : '#0A1628'}
      opacity="0.12"
    />
    <polygon
      points="50,4 93,27 93,73 50,96 7,73 7,27"
      fill="none"
      stroke={isDark ? '#D4A017' : '#0A1628'}
      strokeWidth="3"
    />
    {/* Letra E estilizada */}
    <text
      x="50"
      y="68"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="900"
      fontSize="54"
      fill={isDark ? '#D4A017' : '#0A1628'}
    >E</text>
    {/* Punto dorado decorativo */}
    <circle cx="72" cy="30" r="5" fill="#D4A017" />
  </svg>
)

/**
 * Logotipo Oficial de Elevate Node — SVG inline, sin dependencias externas.
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
  const textColor = isDark ? 'text-white' : 'text-[#0A1628]'

  if (layout === 'emblem-only') {
    return <Emblem size={s.iconH} isDark={isDark} />
  }

  if (layout === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <Emblem size={s.iconH * 2} isDark={isDark} />
        {showTagline && tagline && (
          <span className={`font-bold tracking-[0.18em] uppercase mt-1 ${s.sub} text-[#D4A017]`}>
            {tagline}
          </span>
        )}
      </div>
    )
  }

  // Layout horizontal estándar
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <Emblem size={s.iconH} isDark={isDark} />
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

