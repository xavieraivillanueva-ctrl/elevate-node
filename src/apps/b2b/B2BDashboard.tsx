import React, { useState } from 'react';
import { 
  BarChart3, Users, DollarSign, AlertTriangle, ShieldAlert, 
  Sparkles, RefreshCw, CheckCircle2, ChevronRight, Power, 
  Sliders, Plus, Store, Scissors, ArrowUpRight, TrendingUp,
  Clock, Package, CreditCard, Bell
} from 'lucide-react';
import { BusinessTenant, Specialist, ServiceItem, InventoryAlert, DashboardMetrics } from '../../types';

interface B2BDashboardProps {
  tenant: BusinessTenant;
  specialists: Specialist[];
  services: ServiceItem[];
  metrics: DashboardMetrics;
  stockAlerts: InventoryAlert[];
  onToggleKillSwitch?: () => void;
  onMutateAppPromo?: () => void;
}

export const B2BDashboard: React.FC<B2BDashboardProps> = ({
  tenant,
  specialists,
  services,
  metrics,
  stockAlerts,
}) => {
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [promoApproved, setPromoApproved] = useState(false);
  const [activeSection, setActiveSection] = useState<'cockpit' | 'onboarding' | 'staff' | 'inventario' | 'stripe'>('cockpit');
  const [onboardingStep, setOnboardingStep] = useState<number>(5);

  const timelineHours = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '03:00 PM'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col circuit-bg">
      
      {/* 1. Header B2B Cockpit */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">ELEVATE NODE B2B</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Cockpit Socio</span>
            </div>
            <h1 className="text-lg font-black tracking-tight text-white">{tenant.name}</h1>
          </div>
        </div>

        {/* Status bar and Kill Switch */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300 font-medium">Real-Time Sync: Activo</span>
          </div>

          {/* KILL SWITCH BOT BUTTON (From Image 1) */}
          <button
            onClick={() => setKillSwitchActive(!killSwitchActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md ${
              killSwitchActive 
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 animate-pulse' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>KILL SWITCH BOT: {killSwitchActive ? 'OFF (DETENIDO)' : 'ON (OPERANDO)'}</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 px-6 py-2 flex items-center gap-4 text-xs font-semibold overflow-x-auto">
        <button 
          onClick={() => setActiveSection('cockpit')}
          className={`px-3 py-1.5 rounded-lg transition ${activeSection === 'cockpit' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Cockpit en Tiempo Real
        </button>
        <button 
          onClick={() => setActiveSection('onboarding')}
          className={`px-3 py-1.5 rounded-lg transition ${activeSection === 'onboarding' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Flujo de Onboarding (5 Pasos)
        </button>
        <button 
          onClick={() => setActiveSection('staff')}
          className={`px-3 py-1.5 rounded-lg transition ${activeSection === 'staff' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Staff & Rendimiento
        </button>
        <button 
          onClick={() => setActiveSection('inventario')}
          className={`px-3 py-1.5 rounded-lg transition ${activeSection === 'inventario' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Inventario & Stock
        </button>
        <button 
          onClick={() => setActiveSection('stripe')}
          className={`px-3 py-1.5 rounded-lg transition ${activeSection === 'stripe' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          Contabilidad & Stripe
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* SECTION: COCKPIT REAL-TIME */}
        {activeSection === 'cockpit' && (
          <div className="space-y-6">
            
            {/* Top Stat Cards (From Image 1 & 2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
                <span className="text-xs font-semibold text-slate-400">Total Día's Revenue</span>
                <div className="text-2xl font-black text-amber-400 mt-1">${metrics.dailyRevenue} USD</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs semana pasada
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
                <span className="text-xs font-semibold text-slate-400">Gross Revenue Acumulado</span>
                <div className="text-2xl font-black text-white mt-1">${metrics.grossRevenue.toFixed(2)} MXN</div>
                <div className="text-[11px] text-slate-400 mt-1">Comisiones retenidas: ${metrics.commissions}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
                <span className="text-xs font-semibold text-slate-400">Tasa de Retención Staff</span>
                <div className="text-2xl font-black text-cyan-400 mt-1">{metrics.staffRetentionRate}%</div>
                <div className="text-[11px] text-slate-400 mt-1">Duración promedio: {metrics.avgServiceDuration}m</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
                <span className="text-xs font-semibold text-slate-400">Estatus de Puestos</span>
                <div className="text-sm font-bold text-white mt-2">Carlos, Luis, Luis (Puesto 001)</div>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">3 Barberos activos en vivo</div>
              </div>
            </div>

            {/* Central Timeline Table (Direct reproduction from Image 1 Cockpit) */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" /> Cockpit de Operación Real-Time
                  </h2>
                  <p className="text-xs text-slate-400">Timeline de agenda y disponibilidad de especialistas</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Libre</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> En Cita</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Descanso</span>
                </div>
              </div>

              {/* Timeline Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3 font-bold w-40">Barbero / Especialista</th>
                      {timelineHours.map((hr) => (
                        <th key={hr} className="py-2.5 px-2 text-center font-semibold text-slate-300">{hr}</th>
                      ))}
                      <th className="py-2.5 px-3 text-right font-bold">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {specialists.map((spec) => (
                      <tr key={spec.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <img src={spec.avatarUrl} alt={spec.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                            <div>
                              <div className="font-bold text-white">{spec.name}</div>
                              <div className="text-[10px] text-slate-400">{spec.role.split('/')[0]}</div>
                            </div>
                          </div>
                        </td>

                        {/* Timeline slots */}
                        {spec.scheduleTimeline ? (
                          spec.scheduleTimeline.map((slot, sIdx) => (
                            <td key={sIdx} className="py-3 px-1 text-center">
                              <span className={`inline-block w-full py-1 rounded text-[10px] font-bold ${
                                slot.state === 'libre' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                                slot.state === 'en_servicio' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                                'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              }`}>
                                {slot.state === 'libre' ? 'Libre' : slot.state === 'en_servicio' ? 'En Servicio' : 'Descanso'}
                              </span>
                            </td>
                          ))
                        ) : (
                          timelineHours.map((hr, hIdx) => (
                            <td key={hIdx} className="py-3 px-1 text-center">
                              <span className="inline-block w-full py-1 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                Libre
                              </span>
                            </td>
                          ))
                        )}

                        <td className="py-3 px-3 text-right">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            spec.status === 'disponible' ? 'bg-emerald-500/20 text-emerald-400' :
                            spec.status === 'ocupado' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-amber-500/20 text-amber-400'
                          }`}>
                            {spec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Row: IA Mutation Promo & Stock Alarms (From Image 1) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* IA Mutation Flyer Banner (Image 1 Right Box) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 shadow-xl space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">Ajustes de Mutación & Flyers con IA</h3>
                    <p className="text-[11px] text-slate-400">Recomendaciones dinámicas de ocupación</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                    <Sparkles className="w-4 h-4" /> DETECTADA BAJA OCUPACIÓN: Lanzar Promo Martes 11:00 AM
                  </div>
                  <p className="text-xs text-slate-300">
                    El algoritmo de Elevate Node sugiere mutar el banner principal de la App B2C a "Corte + Barba 20% OFF" durante las horas valle.
                  </p>
                  <button
                    onClick={() => setPromoApproved(!promoApproved)}
                    className={`w-full py-2.5 mt-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                      promoApproved 
                        ? 'bg-emerald-600 text-white font-bold' 
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20'
                    }`}
                  >
                    {promoApproved ? '✓ PROMO APROBADA & MUTADA EN APP B2C' : 'APROBAR & MUTAR APP B2C'}
                  </button>
                </div>
              </div>

              {/* Alertas Críticas & Inventario (Image 1 Left Box) */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" /> Inventario & Alertas de Stock
                  </h3>
                  <span className="text-[10px] text-rose-400 font-semibold">2 Alertas Activas</span>
                </div>

                <div className="space-y-2">
                  {stockAlerts.map((alt) => (
                    <div 
                      key={alt.id}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${alt.severity === 'critica' ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'}`}></span>
                        <div>
                          <div className="font-bold text-white">{alt.item}</div>
                          <div className="text-[10px] text-slate-400">{alt.description}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">{alt.currentStock} uds</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* SECTION: ONBOARDING FLOW (From Image 1: 5 Steps) */}
        {activeSection === 'onboarding' && (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-base font-black text-white">Flujo de Onboarding del Socio (SaaS B2B)</h2>
              <p className="text-xs text-slate-400">Proceso guiado de 5 fases para configurar y mutar la app</p>
            </div>

            {/* Stepper bar */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              {[
                { step: 1, title: '1. Registro de Socio', desc: 'Supabase Auth' },
                { step: 2, title: '2. Configuración Local', desc: 'Dirección & CLABE' },
                { step: 3, title: '3. Alta de Personal', desc: 'Barberos & Staff' },
                { step: 4, title: '4. Servicios', desc: 'Precios & Tiempos' },
                { step: 5, title: '5. Lanzamiento', desc: 'Confirmar & Mutar' },
              ].map((s) => (
                <div 
                  key={s.step}
                  onClick={() => setOnboardingStep(s.step)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    onboardingStep === s.step
                      ? 'bg-cyan-950/50 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{s.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-4">
              {onboardingStep === 1 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-white">Paso 1: Registro con Supabase Auth</h4>
                  <p className="text-slate-400">Autenticación OAuth y JWT conectada a la base de datos de Elevate Node.</p>
                  <div className="p-3 bg-slate-900 rounded-lg text-emerald-400 font-mono">✓ Sesión activa de socio (ID: socio_7781)</div>
                </div>
              )}
              {onboardingStep === 2 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white">Paso 2: Datos del Local y Cuenta CLABE</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" readOnly value="Elevate Node: Barbería Urbana" className="bg-slate-900 border border-slate-800 p-2 rounded text-slate-200" />
                    <input type="text" readOnly value="CLABE: 012180001234567890" className="bg-slate-900 border border-slate-800 p-2 rounded text-slate-200 font-mono" />
                  </div>
                </div>
              )}
              {onboardingStep === 3 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-white">Paso 3: Staff de Barberos / Estilistas</h4>
                  <p className="text-slate-400">{specialists.length} especialistas registrados en el sistema.</p>
                </div>
              )}
              {onboardingStep === 4 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-white">Paso 4: Definición de Catálogo de Servicios</h4>
                  <p className="text-slate-400">{services.length} servicios activos con tarifas en MXN.</p>
                </div>
              )}
              {onboardingStep === 5 && (
                <div className="space-y-3 text-center py-4">
                  <h4 className="text-base font-black text-white">Paso 5: Lanzamiento & Mutación B2C</h4>
                  <p className="text-slate-400">Todos los datos están validados y sincronizados con la aplicación de clientes.</p>
                  <button 
                    onClick={() => alert('¡Aplicación B2C mutada exitosamente con la nueva identidad!')}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs shadow-lg shadow-cyan-500/20"
                  >
                    CONFIRMAR & MUTAR APP B2C 🚀
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: STRIPE PAYOUTS */}
        {activeSection === 'stripe' && (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-400" /> Contabilidad & Stripe Payouts
                </h3>
                <p className="text-xs text-slate-400">Depósitos directos y comisiones de plataforma</p>
              </div>
              <button 
                onClick={() => alert('Conectado a Stripe Connect Express')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-white"
              >
                Configurar Stripe Connect
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Gross Revenue</span>
                <div className="text-xl font-bold text-white mt-1">$150.00 MXN</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Comisiones Plataforma</span>
                <div className="text-xl font-bold text-amber-400 mt-1">$10.00 MXN</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Transferencias Bancarias</span>
                <div className="text-xl font-bold text-emerald-400 mt-1">Svetrobed</div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
