import React, { useState } from 'react';
import { PortalSwitcher, PortalMode } from './components/PortalSwitcher';
import { B2CApp } from './apps/b2c/B2CApp';
import { B2BDashboard } from './apps/b2b/B2BDashboard';
import { MutationHub } from './apps/mutation/MutationHub';
import { 
  BUSINESS_TENANTS, 
  INITIAL_SPECIALISTS, 
  INITIAL_SERVICES, 
  INITIAL_METRICS, 
  INITIAL_STOCK_ALERTS 
} from './mock/data';
import { Appointment, DashboardMetrics } from './types';
import { Wifi, Battery, Signal } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPortal, setCurrentPortal] = useState<PortalMode>('b2c');
  const [selectedTenantId, setSelectedTenantId] = useState<string>('urban-barberia');
  const [phoneFrameMode, setPhoneFrameMode] = useState<boolean>(true);
  
  const [specialists] = useState(INITIAL_SPECIALISTS);
  const [services] = useState(INITIAL_SERVICES);
  const [metrics, setMetrics] = useState<DashboardMetrics>(INITIAL_METRICS);
  const [stockAlerts] = useState(INITIAL_STOCK_ALERTS);
  const [, setAppointments] = useState<Appointment[]>([]);

  const currentTenant = BUSINESS_TENANTS.find((t) => t.id === selectedTenantId) || BUSINESS_TENANTS[0];

  const handleBookAppointment = (newApt: Partial<Appointment>) => {
    if (!newApt.id) return;
    setAppointments(prev => [newApt as Appointment, ...prev]);

    // Update real-time revenue metrics
    setMetrics(prev => ({
      ...prev,
      dailyRevenue: +(prev.dailyRevenue + ((newApt.servicePrice || 550) * 0.05)).toFixed(2),
      grossRevenue: +(prev.grossRevenue + (newApt.servicePrice || 550)).toFixed(2)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      {/* Top Demo & Portal Switcher Toolbar */}
      <PortalSwitcher
        currentPortal={currentPortal}
        onSelectPortal={setCurrentPortal}
        selectedTenant={currentTenant}
        allTenants={BUSINESS_TENANTS}
        onSelectTenant={setSelectedTenantId}
        phoneFrameMode={phoneFrameMode}
        onTogglePhoneFrame={() => setPhoneFrameMode(!phoneFrameMode)}
      />

      {/* Dynamic View rendering based on mode */}
      {currentPortal === 'mutation_hub' ? (
        <div className="flex-1 w-full">
          <MutationHub
            onSelectTenant={setSelectedTenantId}
            onNavigateTo={(portal) => setCurrentPortal(portal)}
          />
        </div>
      ) : currentPortal === 'b2b' ? (
        <div className="flex-1 w-full">
          <B2BDashboard
            tenant={currentTenant}
            specialists={specialists}
            services={services}
            metrics={metrics}
            stockAlerts={stockAlerts}
          />
        </div>
      ) : (
        /* B2C View */
        <div className="flex-1 flex items-center justify-center p-0 sm:p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-[calc(100vh-50px)]">
          {phoneFrameMode ? (
            /* Mockup de Teléfono Móvil estilo iPhone (Fiel a la Imagen 4 de referencia) */
            <div className="relative w-full max-w-[400px] h-[850px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-[10px] border-slate-800 ring-1 ring-white/10 flex flex-col overflow-hidden my-4">
              
              {/* Barra superior de estado (Notch / Isla Dinámica & Iconos) */}
              <div className="w-full bg-slate-950 px-6 pt-3 pb-2 flex items-center justify-between text-white text-[11px] font-bold select-none z-40 border-b border-slate-900">
                <span>10:09</span>
                {/* Dynamic Island / Notch */}
                <div className="w-20 h-4 bg-black rounded-full border border-slate-800"></div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Pantalla interactiva interna */}
              <div className="flex-1 overflow-y-auto rounded-b-[38px] scrollbar-none">
                <B2CApp
                  tenant={currentTenant}
                  specialists={specialists}
                  services={services}
                  onBookAppointment={handleBookAppointment}
                  onSwitchTenant={setSelectedTenantId}
                  allTenants={BUSINESS_TENANTS}
                />
              </div>

              {/* Indicador de barra de inicio inferior iOS */}
              <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto my-1 shrink-0"></div>
            </div>
          ) : (
            /* Vista Mobile Responsive Ancho Completo */
            <div className="w-full max-w-md mx-auto">
              <B2CApp
                tenant={currentTenant}
                specialists={specialists}
                services={services}
                onBookAppointment={handleBookAppointment}
                onSwitchTenant={setSelectedTenantId}
                allTenants={BUSINESS_TENANTS}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default App;
