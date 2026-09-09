import React, { useEffect } from 'react'
import { X, MapPin, Clock, Star, Scissors, Wifi, Battery, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react'
import { ElevateLogo } from './ElevateLogo'

export interface PreviewService {
  id: string
  name: string
  price: number
  durationMinutes: number
  category?: string
  description?: string
  isActive?: boolean
}

export interface PreviewStaff {
  id: string
  name: string
  role: string
  avatarUrl: string
  status: 'disponible' | 'ocupado' | 'descanso'
}

export interface AppPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  business: {
    name: string
    subtitle?: string
    address: string
    schedule: string
    isOpen: boolean
    bannerUrl?: string
    logoUrl?: string
    type?: string
    primaryColor?: string
    accentColor?: string
    ctaText?: string
    promoBanners?: Array<{ id: string; title: string; subtitle: string; tag?: string; price?: string; imageUrl?: string; bgStyle?: 'gold' | 'navy' | 'teal' }>
  }
  services: PreviewService[]
  staff: PreviewStaff[]
}

const statusBadge = {
  disponible: { text: 'Disponible', dot: 'bg-emerald-400' },
  ocupado:    { text: 'En Cita',    dot: 'bg-red-400' },
  descanso:   { text: 'Descanso',   dot: 'bg-amber-400' },
}

