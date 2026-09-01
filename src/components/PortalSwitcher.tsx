import React from 'react';
import { Smartphone, LayoutDashboard, Shuffle, Monitor, Layers } from 'lucide-react';
import { ElevateLogo } from './ElevateLogo';
import { BusinessTenant } from '../types';

export type PortalMode = 'b2c' | 'b2b' | 'mutation_hub';

interface PortalSwitcherProps {
  currentPortal: PortalMode;
  onSelectPortal: (portal: PortalMode) => void;
  selectedTenant: BusinessTenant;
  allTenants: BusinessTenant[];
  onSelectTenant: (tenantId: string) => void;
  phoneFrameMode: boolean;
  onTogglePhoneFrame: () => void;
}

export const PortalSwitcher: React.FC<PortalSwitcherProps> = ({
  currentPortal,
  onSelectPortal,
  selectedTenant,
  allTenants,
  onSelectTenant,
  phoneFrameMode,
  onTogglePhoneFrame,
}) => {
  return (
    <div className="bg-slate-950/95 border-b border-cyan-500/30 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-50 sticky top-0 backdrop-blur-xl shadow-2xl">
      
      {/* Brand & Portal Selector */}
      <div className="flex items-center gap-3 sm:gap-4">
        <ElevateLogo className="h-6" variant="icon-only" />

        {/* Portal Switcher Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => onSelectPortal('b2c')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black uppercase text-[11px] transition ${
              currentPortal === 'b2c'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>1. App B2C (Cliente)</span>
          </button>

          <button
            onClick={() => onSelectPortal('b2b')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black uppercase text-[11px] transition ${
              currentPortal === 'b2b'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>2. Cockpit B2B (Socio)</span>
          </button>

          <button
            onClick={() => onSelectPortal('mutation_hub')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black uppercase text-[11px] transition ${
              currentPortal === 'mutation_hub'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Flujo Mutación (Hub)</span>
          </button>
        </div>
      </div>

      {/* Mutation & Device Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Brand Mutation Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-2xl border border-slate-800 text-xs">
          <Shuffle className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400 hidden lg:inline font-bold">Mutar:</span>
          <select
            value={selectedTenant.id}
            onChange={(e) => onSelectTenant(e.target.value)}
            aria-label="Mutar negocio activo"
            className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
          >
            {allTenants.map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                {t.type === 'barberia' ? '💈 ' : t.type === 'lashes' ? '💅 ' : '✨ '}{t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Smartphone Frame Toggle (for B2C) */}
        {currentPortal === 'b2c' && (
          <button
            onClick={onTogglePhoneFrame}
            title="Alternar marco de teléfono móvil"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition ${
              phoneFrameMode 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{phoneFrameMode ? 'Marco iPhone ON' : 'Ancho Completo'}</span>
          </button>
        )}

      </div>

    </div>
  );
};
