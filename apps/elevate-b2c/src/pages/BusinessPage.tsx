import React, { useState } from 'react'
import { ArrowLeft, MapPin, Clock, Star, ChevronLeft, ChevronRight, Check, Calendar } from 'lucide-react'
import { BUSINESSES } from '../data/businesses'
import { ElevateLogo } from '../components/ElevateLogo'
import type { Service, StaffMember } from '../types'

type Step = 'home' | 'step1' | 'step2' | 'step3' | 'step4' | 'step5'

const statusConfig = {
  disponible: { label: 'Disponible', dot: 'bg-emerald-500', text: 'text-emerald-600' },
  ocupado:    { label: 'En Cita',    dot: 'bg-red-500',     text: 'text-red-500' },
  descanso:   { label: 'Descanso',   dot: 'bg-amber-500',   text: 'text-amber-600' },
}

const bgStyles = {
  gold:  'from-amber-700 via-amber-800 to-slate-900',
  navy:  'from-slate-800 via-blue-900 to-slate-950',
  teal:  'from-teal-800 via-teal-900 to-slate-900',
}

const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00']
const DAYS  = ['D','L','M','X','J','V','S']
const MARCH = Array.from({ length: 31 }, (_, i) => i + 1)

interface BusinessPageProps {
  businessId: string
  onBack: () => void
  tab: 'inicio' | 'citas' | 'perfil' | 'ajustes'
  onTabChange: (t: 'inicio' | 'citas' | 'perfil' | 'ajustes') => void
  userName: string
}

