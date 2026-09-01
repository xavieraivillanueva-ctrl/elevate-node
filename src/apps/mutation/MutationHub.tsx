import React, { useState } from 'react';
import { ElevateLogo, DaryLashesLogo } from '../../components/ElevateLogo';
import { 
  Lock, User, Eye, EyeOff, Sparkles, Check, ArrowRight, 
  Store, Scissors, Heart, Sliders, ToggleLeft, ToggleRight,
  ShieldCheck, RefreshCw
} from 'lucide-react';
import { BusinessTenant } from '../../types';

interface MutationHubProps {
  onSelectTenant: (tenantId: string) => void;
  onNavigateTo: (portal: 'b2c' | 'b2b') => void;
}

export const MutationHub: React.FC<MutationHubProps> = ({
  onSelectTenant,
  onNavigateTo,
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [userId, setUserId] = useState('socio_elevate@barberia.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<'urban-barberia' | 'dary-lashes' | 'estetica-chic'>('dary-lashes');
  const [agentControlManual, setAgentControlManual] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handleChooseBrand = (brand: 'urban-barberia' | 'dary-lashes' | 'estetica-chic') => {
    setSelectedBrand(brand);
    onSelectTenant(brand);
    setActiveStep(3);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 circuit-bg flex flex-col items-center">
      
      {/* Title Header matching Image 5 */}
      <div className="w-full max-w-6xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <ElevateLogo />
          <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
            Flujo de Pantallas de Mutación (B2C / B2B)
          </span>
        </div>

        {/* Step Selector Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
          <button 
            onClick={() => setActiveStep(1)}
            className={`px-3 py-1.5 rounded-xl transition ${activeStep === 1 ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            1. Login Socio
          </button>
          <button 
            onClick={() => setActiveStep(2)}
            className={`px-3 py-1.5 rounded-xl transition ${activeStep === 2 ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            2. El Hub (Negocios)
          </button>
          <button 
            onClick={() => setActiveStep(3)}
            className={`px-3 py-1.5 rounded-xl transition ${activeStep === 3 ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            3. Mutación B2C
          </button>
          <button 
            onClick={() => setActiveStep(4)}
            className={`px-3 py-1.5 rounded-xl transition ${activeStep === 4 ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            4. Mutación B2B
          </button>
        </div>
      </div>

      {/* Grid of 4 Flow Screens matching Image 5 */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* PANTALLA 1: LOGIN DE SOCIO (ELEVATE NODE - PREMIUM CORPORATIVO) */}
        <div className={`p-5 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border transition-all duration-300 flex flex-col justify-between shadow-2xl relative overflow-hidden ${
          activeStep === 1 ? 'border-cyan-400 ring-2 ring-cyan-500/20 scale-[1.02]' : 'border-slate-800 opacity-80 hover:opacity-100'
        }`}>
          {/* Decorative circuit line */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3">1. Login de Socio</div>
            <div className="text-center py-4 space-y-1">
              <ElevateLogo className="justify-center" />
              <p className="text-[10px] text-slate-400">Acceso Corporativo Multimodal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 mt-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 font-semibold mb-1 block">ID de usuario</label>
                <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <input 
                    type="text" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)}
                    className="bg-transparent text-white outline-none w-full text-xs" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-semibold mb-1 block">Contraseña</label>
                <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent text-white outline-none w-full text-xs" 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-white">
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20"
              >
                LOGIN ➔
              </button>

              <div className="text-center pt-2">
                <a href="#reset" className="text-[10px] text-slate-400 hover:text-cyan-400">¿Olvidaste tu contraseña?</a>
              </div>
            </form>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center">
            Supabase Auth & 2FA Integrado
          </div>
        </div>

        {/* PANTALLA 2: SELECCIÓN DEL NEGOCIO (EL HUB) */}
        <div className={`p-5 rounded-3xl bg-slate-900/90 border transition-all duration-300 flex flex-col justify-between shadow-2xl relative ${
          activeStep === 2 ? 'border-cyan-400 ring-2 ring-cyan-500/20 scale-[1.02]' : 'border-slate-800 opacity-80 hover:opacity-100'
        }`}>
          <div>
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">2. Selección del Negocio</div>
            <h3 className="text-xs font-extrabold text-white mb-3">El Hub Multimodal (B2C Cliente)</h3>

            <div className="space-y-3 text-xs">
              {/* Option 1: Barbería Urbana */}
              <div 
                onClick={() => handleChooseBrand('urban-barberia')}
                className={`p-3 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                  selectedBrand === 'urban-barberia' 
                    ? 'border-cyan-400 bg-cyan-950/40 text-white' 
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-sm shrink-0">
                  💈
                </div>
                <div>
                  <div className="font-bold text-white text-xs">Barbería Urbana</div>
                  <div className="text-[10px] text-cyan-400">Plataforma Tech Grooming</div>
                </div>
              </div>

              {/* Option 2: Estética Chic */}
              <div 
                onClick={() => handleChooseBrand('estetica-chic')}
                className={`p-3 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                  selectedBrand === 'estetica-chic' 
                    ? 'border-purple-400 bg-purple-950/40 text-white' 
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 font-bold text-sm shrink-0">
                  ✨
                </div>
                <div>
                  <div className="font-bold text-white text-xs font-serif">Estética Chic</div>
                  <div className="text-[10px] text-purple-400">Salón Integral de Belleza</div>
                </div>
              </div>

              {/* Option 3: Dary Lashes (Highlight with hand click icon matching Image 5) */}
              <div 
                onClick={() => handleChooseBrand('dary-lashes')}
                className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between relative group ${
                  selectedBrand === 'dary-lashes' 
                    ? 'border-pink-400 bg-pink-950/40 text-white shadow-lg shadow-pink-500/20' 
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-pink-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 font-bold text-sm shrink-0">
                    💖
                  </div>
                  <div>
                    <div className="font-bold text-pink-300 text-xs italic font-serif">Dary Lashes</div>
                    <div className="text-[10px] text-pink-400">Pestañas & Uñas Glamour</div>
                  </div>
                </div>

                {/* Simulated Hand Click Icon */}
                <div className="w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs animate-bounce shadow-md">
                  👆
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button 
              onClick={() => setActiveStep(3)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl transition text-slate-200"
            >
              Ver Mutación en Pantalla 3 ➔
            </button>
          </div>
        </div>

        {/* PANTALLA 3: MUTACIÓN DE PÁGINA B2C (DARY LASHES - CLIENTE) */}
        <div className={`p-5 rounded-3xl bg-slate-950 border transition-all duration-300 flex flex-col justify-between shadow-2xl relative ${
          activeStep === 3 ? 'border-pink-400 ring-2 ring-pink-500/20 scale-[1.02]' : 'border-slate-800 opacity-80 hover:opacity-100'
        }`}>
          <div>
            <div className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1">3. Mutación B2C</div>
            <h3 className="text-xs font-extrabold text-white mb-2">Dary Lashes (Vista Cliente)</h3>

            {/* Simulated Mobile Card */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-pink-500/40 space-y-2.5 shadow-lg">
              <DaryLashesLogo className="h-9" />

              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] space-y-1">
                <div className="text-slate-400 font-bold">Información del Negocio</div>
                <div className="text-slate-300">Calle 50, Centro, CDMX</div>
                <div className="text-emerald-400">Abierto Hoy: 10:00 - 20:00</div>
              </div>

              <div className="space-y-1 text-[10px]">
                <div className="text-slate-400 font-bold">Nuestros Servicios</div>
                <div className="flex justify-between p-1.5 rounded-lg bg-slate-950 border border-slate-800/80 text-white">
                  <span>Extensiones Clásicas 1x1</span>
                  <span className="text-pink-400 font-bold">$650 MXN</span>
                </div>
                <div className="flex justify-between p-1.5 rounded-lg bg-slate-950 border border-slate-800/80 text-white">
                  <span>Manicura Gelish Ruso</span>
                  <span className="text-pink-400 font-bold">$350 MXN</span>
                </div>
              </div>

              <button
                onClick={() => { onSelectTenant('dary-lashes'); onNavigateTo('b2c'); }}
                className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider transition shadow-md shadow-pink-500/30"
              >
                ✨ AGENDAR CITA DARY 💖
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button 
              onClick={() => setActiveStep(4)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl transition text-slate-200"
            >
              Ver Mutación B2B en Pantalla 4 ➔
            </button>
          </div>
        </div>

        {/* PANTALLA 4: MUTACIÓN DE PANEL B2B (DARY LASHES - SOCIO/GESTIÓN) */}
        <div className={`p-5 rounded-3xl bg-slate-900/90 border transition-all duration-300 flex flex-col justify-between shadow-2xl relative ${
          activeStep === 4 ? 'border-amber-400 ring-2 ring-amber-500/20 scale-[1.02]' : 'border-slate-800 opacity-80 hover:opacity-100'
        }`}>
          <div>
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">4. Mutación de Panel B2B</div>
            <h3 className="text-xs font-extrabold text-white mb-2">Dary Lashes (Socio / Gestión)</h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Información de Negocio</span>
                  <span className="text-xs font-bold text-white">Dary Lashes Studio</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-semibold cursor-pointer">Editable ✎</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Promociones y Flyers</span>
                  <span className="text-xs font-bold text-pink-300">15% OFF Pestañas</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-semibold cursor-pointer">Editable ✎</span>
              </div>

              {/* Toggle: CONTROL MANUAL AGENTE (ON / OFF) matching Image 5 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Citas y Clientes</span>
                  <span className="text-xs font-bold text-white">CONTROL MANUAL AGENTE</span>
                </div>
                <button
                  onClick={() => setAgentControlManual(!agentControlManual)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition ${
                    agentControlManual ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                  }`}
                >
                  {agentControlManual ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => { onSelectTenant('dary-lashes'); onNavigateTo('b2b'); }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
            >
              Abrir Cockpit B2B Completo ➔
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
