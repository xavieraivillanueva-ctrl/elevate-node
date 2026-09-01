import React, { useState } from 'react';
import { 
  MapPin, Clock, Calendar, CheckCircle2, ChevronRight, 
  CreditCard, ShieldCheck, X, Sparkles, User, Scissors,
  Heart, Star, ArrowLeft
} from 'lucide-react';
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

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-02');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [clientName, setClientName] = useState('Juan Pérez');
  const [clientPhone, setClientPhone] = useState('55-1234-5678');
  const [clientEmail, setClientEmail] = useState('juan.perez@elevate.io');
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Filter staff & services by current business
  const currentSpecialists = specialists.filter(s => s.businessId === tenant.id);
  const currentServices = services.filter(s => s.businessId === tenant.id);

  const availableHours = ['10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'];

  const handleStartBooking = (service?: ServiceItem, specialist?: Specialist) => {
    if (service) setSelectedService(service);
    else if (currentServices.length > 0) setSelectedService(currentServices[0]);

    if (specialist) setSelectedSpecialist(specialist);
    else if (currentSpecialists.length > 0) setSelectedSpecialist(currentSpecialists[0]);

    setBookingStep(1);
    setIsBookingOpen(true);
  };

  const handleCompletePayment = () => {
    if (!selectedService) return;
    const newAppointment: Appointment = {
      id: 'apt-' + Date.now(),
      businessId: tenant.id,
      specialistId: selectedSpecialist?.id || 'spec-1',
      specialistName: selectedSpecialist?.name || 'Especialista',
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      date: selectedDate,
      timeSlot: selectedTime,
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
    <div className={`w-full max-w-md mx-auto min-h-screen bg-slate-950 text-slate-100 flex flex-col relative pb-20 shadow-2xl border-x border-slate-800 ${tenant.theme.bgGradient}`}>
      
      {/* 1. Header con Branding Dinámico (Mutación) */}
      <header className="px-5 pt-6 pb-4 border-b border-slate-800/80 sticky top-0 bg-slate-950/90 backdrop-blur-md z-30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-slate-950 shadow-md transition-all duration-300"
              style={{ backgroundColor: tenant.theme.primaryColor }}
            >
              <Scissors className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold tracking-tight text-white">{tenant.name}</h1>
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">B2C</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide">{tenant.subtitle}</p>
            </div>
          </div>

          {/* Selector rápido de mutación en el header */}
          <div className="relative">
            <select
              value={tenant.id}
              onChange={(e) => onSwitchTenant(e.target.value)}
              aria-label="Seleccionar negocio"
              className="text-xs bg-slate-900/90 text-cyan-300 border border-slate-700/80 rounded-lg px-2.5 py-1.5 font-medium focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
            >
              {allTenants.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                  {t.type === 'barberia' ? '💈 ' : '💅 '}{t.name.split(':')[0]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Contenido Principal según Pestaña */}
      {activeTab === 'inicio' && (
        <main className="flex-1 px-4 py-4 space-y-5 overflow-y-auto">
          
          {/* 2. Banners Promocionales Deslizables */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Promociones & Ofertas
              </span>
              <span className="text-[11px] text-slate-500">Desliza para ver más</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
              {tenant.banners.map((b, idx) => (
                <div 
                  key={idx}
                  className={`min-w-[240px] max-w-[260px] p-4 rounded-2xl bg-gradient-to-br ${b.bgClass} border border-slate-700/60 shadow-lg snap-start relative flex flex-col justify-between`}
                >
                  {b.tag && (
                    <span className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/70 text-amber-300 border border-amber-400/30 mb-2">
                      {b.tag}
                    </span>
                  )}
                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">{b.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 font-medium">{b.subtitle}</p>
                  </div>
                  {b.price && (
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">{b.price}</span>
                      <button 
                        onClick={() => handleStartBooking()}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition"
                      >
                        Aprovechar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 3. Información del Negocio */}
          <section className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-2.5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Información del Negocio</h2>
            
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{tenant.address}</span>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-cyan-400 font-semibold hover:underline flex items-center gap-0.5"
              >
                Maps <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2 text-slate-200">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{tenant.schedule}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Abierto
              </span>
            </div>
          </section>

          {/* 4. Conoce a tu Barbero / Especialistas */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                {tenant.type === 'barberia' ? 'Conoce a tu Barbero' : 'Conoce a tus Especialistas'}
              </h2>
              <span className="text-[11px] text-cyan-400 font-medium">Disponibles en vivo</span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
              {currentSpecialists.map((spec) => (
                <div 
                  key={spec.id}
                  onClick={() => handleStartBooking(undefined, spec)}
                  className="min-w-[130px] p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer flex flex-col items-center text-center group snap-start"
                >
                  <div className="relative mb-2">
                    <img 
                      src={spec.avatarUrl} 
                      alt={spec.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 group-hover:border-cyan-400 transition"
                    />
                    <span 
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-950 ${
                        spec.status === 'disponible' ? 'bg-emerald-500' :
                        spec.status === 'ocupado' ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      title={spec.status}
                    />
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition truncate w-full">
                    {spec.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate w-full mt-0.5">{spec.role.split('/')[0]}</p>

                  <span className={`mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    spec.status === 'disponible' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : spec.status === 'ocupado'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {spec.status === 'disponible' ? 'Disponible ✓' : spec.status === 'ocupado' ? 'En Cita ✕' : 'Descanso ☕'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Nuestros Servicios */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white">Nuestros Servicios</h2>
            <div className="space-y-2.5">
              {currentServices.map((srv) => (
                <div 
                  key={srv.id}
                  onClick={() => handleStartBooking(srv)}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition">{srv.name}</h3>
                      <span className="text-[10px] text-slate-400">({srv.durationMinutes}m)</span>
                    </div>
                    {srv.description && (
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{srv.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400">${srv.price} MXN</span>
                    <button className="block text-[10px] mt-1 text-cyan-400 font-semibold group-hover:underline">
                      Seleccionar →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Botón Destacado de Agendamiento */}
          <div className="pt-3">
            <button
              onClick={() => handleStartBooking()}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${tenant.theme.buttonClass}`}
            >
              <Calendar className="w-4 h-4" />
              {tenant.ctaText}
            </button>
          </div>
        </main>
      )}

      {/* Pestaña: Mis Citas */}
      {activeTab === 'citas' && (
        <main className="flex-1 p-4 space-y-4">
          <h2 className="text-base font-bold text-white">Mis Reservas y Citas</h2>
          {confirmedBooking ? (
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Cita Confirmada
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">#{confirmedBooking.id.slice(-6)}</span>
              </div>
              <div className="space-y-1 text-xs">
                <p><strong className="text-slate-400">Servicio:</strong> {confirmedBooking.serviceName}</p>
                <p><strong className="text-slate-400">Especialista:</strong> {confirmedBooking.specialistName}</p>
                <p><strong className="text-slate-400">Fecha y Hora:</strong> {confirmedBooking.date} a las {confirmedBooking.timeSlot}</p>
                <p><strong className="text-slate-400">Total:</strong> ${confirmedBooking.servicePrice} MXN (Pagado con Stripe)</p>
              </div>
              <button 
                onClick={() => alert('Cita enviada a tu calendario de Google / Apple')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition"
              >
                Agregar a Google Calendar 📅
              </button>
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
              <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">No tienes citas activas actualmente.</p>
              <button
                onClick={() => { setActiveTab('inicio'); handleStartBooking(); }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-xs font-bold rounded-lg text-white"
              >
                Agendar Mi Primera Cita
              </button>
            </div>
          )}
        </main>
      )}

      {/* Pestaña: Perfil */}
      {activeTab === 'perfil' && (
        <main className="flex-1 p-4 space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-lg">
              JP
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">{clientName}</h2>
              <p className="text-xs text-slate-400">{clientPhone}</p>
              <p className="text-[11px] text-cyan-400 mt-0.5">Cliente Frecuente (Nivel Oro ⭐)</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <h3 className="font-bold text-slate-300">Programa de Lealtad</h3>
            <p className="text-slate-400">Acumulas 1 corte gratis por cada 5 visitas completadas.</p>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-2">
              <div className="bg-amber-400 h-full w-3/5"></div>
            </div>
            <span className="text-[10px] text-amber-400 font-medium">3 de 5 citas realizadas (60%)</span>
          </div>
        </main>
      )}

      {/* Pestaña: Ajustes */}
      {activeTab === 'ajustes' && (
        <main className="flex-1 p-4 space-y-3 text-xs">
          <h2 className="text-sm font-bold text-white mb-2">Preferencias de la App</h2>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span>Notificaciones de recordatorio (WhatsApp/SMS)</span>
            <input type="checkbox" defaultChecked className="accent-cyan-500 w-4 h-4" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span>Modo Alta Visibilidad Neón</span>
            <input type="checkbox" defaultChecked className="accent-cyan-500 w-4 h-4" />
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span>Privacidad de datos y biometría</span>
            <span className="text-[10px] text-emerald-400 font-semibold">Activado</span>
          </div>
        </main>
      )}

      {/* 7. Bottom Navigation Bar B2C */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-lg px-6 py-2.5 flex items-center justify-between z-40">
        <button 
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
            activeTab === 'inicio' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Inicio</span>
        </button>
        <button 
          onClick={() => setActiveTab('citas')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
            activeTab === 'citas' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Citas</span>
        </button>
        <button 
          onClick={() => setActiveTab('perfil')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
            activeTab === 'perfil' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Perfil</span>
        </button>
        <button 
          onClick={() => setActiveTab('ajustes')}
          className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition ${
            activeTab === 'ajustes' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Ajustes</span>
        </button>
      </nav>

      {/* 8. MODAL DE AGENDAMIENTO B2C MULTIPASO */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            
            {/* Header del Modal */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {bookingStep > 1 && bookingStep < 5 && (
                  <button 
                    onClick={() => setBookingStep((bookingStep - 1) as any)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <h3 className="text-sm font-bold text-white">
                  {bookingStep === 1 && '1. Selección de Servicio'}
                  {bookingStep === 2 && '2. Selección de Especialista'}
                  {bookingStep === 3 && '3. Fecha y Hora'}
                  {bookingStep === 4 && '4. Pasarela de Pago (Stripe)'}
                  {bookingStep === 5 && '5. Confirmación de Cita'}
                </h3>
              </div>
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Paso 1: Servicios */}
            {bookingStep === 1 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Elige el servicio que deseas reservar:</p>
                <div className="space-y-2">
                  {currentServices.map((srv) => (
                    <div 
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                        selectedService?.id === srv.id
                          ? 'border-cyan-400 bg-cyan-950/40 text-white'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white">{srv.name}</div>
                        <div className="text-[10px] text-slate-400">{srv.durationMinutes} minutos</div>
                      </div>
                      <span className="font-bold text-amber-400">${srv.price} MXN</span>
                    </div>
                  ))}
                </div>
                <button
                  disabled={!selectedService}
                  onClick={() => setBookingStep(2)}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition mt-3"
                >
                  Continuar con Especialista →
                </button>
              </div>
            )}

            {/* Paso 2: Especialistas */}
            {bookingStep === 2 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Selecciona con quién deseas atenderte:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {currentSpecialists.map((spec) => (
                    <div
                      key={spec.id}
                      onClick={() => setSelectedSpecialist(spec)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex flex-col items-center text-center transition ${
                        selectedSpecialist?.id === spec.id
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-md shadow-cyan-500/10'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <img src={spec.avatarUrl} alt={spec.name} className="w-12 h-12 rounded-full object-cover mb-1.5" />
                      <span className="font-bold text-xs">{spec.name}</span>
                      <span className="text-[10px] text-slate-400">{spec.role.split('/')[0]}</span>
                      <span className={`text-[9px] mt-1.5 px-2 py-0.5 rounded font-bold ${
                        spec.status === 'disponible' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                      }`}>
                        {spec.status === 'disponible' ? 'Disponible' : 'Ocupado'}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  disabled={!selectedSpecialist}
                  onClick={() => setBookingStep(3)}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition mt-3"
                >
                  Continuar a Fecha y Hora →
                </button>
              </div>
            )}

            {/* Paso 3: Fecha y Hora */}
            {bookingStep === 3 && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-semibold">Fecha:</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs text-slate-400 font-semibold">Horarios Disponibles:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableHours.map((hr) => (
                      <button
                        key={hr}
                        onClick={() => setSelectedTime(hr)}
                        className={`py-2 px-1 rounded-lg text-xs font-semibold transition ${
                          selectedTime === hr 
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' 
                            : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {hr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <input 
                    type="text" 
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)} 
                    placeholder="Tu Nombre Completo"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                  <input 
                    type="tel" 
                    value={clientPhone} 
                    onChange={(e) => setClientPhone(e.target.value)} 
                    placeholder="Teléfono (WhatsApp)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <button
                  disabled={!selectedTime || !clientName}
                  onClick={() => setBookingStep(4)}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition mt-2"
                >
                  Continuar al Pago →
                </button>
              </div>
            )}

            {/* Paso 4: Stripe Integration Mockup */}
            {bookingStep === 4 && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Servicio:</span>
                    <span className="text-white font-semibold">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Especialista:</span>
                    <span className="text-white font-semibold">{selectedSpecialist?.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Cita:</span>
                    <span className="text-white font-semibold">{selectedDate} ({selectedTime})</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-sm">
                    <span className="text-white">Total a pagar:</span>
                    <span className="text-amber-400">${selectedService?.price} MXN</span>
                  </div>
                </div>

                {/* Stripe Elements Box */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-cyan-400" /> Stripe Elements Checkout
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> 256-bit SSL
                    </span>
                  </div>

                  <input 
                    type="text" 
                    readOnly 
                    value="•••• •••• •••• 4242 (Tarjeta Demo)" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" readOnly value="12/28" className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300" />
                    <input type="text" readOnly value="CVC •••" className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300" />
                  </div>
                </div>

                <button
                  onClick={handleCompletePayment}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20"
                >
                  Confirmar Reserva y Pagar (${selectedService?.price} MXN)
                </button>
              </div>
            )}

            {/* Paso 5: Confirmación */}
            {bookingStep === 5 && confirmedBooking && (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white">¡Cita Confirmada con Éxito!</h4>
                  <p className="text-xs text-slate-400 mt-1">Hemos enviado el comprobante a tu WhatsApp y correo.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5">
                  <p><span className="text-slate-400">Negocio:</span> <strong className="text-white">{tenant.name}</strong></p>
                  <p><span className="text-slate-400">Especialista:</span> <strong className="text-white">{confirmedBooking.specialistName}</strong></p>
                  <p><span className="text-slate-400">Servicio:</span> <strong className="text-white">{confirmedBooking.serviceName}</strong></p>
                  <p><span className="text-slate-400">Fecha y Hora:</span> <strong className="text-amber-400">{confirmedBooking.date} - {confirmedBooking.timeSlot}</strong></p>
                  <p><span className="text-slate-400">Estatus de Pago:</span> <strong className="text-emerald-400 uppercase">Pagado (Stripe)</strong></p>
                </div>

                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
                >
                  Volver a la Pantalla Principal
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
