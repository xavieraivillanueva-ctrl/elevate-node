import React, { useState } from 'react';
import { 
  MapPin, Clock, Calendar, CheckCircle2, ChevronRight, ChevronLeft,
  CreditCard, ShieldCheck, X, Sparkles, User, Scissors,
  Heart, Star, ArrowLeft, Check, Bell, Share2, Info
} from 'lucide-react';
import { ElevateLogo, DaryLashesLogo } from '../../components/ElevateLogo';
import { BusinessTenant, Specialist, ServiceItem, Appointment } from '../../types';

interface B2CAppProps {
  tenant: BusinessTenant;
  specialists: Specialist[];
  services: ServiceItem[];
  onBookAppointment: (appointment: Partial<Appointment>) => void;
  onSwitchTenant: (tenantId: string) => void;
  allTenants: BusinessTenant[];
}

export const B2CApp: React.FC<B2CAppProps> = ({
  tenant,
  specialists,
  services,
  onBookAppointment,
  onSwitchTenant,
  allTenants,
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'inicio' | 'citas' | 'perfil' | 'ajustes'>('inicio');

  // Booking Modal State (Exact reproduction of Image 2: 5 Screens)
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(16);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00');
  const [clientName, setClientName] = useState('Juan Barber');
  const [clientPhone, setClientPhone] = useState('55-1234-5678');
  const [clientEmail, setClientEmail] = useState('juan.barber@elevate.io');
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Filter staff & services by current business
  const currentSpecialists = specialists.filter(s => s.businessId === tenant.id);
  const currentServices = services.filter(s => s.businessId === tenant.id);

  // Toggle multiple services for the booking flow (Image 2 Screen 1 has checkboxes)
  const toggleServiceSelection = (srvId: string) => {
    setSelectedServiceIds(prev => 
      prev.includes(srvId) ? prev.filter(id => id !== srvId) : [...prev, srvId]
    );
  };

  const primaryService = currentServices.find(s => selectedServiceIds.includes(s.id)) || currentServices[0];
  const totalPrice = currentServices
    .filter(s => selectedServiceIds.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0) || (primaryService?.price ?? 550);

  const handleStartBooking = (service?: ServiceItem, specialist?: Specialist) => {
    if (service) setSelectedServiceIds([service.id]);
    else if (currentServices.length > 0) setSelectedServiceIds([currentServices[0].id]);

    if (specialist) setSelectedSpecialist(specialist);
    else if (currentSpecialists.length > 0) setSelectedSpecialist(currentSpecialists[0]);

    setBookingStep(1);
    setIsBookingOpen(true);
  };

  const handleConfirmAndPay = () => {
    const newAppointment: Appointment = {
      id: 'apt-' + Date.now(),
      businessId: tenant.id,
      specialistId: selectedSpecialist?.id || 'spec-1',
      specialistName: selectedSpecialist?.name || 'Carlos V.',
      serviceId: primaryService?.id || 'srv-1',
      serviceName: selectedServiceIds.length > 1 ? `${primaryService?.name} (+${selectedServiceIds.length - 1} más)` : (primaryService?.name || 'Servicio'),
      servicePrice: totalPrice,
      date: `2026-09-${selectedDayNumber.toString().padStart(2, '0')}`,
      timeSlot: selectedTimeSlot,
      clientName,
      clientPhone,
      clientEmail,
      paymentStatus: 'pagado',
      createdAt: new Date().toISOString()
    };
    onBookAppointment(newAppointment);
    setConfirmedBooking(newAppointment);
    setBookingStep(5);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-slate-950 text-slate-100 flex flex-col relative pb-20 shadow-2xl">
      
      {/* 1. Header con Branding Dinámico (Matching Image 3, 4 & 5) */}
      <header className="px-5 pt-4 pb-3 border-b border-slate-800/80 sticky top-0 bg-slate-950/95 backdrop-blur-md z-30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {tenant.type === 'lashes' ? (
            <DaryLashesLogo className="h-8" />
          ) : (
            <ElevateLogo className="h-7" />
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs font-black tracking-tight text-white">{tenant.name}</h1>
            </div>
            <p className="text-[10px] font-bold text-amber-400/90 tracking-wider uppercase">
              {tenant.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification bell matching Image 4 */}
          <div className="relative p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
              1
            </span>
          </div>

          {/* Quick mutation switch */}
          <select
            value={tenant.id}
            onChange={(e) => onSwitchTenant(e.target.value)}
            aria-label="Seleccionar negocio activo"
            className="text-[10px] bg-slate-900 text-cyan-300 border border-slate-700 rounded-lg px-2 py-1 font-semibold outline-none cursor-pointer"
          >
            {allTenants.map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                {t.name.split(':')[0]}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Pestaña: INICIO */}
      {activeTab === 'inicio' && (
        <main className="flex-1 px-4 py-3 space-y-4 overflow-y-auto">
          
          {/* 2. Top Promotional Banners (Exact matching Image 3 & 4) */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Promociones & Eventos Exclusivos
              </span>
              <span className="text-[10px] text-slate-500">Desliza ➔</span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
              {tenant.banners.map((b, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleStartBooking()}
                  className={`min-w-[240px] max-w-[260px] p-3.5 rounded-2xl bg-gradient-to-br ${b.bgClass} border border-amber-500/30 shadow-lg snap-start cursor-pointer hover:border-amber-400 transition flex flex-col justify-between`}
                >
                  <div>
                    {b.tag && (
                      <span className="inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 border border-amber-400/40 mb-2">
                        {b.tag}
                      </span>
                    )}
                    <h3 className="text-base font-black text-white leading-snug drop-shadow-md">{b.title}</h3>
                    <p className="text-[11px] text-slate-200 mt-0.5 font-medium">{b.subtitle}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">{b.price}</span>
                    <span className="text-[10px] text-white font-bold bg-white/20 px-2 py-0.5 rounded-md hover:bg-white/30">
                      Reservar
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Información del Negocio (Image 3 Left Box) */}
          <section className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md space-y-2">
            <h2 className="text-[11px] font-black text-slate-300 uppercase tracking-wider">
              Información del Negocio
            </h2>
            
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-medium text-xs">{tenant.address}</span>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-cyan-400 font-bold hover:underline flex items-center text-xs"
              >
                Maps <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2 text-slate-200">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium text-xs">{tenant.schedule}</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Abierto
              </span>
            </div>
          </section>

          {/* 4. Nuestros Servicios (Image 3 Right Box with Golden Circuit Border) */}
          <section className="p-4 rounded-2xl bg-slate-900/90 border-2 border-amber-500/40 shadow-xl space-y-3 relative overflow-hidden">
            {/* Subtle circuit backdrop pattern */}
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Scissors className="w-3.5 h-3.5 text-amber-400" /> Nuestros Servicios
              </h2>
              <span className="text-[10px] text-slate-400 font-semibold">Tarifas en MXN</span>
            </div>

            <div className="space-y-2">
              {currentServices.map((srv) => (
                <div 
                  key={srv.id}
                  onClick={() => handleStartBooking(srv)}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/60 transition flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">✂️</span>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                        {srv.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{srv.description || `${srv.durationMinutes} min de sesión`}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-amber-400">${srv.price} MXN</span>
                    <span className="text-[10px] text-slate-400 block">({srv.durationMinutes}m)</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Conoce a tu Barbero / Especialistas (Image 3 & 4 Horizontal Slider) */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black text-white uppercase tracking-wider">
                {tenant.type === 'barberia' ? 'Conoce a tu Barbero' : 'Conoce a tus Especialistas'}
              </h2>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-[10px]">Disponibilidad en Vivo</span>
              </div>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
              {currentSpecialists.map((spec) => (
                <div 
                  key={spec.id}
                  onClick={() => handleStartBooking(undefined, spec)}
                  className="min-w-[125px] p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 transition cursor-pointer flex flex-col items-center text-center snap-start group"
                >
                  <div className="relative mb-1.5">
                    <img 
                      src={spec.avatarUrl} 
                      alt={spec.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 group-hover:border-cyan-400 transition shadow-md"
                    />
                    <span 
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                        spec.status === 'disponible' ? 'bg-emerald-500' :
                        spec.status === 'ocupado' ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                    />
                  </div>

                  <h3 className="text-[11px] font-black text-white group-hover:text-cyan-300 transition truncate w-full">
                    {spec.name}
                  </h3>
                  <span className={`mt-1.5 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                    spec.status === 'disponible' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : spec.status === 'ocupado'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {spec.status === 'disponible' ? 'Disponible ✓' : spec.status === 'ocupado' ? 'En Cita ✕' : 'Descanso ☕'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Botón Prominente Dorado de Reserva (Image 3 & 4) */}
          <div className="pt-2">
            <button
              onClick={() => handleStartBooking()}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-amber-500/25 border-2 border-amber-300/50 flex items-center justify-center gap-2 transform active:scale-95"
            >
              <Calendar className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              {tenant.ctaText}
            </button>
          </div>

          {/* Footer branding */}
          <div className="text-center pt-3 pb-1 border-t border-slate-900 text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
            ELEVATE NODE | PLATAFORMA TECH PARA BARBERÍAS | www.elevatenode.com
          </div>
        </main>
      )}

      {/* Pestaña: CITAS (Image 2 Bottom Flow) */}
      {activeTab === 'citas' && (
        <main className="flex-1 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">Mis Citas</h2>
            <span className="text-[10px] text-cyan-400 font-bold">Historial & Activas</span>
          </div>

          {/* Cita Corriente */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Cita Corriente</span>
            {confirmedBooking ? (
              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Cita Confirmada
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                    #{confirmedBooking.id.slice(-6)}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><strong className="text-slate-400">Servicio:</strong> <span>{confirmedBooking.serviceName}</span></div>
                  <div className="flex justify-between"><strong className="text-slate-400">Especialista:</strong> <span>{confirmedBooking.specialistName}</span></div>
                  <div className="flex justify-between"><strong className="text-slate-400">Fecha y Hora:</strong> <span className="text-amber-400 font-bold">{confirmedBooking.date} a las {confirmedBooking.timeSlot}</span></div>
                  <div className="flex justify-between"><strong className="text-slate-400">Total:</strong> <span className="text-emerald-400 font-bold">${confirmedBooking.servicePrice} MXN (Stripe)</span></div>
                </div>
                <button 
                  onClick={() => alert('Cita sincronizada con Google Calendar')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl transition text-slate-200"
                >
                  Agregar a Calendario 📅
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
                <div className="font-bold text-white">Corte Cabello + Barba</div>
                <div className="text-slate-400">Especialista: Carlos V.</div>
                <div className="text-amber-400 font-bold">Mañana 11:00 AM</div>
              </div>
            )}
          </div>

          {/* Citas Pasadas */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Citas Pasadas</span>
            <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs space-y-1 opacity-70">
              <div className="flex justify-between font-bold text-slate-300">
                <span>Barba Completa</span>
                <span>$550 MXN</span>
              </div>
              <div className="text-[10px] text-slate-500">18 de Agosto, 2026 • Carlos V.</div>
            </div>
          </div>
        </main>
      )}

      {/* Pestaña: PERFIL (Image 2 Bottom Flow) */}
      {activeTab === 'perfil' && (
        <main className="flex-1 p-4 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-black text-lg">
              JB
            </div>
            <div>
              <h2 className="text-sm font-black text-white">{clientName}</h2>
              <p className="text-xs text-slate-400">{clientEmail}</p>
              <span className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                Cliente VIP Oro ⭐
              </span>
            </div>
          </div>

          {/* Programa de Lealtad (matching Image 2) */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-white">Programa de Lealtad</span>
              <span className="text-amber-400">100% dos slots</span>
            </div>
            <p className="text-slate-400 text-[11px]">Gana 1 servicio gratis por cada 5 reservas completadas.</p>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full w-4/5"></div>
            </div>
            <span className="text-[10px] text-amber-300 font-bold block text-right">4 de 5 cortes realizados</span>
          </div>
        </main>
      )}

      {/* Pestaña: AJUSTES (Image 2 Bottom Flow) */}
      {activeTab === 'ajustes' && (
        <main className="flex-1 p-4 space-y-3 text-xs">
          <h2 className="text-sm font-black text-white mb-2">Ajustes & Preferencias</h2>
          
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span className="font-semibold">Notificaciones de Citas</span>
            <input type="checkbox" defaultChecked className="accent-cyan-500 w-4 h-4" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span className="font-semibold">Privacidad de Datos (GDPR)</span>
            <input type="checkbox" defaultChecked className="accent-cyan-500 w-4 h-4" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span className="font-semibold">Recordatorios por WhatsApp</span>
            <input type="checkbox" defaultChecked className="accent-cyan-500 w-4 h-4" />
          </div>

          <div className="pt-4">
            <button 
              onClick={() => alert('Sesión cerrada')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-rose-400 border border-rose-500/30 text-xs font-bold transition"
            >
              Salir de la Cuenta
            </button>
          </div>
        </main>
      )}

      {/* 7. Bottom Navigation Bar B2C (Exact reproduction from Image 2) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl px-6 py-2 flex items-center justify-between z-40">
        <button 
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-1 text-[10px] font-extrabold transition ${
            activeTab === 'inicio' ? 'text-amber-400 scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scissors className="w-4 h-4 stroke-[2.5]" />
          <span>Inicio</span>
        </button>
        <button 
          onClick={() => setActiveTab('citas')}
          className={`flex flex-col items-center gap-1 text-[10px] font-extrabold transition ${
            activeTab === 'citas' ? 'text-amber-400 scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4 stroke-[2.5]" />
          <span>Citas</span>
        </button>
        <button 
          onClick={() => setActiveTab('perfil')}
          className={`flex flex-col items-center gap-1 text-[10px] font-extrabold transition ${
            activeTab === 'perfil' ? 'text-amber-400 scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4 stroke-[2.5]" />
          <span>Perfil</span>
        </button>
        <button 
          onClick={() => setActiveTab('ajustes')}
          className={`flex flex-col items-center gap-1 text-[10px] font-extrabold transition ${
            activeTab === 'ajustes' ? 'text-amber-400 scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Star className="w-4 h-4 stroke-[2.5]" />
          <span>Ajustes</span>
        </button>
      </nav>

      {/* 8. MODAL DE AGENDAMIENTO B2C MULTIPASO (Exact reproduction of Image 2 screens) */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[92vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Navigation Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {bookingStep > 1 && bookingStep < 5 && (
                  <button 
                    onClick={() => setBookingStep((bookingStep - 1) as any)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  {bookingStep === 1 && '1. Selección de Servicio'}
                  {bookingStep === 2 && '2. Selección de Especialista'}
                  {bookingStep === 3 && '3. Fecha y Hora'}
                  {bookingStep === 4 && '4. Pasarela de Pagos (Stripe)'}
                  {bookingStep === 5 && '5. Confirmación de Cita'}
                </h3>
              </div>
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* PANTALLA 1: SELECCIÓN DE SERVICIO (Image 2 Screen 1 con Checkboxes) */}
            {bookingStep === 1 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Marca los servicios que deseas reservar:</p>
                <div className="space-y-2">
                  {currentServices.map((srv) => {
                    const isSelected = selectedServiceIds.includes(srv.id);
                    return (
                      <div 
                        key={srv.id}
                        onClick={() => toggleServiceSelection(srv.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                          isSelected
                            ? 'border-amber-400 bg-amber-950/30 text-white shadow-md'
                            : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isSelected ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-600 bg-slate-900'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="font-bold text-white">{srv.name}</div>
                            <div className="text-[10px] text-slate-400">{srv.durationMinutes} minutos</div>
                          </div>
                        </div>
                        <span className="font-black text-amber-400">${srv.price} MXN</span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800">
                  <span className="text-slate-400">Total acumulado:</span>
                  <span className="text-sm font-black text-amber-400">${totalPrice} MXN</span>
                </div>

                <button
                  disabled={selectedServiceIds.length === 0}
                  onClick={() => setBookingStep(2)}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-600/20"
                >
                  Continuar con Especialista ➔
                </button>
              </div>
            )}

            {/* PANTALLA 2: SELECCIÓN DE ESPECIALISTA (Image 2 Screen 2 con Cards) */}
            {bookingStep === 2 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Elige a tu barbero o especialista de confianza:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {currentSpecialists.map((spec) => {
                    const isSelected = selectedSpecialist?.id === spec.id;
                    return (
                      <div
                        key={spec.id}
                        onClick={() => setSelectedSpecialist(spec)}
                        className={`p-3 rounded-2xl border text-xs cursor-pointer flex flex-col items-center text-center transition ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-lg shadow-cyan-500/20'
                            : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <img src={spec.avatarUrl} alt={spec.name} className="w-14 h-14 rounded-full object-cover mb-2 border-2 border-slate-700" />
                        <span className="font-bold text-xs text-white">{spec.name}</span>
                        <span className="text-[10px] text-slate-400 truncate w-full">{spec.role.split('/')[0]}</span>
                        <span className={`text-[9px] mt-2 px-2 py-0.5 rounded-full font-bold uppercase ${
                          spec.status === 'disponible' ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/40' : 'text-rose-300 bg-rose-500/20 border border-rose-500/40'
                        }`}>
                          {spec.status === 'disponible' ? 'Disponible ✓' : 'En Cita ✕'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  disabled={!selectedSpecialist}
                  onClick={() => setBookingStep(3)}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition"
                >
                  Continuar a Fecha y Hora ➔
                </button>
              </div>
            )}

            {/* PANTALLA 3: FECHA Y HORA (Image 2 Screen 3 con Calendario 31 días y Slots) */}
            {bookingStep === 3 && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Septiembre 2026</span>
                    <span className="text-cyan-400">Selecciona Día</span>
                  </div>

                  {/* Calendar Grid 1 to 31 */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                      <span key={i} className="text-[10px] font-bold text-slate-500 py-1">{d}</span>
                    ))}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDayNumber(day)}
                        className={`py-1.5 rounded-lg font-bold text-xs transition ${
                          selectedDayNumber === day 
                            ? 'bg-amber-400 text-slate-950 shadow-md scale-105' 
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold">Tiempo y Hora:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10:00', '10:30', '11:00', '12:00', '12:30', '14:00', '15:00'].map((hr) => (
                      <button
                        key={hr}
                        onClick={() => setSelectedTimeSlot(hr)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition ${
                          selectedTimeSlot === hr 
                            ? 'bg-cyan-500 text-slate-950 shadow-md' 
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {hr}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setBookingStep(4)}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition mt-2"
                >
                  Continuar al Pago con Stripe ➔
                </button>
              </div>
            )}

            {/* PANTALLA 4: PASARELA DE PAGOS STRIPE (Image 2 Screen 4) */}
            {bookingStep === 4 && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Especialista:</span>
                    <span className="text-white font-bold">{selectedSpecialist?.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Fecha y Hora:</span>
                    <span className="text-white font-bold">{selectedDayNumber} de Septiembre a las {selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-2 font-black text-sm">
                    <span className="text-white">Precio Total:</span>
                    <span className="text-amber-400">${totalPrice} MXN</span>
                  </div>
                </div>

                {/* Stripe Elements Box matching Image 2 */}
                <div className="p-4 rounded-2xl bg-slate-950 border-2 border-cyan-500/40 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-cyan-400" /> Stripe Elements Checkout
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Pago Seguro
                    </span>
                  </div>

                  <div className="space-y-2">
                    <input 
                      type="text" 
                      readOnly 
                      value="•••• •••• •••• 4242 (Stripe Elements)" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" readOnly value="12 / 28" className="bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 text-center font-mono" />
                      <input type="text" readOnly value="CVC 999" className="bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 text-center font-mono" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={handleConfirmAndPay}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold rounded-lg text-white"
                    >
                       Apple Pay
                    </button>
                    <button 
                      onClick={handleConfirmAndPay}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold rounded-lg text-white"
                    >
                      G Google Pay
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleConfirmAndPay}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-xl shadow-emerald-500/20"
                >
                  Confirmar y Pagar (${totalPrice} MXN)
                </button>
              </div>
            )}

            {/* PANTALLA 5: CONFIRMACIÓN (Image 2 Screen 5 con Ticket y Voucher) */}
            {bookingStep === 5 && (
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white">¡RESERVA CONFIRMADA!</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Hemos registrado tu cita en la base de datos.</p>
                </div>

                {/* Ticket Receipt Voucher matching Image 2 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Especialista:</span>
                    <span className="text-white font-bold">{selectedSpecialist?.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Servicio:</span>
                    <span className="text-white font-bold">{tenant.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Fecha:</span>
                    <span className="text-amber-400 font-bold">{selectedDayNumber} de Septiembre</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Hora:</span>
                    <span className="text-amber-400 font-bold">{selectedTimeSlot} hrs</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Precio Pagado:</span>
                    <span className="text-emerald-400 font-black">${totalPrice} MXN</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition"
                >
                  Cerrar Comprobante
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