export const AppPreviewModal: React.FC<AppPreviewModalProps> = ({
  isOpen,
  onClose,
  business,
  services,
  staff,
}) => {
  // Manejar tecla Esc para cerrar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Filtrar solo servicios activos si la propiedad existe
  const activeServices = services.filter(s => s.isActive !== false)

  const primaryCol = business.primaryColor || '#0A1628'
  const accentCol = business.accentColor || '#D4A017'
  const ctaBtnText = business.ctaText || '✦ Agendar Cita en Línea'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Contenedor Flotante */}
      <div className="relative flex flex-col items-center max-h-full">
        
        {/* Barra superior de control del Simulador */}
        <div className="w-full max-w-sm flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" /> Vista Previa App B2C
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#111D35] border border-[#1C2F4A] text-[#8CA4C0] hover:text-white hover:border-[#00F0FF] transition cursor-pointer"
            title="Cerrar Simulador (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Mockup de iPhone con CSS ────────────────────────────────────── */}
        <div className="relative w-[340px] sm:w-[365px] h-[660px] sm:h-[720px] bg-[#070E1A] rounded-[50px] border-[9px] border-[#1C2433] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden select-none ring-1 ring-white/10">
          
          {/* Muescas físicas del chasis */}
          <div className="absolute -left-[12px] top-24 w-[3px] h-9 bg-[#2A3447] rounded-l" />
          <div className="absolute -left-[12px] top-36 w-[3px] h-12 bg-[#2A3447] rounded-l" />
          <div className="absolute -right-[12px] top-28 w-[3px] h-14 bg-[#2A3447] rounded-r" />

          {/* ── Pantalla del iPhone (Contenedor iOS) ── */}
          <div className="flex-1 bg-[#F0F2F5] flex flex-col overflow-y-auto relative scrollbar-none">
            
            {/* iOS Status Bar */}
            <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md pt-2 px-6 pb-1 flex items-center justify-between text-black text-[11px] font-semibold tracking-tight border-b border-black/5">
              <span>9:41</span>
              
              {/* Dynamic Island simulada */}
              <div className="w-20 h-4 bg-black rounded-full mx-auto -mt-1 flex items-center justify-end px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                <span className="text-[9px] font-bold">5G</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Header del Marketplace B2C */}
            <header className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-[#E2E6EC] sticky top-7 z-20 shadow-xs">
              <div className="flex items-center gap-2">
                {business.logoUrl ? (
                  <img src={business.logoUrl} alt="Logo" className="w-6 h-6 rounded-lg object-contain" />
                ) : (
                  <ElevateLogo variant="light" size="sm" showTagline={false} />
                )}
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0A1628]">
                  {business.type || 'Elevate'}
                </span>
              </div>
              <div>
                {business.isOpen ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Abierto
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Pausado
                  </span>
                )}
              </div>
            </header>

            {/* Hero Banner del Negocio con Estilos Dinámicos */}
            <div
              className="relative h-36 overflow-hidden flex flex-col justify-end p-4 transition-colors"
              style={{ backgroundColor: primaryCol }}
            >
              {business.bannerUrl ? (
                <img
                  src={business.bannerUrl}
                  alt="Banner del negocio"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
              ) : (
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="relative z-10">
                <span
                  className="inline-block px-2 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider mb-1 text-black shadow-xs"
                  style={{ backgroundColor: accentCol }}
                >
                  ✦ EXPERIENCIA VERIFICADA
                </span>
                <h2 className="text-white font-black text-base leading-tight drop-shadow-sm">
                  {business.name || 'Nombre del Negocio'}
                </h2>
                <p className="text-white/80 text-[11px] truncate mt-0.5">
                  {business.subtitle || 'Especialistas certificados en atención personalizada'}
                </p>
              </div>
            </div>

            {/* Banners Promocionales si existen */}
            {business.promoBanners && business.promoBanners.length > 0 && (
              <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E6EC] space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#6B7B8F]">Promociones Especiales</p>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {business.promoBanners.map(b => (
                    <div
                      key={b.id}
                      className="shrink-0 w-52 rounded-xl p-3 text-white relative overflow-hidden shadow-xs"
                      style={{ backgroundColor: primaryCol }}
                    >
                      {b.imageUrl && (
                        <img src={b.imageUrl} alt={b.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                      )}
                      <div className="relative z-10">
                        {b.tag && (
                          <span
                            className="text-[8px] font-black px-1.5 py-0.5 rounded text-black uppercase mb-1 inline-block"
                            style={{ backgroundColor: accentCol }}
                          >
                            {b.tag}
                          </span>
                        )}
                        <p className="text-xs font-black truncate">{b.title}</p>
                        <p className="text-[10px] opacity-80 truncate">{b.subtitle}</p>
                        {b.price && <p className="text-xs font-black mt-1" style={{ color: accentCol }}>{b.price}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info rápida del Local */}
            <div className="bg-white px-4 py-2.5 border-b border-[#E2E6EC] text-[11px] space-y-1.5">
              <div className="flex items-center justify-between text-[#6B7B8F]">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                  <span className="truncate">{business.address || 'Dirección comercial'}</span>
                </div>
                <span className="flex items-center gap-0.5 font-bold text-[#D4A017] shrink-0">
                  <Star className="w-3 h-3 fill-[#D4A017]" /> 4.9
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6B7B8F]">
                <Clock className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                <span>{business.schedule || 'Lun a Sáb: 10:00 – 20:00'}</span>
              </div>
            </div>

            {/* ── Conoce al Staff ───────────────────────── */}
            <div className="p-3 border-b border-[#E2E6EC] bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-black uppercase tracking-wider text-[#0A1628]">
                  Especialistas en Turno
                </h3>
                <span className="text-[10px] text-[#6B7B8F] font-bold">
                  {staff.length} profesionales
                </span>
              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                {staff.map(sp => {
                  const badge = statusBadge[sp.status] || statusBadge.disponible
                  return (
                    <div
                      key={sp.id}
                      className="shrink-0 w-24 bg-[#F8FAFC] border border-[#E2E6EC] rounded-xl p-2 text-center flex flex-col items-center"
                    >
                      <div className="relative mb-1">
                        <img
                          src={sp.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop'}
                          alt={sp.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#E2E6EC]"
                        />
                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${badge.dot}`} />
                      </div>
                      <p className="text-[11px] font-bold text-[#0A1628] truncate w-full">
                        {sp.name}
                      </p>
                      <p className="text-[9px] text-[#6B7B8F] truncate w-full">
                        {sp.role}
                      </p>
                      <span className="mt-1 text-[8px] font-extrabold text-[#D4A017] bg-[#D4A017]/10 px-1.5 py-0.5 rounded-md">
                        {badge.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Catálogo de Servicios ─────────────────── */}
            <div className="p-3 space-y-2 pb-24">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-wider text-[#0A1628]">
                  Catálogo de Servicios
                </h3>
                <span className="text-[10px] font-semibold text-[#D4A017] flex items-center gap-0.5">
                  Precios en MXN <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              {activeServices.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#8CA4C0] bg-white rounded-xl border border-dashed border-[#CBD5E1]">
                  No hay servicios publicados aún. Agrega servicios desde el Cockpit.
                </div>
              ) : (
                activeServices.map(svc => (
                  <div
                    key={svc.id}
                    className="bg-white border border-[#E2E6EC] rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-xs hover:border-[#D4A017] transition"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#0A1628]/5 flex items-center justify-center text-sm shrink-0">
                        {svc.category?.toLowerCase().includes('barba') ? '🪒' :
                         svc.category?.toLowerCase().includes('uñ') ? '💅' :
                         svc.category?.toLowerCase().includes('spa') ? '🌿' : '✂️'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0A1628] truncate">
                          {svc.name}
                        </p>
                        <p className="text-[10px] text-[#6B7B8F]">
                          {svc.durationMinutes} min · {svc.category || 'Servicio'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <p className="text-xs font-black text-[#D4A017]">
                        ${svc.price.toLocaleString()} MXN
                      </p>
                      <button
                        type="button"
                        className="text-[9px] font-bold px-2 py-0.5 mt-0.5 rounded bg-[#0A1628] text-white hover:bg-[#D4A017] hover:text-[#0A1628] transition"
                      >
                        Agendar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* ── Sticky Bottom Bar & iPhone Home Indicator ─ */}
          <div className="bg-white/95 backdrop-blur-md border-t border-[#E2E6EC] px-4 pt-2 pb-3 shrink-0">
            <button
              type="button"
              style={{ backgroundColor: primaryCol }}
              className="w-full py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition hover:opacity-90 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accentCol }} />
              <span>{ctaBtnText}</span>
            </button>
            
            {/* iOS Home Bar */}
            <div className="w-28 h-1 bg-[#CBD5E1] rounded-full mx-auto mt-2.5" />
          </div>

        </div>

      </div>
    </div>
  )
}
