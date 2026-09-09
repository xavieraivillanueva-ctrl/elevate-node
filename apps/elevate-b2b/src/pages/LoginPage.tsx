import React, { useState } from 'react'
import { ElevateLogo } from '../components/ElevateLogo'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Building2, Shield, Sparkles, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface LoginPageProps {
  onLogin: (
    partner: { name: string; business: string; email: string },
    targetSection?: 'cockpit' | 'escaparate' | 'servicios' | 'staff' | 'contabilidad' | 'inventario' | 'ajustes'
  ) => void
}

type AuthMode = 'login' | 'register'

interface BusinessTypeOption {
  id: string
  label: string
  icon: string
  description: string
}

const BUSINESS_TYPES: BusinessTypeOption[] = [
  { id: 'barberia', label: 'Barbería', icon: '💈', description: 'Cortes, barba y grooming' },
  { id: 'nails',    label: 'Salón de Uñas', icon: '💅', description: 'Manicure, gelish y acrílico' },
  { id: 'spa',      label: 'Spa & Wellness', icon: '🌿', description: 'Masajes y relajación' },
  { id: 'estetica', label: 'Clínica / Estética', icon: '✨', description: 'Tratamientos y faciales' },
  { id: 'salon',    label: 'Salón / Peluquería', icon: '✂️', description: 'Colorimetría y peinado' },
  { id: 'lashes',   label: 'Pestañas & Cejas', icon: '👁️', description: 'Extensiones y lifting' },
]

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login')
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('barberia')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else if (data?.user) {
      onLogin({
        name: data.user.email?.split('@')[0] || 'Socio',
        business: 'Mi Negocio',
        email: data.user.email || email,
      })
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    if (!businessName.trim()) {
      setErrorMsg('Por favor ingresa el nombre de tu negocio.')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            business_name: businessName.trim(),
            business_type: businessType,
          },
        },
      })
      
      if (error) {
        setErrorMsg(error.message)
        setLoading(false)
      } else {
        // Redirección inmediata a la ventana de Storefront Studio (Escaparate B2C)
        onLogin(
          {
            name: businessName.trim(),
            business: businessName.trim(),
            email: data?.user?.email || email,
          },
          'escaparate'
        )
      }
    } catch (err: any) {
      // Si ocurre cualquier contingencia, permitir acceso inmediato a escaparate
      onLogin(
        {
          name: businessName.trim(),
          business: businessName.trim(),
          email,
        },
        'escaparate'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070E1A] circuit-bg flex flex-col">

      {/* Cyan accent line top */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #00F0FF 0%, #E5A93C 50%, #00F0FF 100%)' }} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">

        {/* Logo */}
        <div className="mb-8 text-center">
          <ElevateLogo variant="dark" size="lg" showTagline tagline="PLATAFORMA B2B DE GESTIÓN PARA NEGOCIOS DE BELLEZA" />
        </div>

        {/* Card principal */}
        <div className="w-full max-w-lg bg-[#0D1B2E] border border-[#1C2F4A] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/70">

          {/* Selector de Pestañas: Iniciar Sesión vs Registro */}
          <div className="flex bg-[#111D35] p-1 rounded-2xl border border-[#1C2F4A] mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg('') }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#00F0FF] text-[#070E1A] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-[#8CA4C0] hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg('') }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#E5A93C] text-[#070E1A] shadow-[0_0_15px_rgba(229,169,60,0.4)]'
                  : 'text-[#8CA4C0] hover:text-white'
              }`}
            >
              Registrar Negocio
            </button>
          </div>

          {/* Badge seguridad */}
          <div className="flex items-center justify-center gap-2 mb-4 py-1.5 px-3.5 bg-[#111D35]/80 border border-[#1C2F4A] rounded-2xl w-fit mx-auto">
            <Shield className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[11px] font-bold text-[#00F0FF] tracking-wider uppercase">
              {mode === 'login' ? 'Acceso Autorizado de Socio' : 'Onboarding Express de Negocio'}
            </span>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-white leading-tight">
              {mode === 'login' ? 'Panel del Socio' : 'Comienza a Crecer con Elevate'}
            </h1>
            <p className="text-xs text-[#8CA4C0] mt-1">
              {mode === 'login'
                ? 'Ingresa tus credenciales de negocio para acceder al Cockpit'
                : 'Configura tu cuenta comercial en menos de un minuto'}
            </p>
          </div>

          {successMsg && (
            <div className="mb-4 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl p-3 text-center">
              {errorMsg}
            </div>
          )}

          {/* ────────────────── MODO INICIAR SESIÓN ────────────────── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider mb-1.5 block">
                  Correo del Negocio
                </label>
                <div className="flex items-center gap-2.5 bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3.5 py-3 focus-within:border-[#00F0FF] transition">
                  <Mail className="w-4 h-4 text-[#8CA4C0] shrink-0" />
                  <input
                    type="email"
                    placeholder="socio@negocio.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="bg-transparent text-sm text-white outline-none w-full placeholder:text-[#3A4F6A]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider mb-1.5 block">
                  Contraseña
                </label>
                <div className="flex items-center gap-2.5 bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3.5 py-3 focus-within:border-[#00F0FF] transition">
                  <Lock className="w-4 h-4 text-[#8CA4C0] shrink-0" />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="bg-transparent text-sm text-white outline-none w-full placeholder:text-[#3A4F6A]"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-[#8CA4C0] hover:text-white transition cursor-pointer">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-2 text-[#8CA4C0] cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#00F0FF] rounded" defaultChecked />
                  Mantener sesión activa
                </label>
                <button type="button" className="text-[#E5A93C] hover:underline font-semibold cursor-pointer">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 font-black mt-3
                  bg-gradient-to-r from-[#0D1B2E] to-[#111D35] border border-[#00F0FF]
                  text-[#00F0FF] uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition
                  disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Acceder al Cockpit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onLogin({ name: 'Xavier Villanueva', business: 'Urban Barbería', email: 'socio@elevatenode.com' })}
                  className="w-full py-2.5 rounded-xl border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-xs font-bold text-[#00F0FF] flex items-center justify-center gap-2 hover:bg-[#00F0FF]/15 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Acceso Demo Directo al Cockpit</span>
                </button>
              </div>
            </form>
          )}

          {/* ────────────────── MODO REGISTRAR NEGOCIO (FASE 1) ────────────────── */}
          {mode === 'register' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Nombre del Negocio */}
              <div>
                <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider mb-1.5 block">
                  Nombre Comercial del Negocio
                </label>
                <div className="flex items-center gap-2.5 bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3.5 py-3 focus-within:border-[#E5A93C] transition">
                  <Building2 className="w-4 h-4 text-[#8CA4C0] shrink-0" />
                  <input
                    type="text"
                    placeholder="ej. Barbería Vintage Studio"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    required
                    className="bg-transparent text-sm text-white outline-none w-full placeholder:text-[#3A4F6A]"
                  />
                </div>
              </div>

              {/* Selector Visual de Giro del Negocio */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider">
                    Giro del Negocio
                  </label>
                  <span className="text-[10px] text-[#00F0FF] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Adaptación instantánea
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {BUSINESS_TYPES.map(bt => {
                    const isSelected = businessType === bt.id
                    return (
                      <button
                        key={bt.id}
                        type="button"
                        onClick={() => setBusinessType(bt.id)}
                        className={`p-3 rounded-2xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#111D35] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)] ring-1 ring-[#00F0FF]'
                            : 'bg-[#111D35]/40 border-[#1C2F4A] hover:border-[#8CA4C0]/40 text-[#8CA4C0]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-2xl mb-1">{bt.icon}</span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-[#00F0FF] text-[#070E1A] flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#8CA4C0]'}`}>
                            {bt.label}
                          </p>
                          <p className="text-[10px] text-[#4F688A] leading-tight mt-0.5">
                            {bt.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Correo */}
              <div>
                <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider mb-1.5 block">
                  Correo Electrónico de Contacto
                </label>
                <div className="flex items-center gap-2.5 bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3.5 py-3 focus-within:border-[#E5A93C] transition">
                  <Mail className="w-4 h-4 text-[#8CA4C0] shrink-0" />
                  <input
                    type="email"
                    placeholder="contacto@tunegocio.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="bg-transparent text-sm text-white outline-none w-full placeholder:text-[#3A4F6A]"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider mb-1.5 block">
                  Crea una Contraseña Segura
                </label>
                <div className="flex items-center gap-2.5 bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3.5 py-3 focus-within:border-[#E5A93C] transition">
                  <Lock className="w-4 h-4 text-[#8CA4C0] shrink-0" />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-transparent text-sm text-white outline-none w-full placeholder:text-[#3A4F6A]"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-[#8CA4C0] hover:text-white transition cursor-pointer">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !businessName || !email || !password}
                className="w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 font-black mt-3
                  bg-gradient-to-r from-[#E5A93C] to-[#D4A017] text-[#070E1A] uppercase tracking-wider
                  hover:shadow-[0_0_20px_rgba(229,169,60,0.5)] transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-[#070E1A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Building2 className="w-4 h-4" />
                    <span>Registrar mi Negocio</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[#3A4F6A] mt-8 leading-relaxed tracking-wider uppercase">
          ELEVATE NODE | INFRAESTRUCTURA TECH MULTI-TENANT PARA NEGOCIOS DE BELLEZA<br />
          www.elevatenode.com · Solo para Socios Autorizados
        </p>
      </div>

      {/* Cyan accent line bottom */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #00F0FF, transparent)' }} />
    </div>
  )
}