export const BusinessPage: React.FC<BusinessPageProps> = ({ businessId, onBack, tab, onTabChange, userName }) => {
  const biz = BUSINESSES.find(b => b.id === businessId)!
  const [step, setStep] = useState<Step>('home')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [selectedDay, setSelectedDay] = useState<number>(11)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bannerIdx, setBannerIdx] = useState(0)

  const resetBooking = () => { setStep('home'); setSelectedService(null); setSelectedStaff(null); setSelectedDay(11); setSelectedTime(null) }

  /* ── BOOKING MODAL overlay ───────────────────────────────── */
  if (step !== 'home') {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
        {/* Progress bar */}
        <header className="bg-white border-b border-[#E2E6EC] px-5 pt-5 pb-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => step === 'step1' ? resetBooking() : setStep(s => {
              const ss = ['step1','step2','step3','step4','step5'] as const
              return ss[ss.indexOf(s as any) - 1] as Step
            })} className="p-2 rounded-xl hover:bg-[#F0F2F5] transition">
              <ArrowLeft className="w-5 h-5 text-[#0A1628]" />
            </button>
            <div className="flex-1">
              <p className="text-xs font-bold text-[#6B7B8F] uppercase tracking-wider">
                {step === 'step1' ? '1. Selección de Servicio' :
                 step === 'step2' ? '2. Selección de Especialista' :
                 step === 'step3' ? '3. Fecha y Hora' :
                 step === 'step4' ? '4. Pasarela de Pagos' :
                 '5. Confirmación'}
              </p>
              {/* Steps indicators */}
              <div className="flex gap-1 mt-1.5">
                {['step1','step2','step3','step4','step5'].map((s, i) => (
                  <div key={s} className={`h-1 flex-1 rounded-full ${
                    ['step1','step2','step3','step4','step5'].indexOf(step) >= i
                      ? 'bg-[#0A1628]' : 'bg-[#E2E6EC]'
                  }`} />
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-5">

          {/* STEP 1 — Servicio */}
          {step === 'step1' && (
            <div className="space-y-3">
              <h2 className="text-lg font-black text-[#0A1628]">Elige tu Servicio</h2>
              {biz.services.map(svc => (
                <button
                  key={svc.id}
                  onClick={() => { setSelectedService(svc); setStep('step2') }}
                  className={`card-hover w-full bg-white rounded-2xl border p-4 text-left flex items-center gap-3 transition ${
                    selectedService?.id === svc.id ? 'border-[#0A1628] shadow-md' : 'border-[#E2E6EC]'
                  }`}
                >
                  <span className="text-2xl">{svc.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-black text-[#0A1628]">{svc.name}</p>
                    <p className="text-xs text-[#6B7B8F] mt-0.5">{svc.description}</p>
                    <p className="text-xs text-[#A0ADB8] mt-1">{svc.durationMinutes} min</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base font-black" style={{ color: '#D4A017' }}>${svc.price.toLocaleString()} MXN</p>
                    {selectedService?.id === svc.id && <Check className="w-4 h-4 text-[#0A1628] ml-auto mt-1" />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 — Especialista */}
          {step === 'step2' && (
            <div className="space-y-4">
              <h2 className="text-lg font-black text-[#0A1628]">Conoce a tus Especialistas</h2>
              <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
                {biz.staff.map(sp => {
                  const st = statusConfig[sp.status]
                  return (
                    <button
                      key={sp.id}
                      onClick={() => { setSelectedStaff(sp); setStep('step3') }}
                      className={`card-hover shrink-0 w-44 bg-white rounded-2xl border p-4 text-center transition ${
                        selectedStaff?.id === sp.id ? 'border-[#0A1628] shadow-md' : 'border-[#E2E6EC]'
                      }`}
                    >
                      <img src={sp.avatarUrl} alt={sp.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-[#E2E6EC]" />
                      <p className="text-sm font-black text-[#0A1628] leading-tight">{sp.name}</p>
                      <p className="text-[10px] text-[#6B7B8F] mt-0.5">{sp.role}</p>
                      <div className={`flex items-center justify-center gap-1 mt-2 text-[11px] font-bold ${st.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        {st.label}
                      </div>
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-center text-[#A0ADB8]">Desliza para ver más especialistas →</p>
            </div>
          )}

          {/* STEP 3 — Fecha y Hora */}
          {step === 'step3' && (
            <div className="space-y-5">
              <h2 className="text-lg font-black text-[#0A1628]">Selecciona Fecha y Hora</h2>

              {/* Mini calendario */}
              <div className="bg-white rounded-2xl border border-[#E2E6EC] p-4">
                <div className="flex items-center justify-between mb-3">
                  <button className="p-1 hover:bg-[#F0F2F5] rounded-lg"><ChevronLeft className="w-4 h-4 text-[#0A1628]" /></button>
                  <p className="text-sm font-black text-[#0A1628]">Marzo 2023</p>
                  <button className="p-1 hover:bg-[#F0F2F5] rounded-lg"><ChevronRight className="w-4 h-4 text-[#0A1628]" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-[#6B7B8F]">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {MARCH.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`aspect-square rounded-full text-xs font-bold transition flex items-center justify-center ${
                        d === selectedDay
                          ? 'bg-[#0A1628] text-white shadow'
                          : d < 9 ? 'text-[#C0C9D6]' : 'text-[#0A1628] hover:bg-[#F0F2F5]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horarios */}
              <div className="bg-white rounded-2xl border border-[#E2E6EC] p-4">
                <p className="text-xs font-black text-[#0A1628] uppercase tracking-wider mb-3">Tiempo y Hora</p>
                <div className="grid grid-cols-4 gap-2">
                  {TIMES.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        selectedTime === t
                          ? 'bg-[#0A1628] text-white border-[#0A1628]'
                          : 'bg-[#F0F2F5] text-[#0A1628] border-transparent hover:border-[#0A1628]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => selectedTime && setStep('step4')}
                disabled={!selectedTime}
                className="btn-cta w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40"
              >
                Continuar al Pago →
              </button>
            </div>
          )}

          {/* STEP 4 — Pago */}
          {step === 'step4' && (
            <div className="space-y-4">
              <h2 className="text-lg font-black text-[#0A1628]">Pasarela de Pagos</h2>

              {/* Resumen */}
              <div className="bg-white rounded-2xl border border-[#E2E6EC] p-4 space-y-2">
                <p className="text-xs font-black text-[#6B7B8F] uppercase tracking-wider">Resumen de tu cita</p>
                <div className="flex justify-between text-sm"><span className="text-[#6B7B8F]">Especialista</span><span className="font-bold text-[#0A1628]">{selectedStaff?.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6B7B8F]">Servicio</span><span className="font-bold text-[#0A1628]">{selectedService?.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6B7B8F]">Fecha</span><span className="font-bold text-[#0A1628]">{selectedDay} Marzo · {selectedTime}</span></div>
                <div className="h-px bg-[#E2E6EC] my-1" />
                <div className="flex justify-between text-base"><span className="font-black text-[#0A1628]">Total</span><span className="font-black" style={{ color: '#D4A017' }}>${selectedService?.price.toLocaleString()} MXN</span></div>
              </div>

              {/* Card input mock */}
              <div className="bg-white rounded-2xl border border-[#E2E6EC] p-4 space-y-3">
                <p className="text-xs font-black text-[#6B7B8F] uppercase tracking-wider">Información de Tarjeta</p>
                <div className="bg-[#F0F2F5] border border-[#E2E6EC] rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-[#6B7B8F] text-sm">💳</span>
                  <span className="text-sm text-[#A0ADB8] flex-1">Número de tarjeta</span>
                  <span className="text-xs text-[#A0ADB8]">Stripe</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F0F2F5] border border-[#E2E6EC] rounded-xl px-4 py-3 text-sm text-[#A0ADB8]">MM / AA</div>
                  <div className="bg-[#F0F2F5] border border-[#E2E6EC] rounded-xl px-4 py-3 text-sm text-[#A0ADB8]">CVC</div>
                </div>
              </div>

              {/* Pago alternativo */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1.5">
                  🍎 <span>Apple Pay</span>
                </button>
                <button className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1.5">
                  <span>G</span> <span>Google Pay</span>
                </button>
              </div>

              <button onClick={() => setStep('step5')} className="btn-cta w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                🔒 Pagar ${selectedService?.price.toLocaleString()} MXN →
              </button>
            </div>
          )}

          {/* STEP 5 — Confirmación */}
          {step === 'step5' && (
            <div className="flex flex-col items-center text-center py-8 space-y-5">
              <div className="w-20 h-20 rounded-full bg-[#0A1628] flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 text-[#D4A017]" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#0A1628]">¡Cita Confirmada!</h2>
                <p className="text-[#6B7B8F] text-sm mt-1">Recibirás una confirmación en tu correo</p>
              </div>

              <div className="w-full bg-white rounded-2xl border border-[#E2E6EC] p-5 text-left space-y-3">
                <div className="flex justify-between text-sm"><span className="text-[#6B7B8F]">Negocio</span><span className="font-bold text-[#0A1628]">{biz.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6B7B8F]">Especialista</span><span className="font-bold text-[#0A1628]">{selectedStaff?.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6B7B8F]">Servicio</span><span className="font-bold text-[#0A1628]">{selectedService?.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#6B7B8F]">Fecha</span><span className="font-bold text-[#0A1628]">{selectedDay} Marzo 2023 · {selectedTime}</span></div>
                <div className="h-px bg-[#E2E6EC]" />
                <div className="flex justify-between text-base"><span className="font-black text-[#0A1628]">Precio</span><span className="font-black" style={{ color: '#D4A017' }}>${selectedService?.price.toLocaleString()} MXN</span></div>
              </div>

              <button
                onClick={resetBooking}
                className="btn-cta w-full py-3.5 rounded-xl text-sm"
              >
                Volver al Negocio
              </button>
            </div>
          )}
        </main>
      </div>
    )
  }

  /* ── MAIN BUSINESS PAGE ─────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">

      {/* ── Fixed Header ────────────────────────────────── */}
      <header className="bg-white border-b border-[#E2E6EC] px-5 py-3 sticky top-0 z-30 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-[#F0F2F5] transition">
            <ArrowLeft className="w-5 h-5 text-[#0A1628]" />
          </button>
          <ElevateLogo variant="light" size="sm" showTagline={false} />
          <span className="text-[#C0C9D6] font-light">|</span>
          <div className="text-base font-black text-[#0A1628] truncate">{biz.name}</div>
          {biz.isOpen && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Abierto
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-[#D4A017] shrink-0">
          <Star className="w-3.5 h-3.5 fill-[#D4A017]" />{biz.rating}
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full pb-28">

        {/* ── Banners carousel ──────────────────────────── */}
        <div className="relative overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-none snap-x gap-0">
            {biz.banners.map((banner, i) => (
              <div
                key={banner.id}
                className={`snap-start shrink-0 w-full min-h-[140px] bg-gradient-to-br ${bgStyles[banner.bgStyle]} relative flex flex-col justify-end p-5`}
              >
                {banner.imageUrl && (
                  <div className="absolute inset-0 overflow-hidden">
                    <img src={banner.imageUrl} alt="" className="w-full h-full object-cover opacity-30" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${bgStyles[banner.bgStyle]} opacity-75`} />
                  </div>
                )}
                <div className="relative z-10">
                  {banner.tag && (
                    <span className="inline-block px-2 py-0.5 bg-[#D4A017] text-[#0A1628] text-[10px] font-black rounded-full uppercase tracking-wider mb-1.5">
                      {banner.tag}
                    </span>
                  )}
                  <h3 className="text-white font-black text-xl leading-tight whitespace-pre-line">{banner.title}</h3>
                  <p className="text-white/75 text-xs mt-1">{banner.subtitle}</p>
                  {banner.price && <p className="text-[#D4A017] font-black text-sm mt-1">{banner.price}</p>}
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-1.5 py-2 bg-[#F0F2F5]">
            {biz.banners.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition ${i === bannerIdx ? 'bg-[#0A1628]' : 'bg-[#C0C9D6]'}`} />
            ))}
          </div>
        </div>

        {/* ── Información del Negocio ───────────────────── */}
        <section className="px-5 py-4 bg-white border-b border-[#E2E6EC]">
          <div className="grid grid-cols-2 gap-3">
            <h3 className="col-span-2 text-xs font-black text-[#0A1628] uppercase tracking-widest">Información del Negocio</h3>
            <div className="flex items-center gap-2 text-sm text-[#1A2B45]">
              <MapPin className="w-4 h-4 text-[#D4A017] shrink-0" />
              <span className="font-medium">{biz.address} · {biz.city}</span>
            </div>
            <button className="text-sm font-bold text-[#D4A017] text-right hover:underline flex items-center justify-end gap-1">
              Maps <ChevronRight className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2 text-sm text-[#1A2B45]">
              <Clock className="w-4 h-4 text-[#D4A017] shrink-0" />
              <span className="font-medium">{biz.schedule}</span>
            </div>
            <button className="text-sm font-bold text-[#D4A017] text-right hover:underline flex items-center justify-end gap-1">
              Ver horario <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </section>

        {/* ── Servicios ─────────────────────────────────── */}
        <section className="px-5 py-4 border-b border-[#E2E6EC]">
          <h3 className="text-xs font-black text-[#0A1628] uppercase tracking-widest mb-3">Nuestros Servicios</h3>
          <div className="space-y-2">
            {biz.services.map(svc => (
              <div key={svc.id} className="flex items-center gap-2 text-sm">
                <span>{svc.icon}</span>
                <span className="font-semibold text-[#1A2B45] flex-1">{svc.name}</span>
                <span className="font-black text-[#D4A017]">${svc.price.toLocaleString()} MXN</span>
                <span className="text-[#A0ADB8] text-xs">({svc.durationMinutes}m)</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Especialistas ─────────────────────────────── */}
        <section className="px-5 py-4 border-b border-[#E2E6EC]">
          <h3 className="text-xs font-black text-[#0A1628] uppercase tracking-widest mb-3">
            Conoce a tu {biz.category === 'barberia' ? 'Barbero' : 'Especialista'}
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {biz.staff.map(sp => {
              const st = statusConfig[sp.status]
              return (
                <div key={sp.id} className="shrink-0 flex flex-col items-center gap-1.5 w-24">
                  <div className="relative">
                    <img src={sp.avatarUrl} alt={sp.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#E2E6EC]" />
                    <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${st.dot}`} />
                  </div>
                  <p className="text-[11px] font-bold text-[#0A1628] text-center leading-tight">{sp.name}</p>
                  <p className={`text-[10px] font-bold ${st.text}`}>{st.label}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── CTA Agendar ───────────────────────────────── */}
        <div className="px-5 pt-5">
          <button
            onClick={() => setStep('step1')}
            className="btn-cta w-full py-4 rounded-2xl text-base flex items-center justify-center gap-3"
          >
            <Calendar className="w-5 h-5" />
            <span>{biz.ctaText}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 pb-4">
          <p className="text-[10px] text-[#A0ADB8] tracking-wider uppercase">
            ELEVATE NODE | PLATAFORMA TECH PARA BARBERÍAS | www.elevatenode.com
          </p>
        </div>
      </main>

      {/* ── Bottom Tab Bar ────────────────────────────── */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-[#E2E6EC] z-30 max-w-2xl mx-auto">
        <div className="flex">
          {(['inicio', 'citas', 'perfil', 'ajustes'] as const).map(t => {
            const icons: Record<typeof t, string> = { inicio: '🏠', citas: '📅', perfil: '👤', ajustes: '⚙️' }
            const labels: Record<typeof t, string> = { inicio: 'Inicio', citas: 'Citas', perfil: 'Perfil', ajustes: 'Ajustes' }
            return (
              <button
                key={t}
                onClick={() => onTabChange(t)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition ${tab === t ? 'text-[#0A1628]' : 'text-[#A0ADB8]'}`}
              >
                <span className="text-lg">{icons[t]}</span>
                <span className={`text-[10px] font-bold ${tab === t ? 'text-[#0A1628]' : 'text-[#A0ADB8]'}`}>{labels[t]}</span>
                {tab === t && <div className="w-1 h-1 rounded-full bg-[#D4A017]" />}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
