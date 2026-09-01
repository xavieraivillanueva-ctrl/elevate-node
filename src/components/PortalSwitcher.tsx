import React from 'react';
import { Smartphone, LayoutDashboard, Shuffle, Monitor } from 'lucide-react';
import { BusinessTenant } from '../types';

interface PortalSwitcherProps {
  currentPortal: 'b2c' | 'b2b';
  onSelectPortal: (portal: 'b2c' | 'b2b') => void;
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
    <div className="bg-slate-900 border-b border-cyan-500/30 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-50 sticky top-0 shadow-lg shadow-black/40">
      
      {/* Brand & Portal Selector */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 font-black tracking-wider text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          ELEVATE NODE
        </div>

        {/* Portal Switcher Buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onSelectPortal('b2c')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
              currentPortal === 'b2c'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App B2C (Cliente)</span>
          </button>
          <button
            onClick={() => onSelectPortal('b2b')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
              currentPortal === 'b2b'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard B2B (Socio)</span>
          </button>
        </div>
      </div>

      {/* Mutation & Device Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Business Mutation Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800">
          <Shuffle className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400 hidden md:inline">Mutar Negocio:</span>
          <select
            value={selectedTenant.id}
            onChange={(e) => onSelectTenant(e.target.value)}
            aria-label="Mutar negocio"
            className="bg-transparent text-white font-semibold outline-none cursor-pointer text-xs"
          >
            {allTenants.map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Frame Toggle (for B2C view) */}
        {currentPortal === 'b2c' && (
          <button
            onClick={onTogglePhoneFrame}
            title="Alternar marco de smartphone"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
              phoneFrameMode 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{phoneFrameMode ? 'Marco Móvil ON' : 'Ancho Completo'}</span>
          </button>
        )}
      </div>

    </div>
  );
};
