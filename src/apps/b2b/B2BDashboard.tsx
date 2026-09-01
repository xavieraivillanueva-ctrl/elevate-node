import React, { useState } from 'react';
import { 
  BarChart3, Users, DollarSign, AlertTriangle, ShieldAlert, 
  Sparkles, RefreshCw, CheckCircle2, ChevronRight, Power, 
  Sliders, Plus, Store, Scissors, ArrowUpRight, TrendingUp,
  Clock, Package, CreditCard, Bell, Monitor, Check, Eye
} from 'lucide-react';
import { ElevateLogo } from '../../components/ElevateLogo';
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
  const [showMonitorFrame, setShowMonitorFrame] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState<number>(5);

  const timelineHours = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '3:00 PM'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col circuit-bg pb-12">
      
      {/* 1. Header B2B Cockpit (Image 1 Header) */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 py-4 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ElevateLogo />
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white uppercase">
              ARQUITECTURA DE FLUJO DE PANTALLAS SaaS B2B - ELEVATE NODE: {tenant.name.split(':')[0]}
            </h1>
            <p className="text-[11px] text-cyan-400 font-semibold tracking-wider uppercase">
              Panel Operativo del Socio • Supabase Cloud & Vercel
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMonitorFrame(!showMonitorFrame)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold border border-slate-700 transition"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{showMonitorFrame ? 'Modo Monitor ON' : 'Vista Completa'}</span>
          </button>

          {/* KILL SWITCH BOT BUTTON (From Image 1 Bottom-Right) */}
          <button
            onClick={() => setKillSwitchActive(!killSwitchActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md ${
              killSwitchActive 
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 animate-pulse' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black shadow-emerald-500/20'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>KILL SWITCH BOT: {killSwitchActive ? 'OFF (DETENIDO)' : 'ON (ACTIVO)'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-6 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* 2. FLUJO DE ONBOARDING DEL SOCIO (5 Pantallas exactas de la Imagen 1) */}
        <section className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Proceso de Activación</span>
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                FLUJO DE ONBOARDING [cite: 3]
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">5 Fases de Configuración</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            
            {/* 1. Registro de Socio (Supabase Auth) */}
            <div 
              onClick={() => setOnboardingStep(1)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                onboardingStep === 1 ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-lg' : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-black text-cyan-400 block mb-1">1. REGISTRO DE SOCIO</span>
                <h4 className="font-bold text-white text-xs">(SUPABASE AUTH)</h4>
                <div className="mt-3 p-2 bg-slate-900 rounded-lg space-y-1 text-[10px]">
                  <div className="text-slate-300">Google / Custom OAuth</div>
                  <div className="text-emerald-400 font-bold">✓ Conectado</div>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 mt-2">[cite: 3]</span>
            </div>

            {/* 2. Configuración del Local & CLABE */}
            <div 
              onClick={() => setOnboardingStep(2)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                onboardingStep === 2 ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-lg' : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-black text-cyan-400 block mb-1">2. CONFIGURACIÓN</span>
                <h4 className="font-bold text-white text-xs">DEL LOCAL & CLABE</h4>
                <div className="mt-3 p-2 bg-slate-900 rounded-lg space-y-1 text-[10px]">
                  <div className="text-slate-300">Calle 50, Centro, CDMX</div>
                  <div className="text-amber-400 font-mono">CLABE: 01218000123...</div>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 mt-2">[cite: 3]</span>
            </div>

            {/* 3. Alta de Personal (Barberos) */}
            <div 
              onClick={() => setOnboardingStep(3)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                onboardingStep === 3 ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-lg' : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-black text-cyan-400 block mb-1">3. ALTA DE PERSONAL</span>
                <h4 className="font-bold text-white text-xs">(BARBEROS)</h4>
                <div className="mt-3 p-2 bg-slate-900 rounded-lg space-y-1 text-[10px]">
                  <div className="text-slate-300">Añadir Barbero Modal</div>
                  <div className="text-cyan-400">{specialists.length} Miembros Activos</div>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 mt-2">[cite: 3]</span>
            </div>

            {/* 4. Definición de Servicios */}
            <div 
              onClick={() => setOnboardingStep(4)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                onboardingStep === 4 ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-lg' : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-black text-cyan-400 block mb-1">4. DEFINICIÓN</span>
                <h4 className="font-bold text-white text-xs">DE SERVICIOS</h4>
                <div className="mt-3 p-2 bg-slate-900 rounded-lg space-y-1 text-[10px]">
                  <div className="text-slate-300">Tarifas & Tiempos (min)</div>
                  <div className="text-cyan-400">{services.length} Servicios en catálogo</div>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 mt-2">[cite: 3]</span>
            </div>

            {/* 5. Lanzamiento & Mutación (Exact Highlight from Image 1) */}
            <div 
              onClick={() => setOnboardingStep(5)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                onboardingStep === 5 ? 'border-amber-400 bg-gradient-to-br from-cyan-950/60 via-slate-900 to-amber-950/40 text-white shadow-xl shadow-amber-500/20' : 'border-slate-800 bg-slate-950/70 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-black text-amber-400 block mb-1">5. LANZAMIENTO</span>
                <h4 className="font-bold text-white text-xs">& MUTACIÓN</h4>
                <div className="mt-3 p-2 bg-slate-900/90 border border-amber-500/40 rounded-lg text-center">
                  <span className="text-[10px] font-black text-amber-300 uppercase">
                    CONFIRMAR & MUTAR APP B2C 👆
                  </span>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 mt-2">[cite: 3]</span>
            </div>

          </div>
        </section>

        {/* 3. COCKPIT DE OPERACIÓN REAL-TIME (Centro de la Imagen 1 en Monitor) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> COCKPIT DE OPERACIÓN REAL-TIME [cite: 2]
            </h2>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sincronización en Vivo
            </span>
          </div>

          {/* Desktop Monitor Frame Presentation (Matching Image 1) */}
          <div className={showMonitorFrame ? "p-4 sm:p-8 bg-slate-900/40 border border-slate-800 rounded-3xl" : ""}>
            <div className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5 ${showMonitorFrame ? "border-t-[8px] border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)]" : ""}`}>
              
              {/* Cockpit Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-black text-white">Barberos Disponibilidad</div>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
                    Timeline 2
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Día's Revenue</span>
                    <span className="text-xl font-black text-amber-400">${metrics.dailyRevenue} USD</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Estatus de Puestos</span>
                    <span className="text-xs font-bold text-white">Carlos, Luis, Luis <span className="text-cyan-400 font-mono">001</span></span>
                  </div>
                </div>
              </div>

              {/* Timeline Matrix Grid (Matching Image 1) */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3 font-bold w-44">Barbero</th>
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
                              <div className="font-bold text-white text-xs">{spec.name}</div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{spec.role.split('/')[0]}</div>
                            </div>
                          </div>
                        </td>

                        {/* Timeline slots matching Cyan, Red, Amber blocks */}
                        {spec.scheduleTimeline ? (
                          spec.scheduleTimeline.map((slot, sIdx) => (
                            <td key={sIdx} className="py-3 px-1 text-center">
                              <span className={`inline-block w-full py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                slot.state === 'libre' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' :
                                slot.state === 'en_servicio' ? 'bg-rose-600/30 text-rose-300 border border-rose-600/50 shadow-sm' :
                                'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              }`}>
                                {slot.state === 'libre' ? 'Disponible' : slot.state === 'en_servicio' ? 'En Cita' : 'Descanso'}
                              </span>
                            </td>
                          ))
                        ) : (
                          timelineHours.map((hr, hIdx) => (
                            <td key={hIdx} className="py-3 px-1 text-center">
                              <span className="inline-block w-full py-1.5 rounded-lg text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                Disponible
                              </span>
                            </td>
                          ))
                        )}

                        <td className="py-3 px-3 text-right">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                            spec.status === 'disponible' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            spec.status === 'ocupado' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/40'
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

            {/* Monitor Stand Base (Realistic hardware representation from Image 1) */}
            {showMonitorFrame && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-6 bg-slate-700 border-x border-slate-600 shadow-inner"></div>
                <div className="w-48 h-3 bg-slate-600 rounded-b-xl border border-slate-500 shadow-2xl"></div>
              </div>
            )}
          </div>
        </section>

        {/* 4. BLOQUES INFERIORES: CONTABILIDAD, INVENTARIO, IA FLYERS, STAFF & KILL SWITCH */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* BLOQUE 1: CONTABILIDAD & STRIPE PAYOUTS [cite: 2] */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Finanzas B2B [cite: 2]</span>
              <h3 className="text-xs font-black text-white uppercase tracking-wider mt-0.5">
                CONTABILIDAD & STRIPE
              </h3>

              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Gross Revenue:</span>
                  <span className="font-bold text-white">$150 MXN</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Comisiones:</span>
                  <span className="font-bold text-amber-400">$10.00</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Tips:</span>
                  <span className="font-bold text-slate-300">$0.00</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Transferencias:</span>
                  <span className="font-bold text-emerald-400">Svetrobed</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert('Stripe Payouts en proceso a tu CLABE interbancaria')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl transition text-slate-200"
            >
              Ver Detalle Contabilidad ➔
            </button>
          </div>

          {/* BLOQUE 2: INVENTARIO & ALERTAS DE STOCK [cite: 2] */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Insumos [cite: 2]</span>
              <h3 className="text-xs font-black text-white uppercase tracking-wider mt-0.5">
                INVENTARIO & ALERTAS DE STOCK
              </h3>

              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/40 flex items-center justify-between">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    ⚠️ Navajas, pomadas
                  </span>
                  <span className="text-rose-400 text-[10px] font-bold">Crítica &gt;</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    ◻ Compras sugeridas
                  </span>
                  <span className="text-amber-400 text-[10px] font-bold">Soporte &gt;</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Toallas descartables</span>
                  <span className="text-slate-400 text-[10px] font-mono">80 uds</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert('Orden de compra automática generada')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl transition text-slate-200"
            >
              Gestionar Inventario ➔
            </button>
          </div>

          {/* BLOQUE 3: AJUSTES DE MUTACIÓN & FLYERS CON IA [cite: 1, 2] */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-500/40 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-black">AI</span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Motor de Inteligencia [cite: 1, 2]</span>
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                AJUSTES DE MUTACIÓN & FLYERS
              </h3>

              <div className="mt-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
                <div className="text-amber-400 font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  DETECTADA BAJA OCUPACIÓN: Lanzar Promo Martes 11:00 AM
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Lanza un flyer dinámico en la App B2C para llenar los puestos vacíos del turno matutino.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setPromoApproved(!promoApproved)}
              className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                promoApproved 
                  ? 'bg-emerald-600 text-white font-bold' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              }`}
            >
              {promoApproved ? '✓ FLYER APROBADO & MUTADO' : 'APROBAR & MUTAR APP B2C 🚀'}
            </button>
          </div>

          {/* BLOQUE 4: GESTIÓN STAFF & RENDIMIENTO + KILL SWITCH [cite: 2] */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Productividad [cite: 2]</span>
              <h3 className="text-xs font-black text-white uppercase tracking-wider mt-0.5">
                GESTIÓN STAFF & RENDIMIENTO
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Rate Retención</span>
                  <span className="text-lg font-black text-cyan-400">58.9%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Duración Promedio</span>
                  <span className="text-lg font-black text-amber-400">50.0h</span>
                </div>
              </div>

              {/* Photos row */}
              <div className="flex justify-center -space-x-2 pt-3">
                {specialists.slice(0, 4).map((s) => (
                  <img 
                    key={s.id} 
                    src={s.avatarUrl} 
                    alt={s.name} 
                    className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" 
                  />
                ))}
              </div>
            </div>

            {/* SEGURIDAD & KILL SWITCH (Exact matching Image 1) */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-rose-500/40 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider block">Seguridad</span>
                <span className="text-xs font-black text-white">KILL SWITCH BOT</span>
              </div>
              <button
                onClick={() => setKillSwitchActive(!killSwitchActive)}
                className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  killSwitchActive ? 'bg-rose-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  killSwitchActive ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};
