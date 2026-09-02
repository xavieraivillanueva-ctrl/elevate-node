import React from 'react'

interface ElevateLogoProps {
  variant?: 'light' | 'dark'   // light = sobre fondo blanco, dark = sobre fondo oscuro
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  tagline?: string
  className?: string
}

const sizes = {
  sm: { icon: 28, text: 'text-sm', sub: 'text-[9px]' },
  md: { icon: 36, text: 'text-base', sub: 'text-[10px]' },
  lg: { icon: 48, text: 'text-xl',  sub: 'text-xs' },
}

/**
 * Logotipo oficial de Elevate Node.
 * Línea diagonal ascendente con nodos — el nodo cima es dorado.
 * variant="light"  → texto azul marino (sobre fondos blancos/claros)
 * variant="dark"   → texto blanco/cian  (sobre fondos oscuros)
 */
export const ElevateLogo: React.FC<ElevateLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  tagline = 'PLATAFORMA MULTIMODAL',
  className = '',
}) => {
  const s = sizes[size]
  const isDark = variant === 'dark'

  /* Colores según variante */
  const lineColor   = isDark ? '#00F0FF' : '#0A1628'
  const nodeColor   = isDark ? '#00F0FF' : '#0A1628'
  const topNodeFill = '#E5A93C'           /* dorado siempre */
  const textColor   = isDark ? '#FFFFFF' : '#0A1628'
  const subColor    = isDark ? '#00F0FF' : '#D4A017'

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG del ícono de nodos */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Línea ascendente doble */}
        <path
          d="M 10 48 C 22 44 34 32 46 14"
          stroke={lineColor}
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M 14 52 C 26 48 38 36 50 18"
          stroke="#E5A93C"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Nodo base */}
        <circle cx="10" cy="48" r="5.5" fill="#fff" stroke={nodeColor} strokeWidth="3.5"/>
        {/* Nodo medio */}
        <circle cx="28" cy="31" r="4.5" fill="#fff" stroke={nodeColor} strokeWidth="3"/>
        {/* Nodo cima — dorado */}
        <circle cx="46" cy="14" r="6"   fill={topNodeFill} stroke="#fff" strokeWidth="2.5"
          style={{ filter: isDark ? 'drop-shadow(0 0 6px rgba(229,169,60,0.7))' : 'none' }}
        />
      </svg>

      {/* Texto */}
      <div>
        <div
          className={`font-black tracking-tight leading-none uppercase ${s.text}`}
          style={{ color: textColor }}
        >
          ELEVATE NODE
        </div>
        {showTagline && (
          <div
            className={`font-bold tracking-[0.18em] uppercase leading-tight ${s.sub}`}
            style={{ color: subColor }}
          >
            {tagline}
          </div>
        )}
      </div>
    </div>
  )
}
