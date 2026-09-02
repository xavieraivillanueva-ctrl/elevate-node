import React, { useState } from 'react'
import { ElevateLogo } from '../components/ElevateLogo'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Building2, Shield } from 'lucide-react'

interface LoginPageProps {
  onLogin: (partner: { name: string; business: string; email: string }) => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({
        name: 'Xavier Villanueva',
        business: 'Urban Barbería',
        email,
      })
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#070E1A] circuit-bg flex flex-col">

      {/* Cyan accent line top */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #00F0FF 0%, #E5A93C 50%, #00F0FF 100%)' }} />

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">

        {/* Logo */}
        <div className="mb-10">
          <ElevateLogo variant="dark" size="lg" showTagline tagline="PANEL DE SOCIOS B2B" />
        </div>

        {/* Card principal */}
        <div className="w-full max-w-md bg-[#0D1B2E] border border-[#1C2F4A] rounded-3xl p-8 shadow-2xl shadow-black/60">

          {/* Badge seguridad */}
          <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 bg-[#111D35] border border-[#1C2F4A] rounded-2xl w-fit mx-auto">
            <Shield className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-xs font-bold text-[#00F0FF] tracking-wider uppercase">Acceso Autorizado de Socio</span>
          </div>

          <div className="text-center mb-7">
            <h1 className="text-2xl font-black text-white leading-tight">
              Panel del Socio
            </h1>
            <p className="text-sm text-[#8CA4C0] mt-1">
              Ingresa tus credenciales de negocio
            </p>
          </div>

          <form onSubmit={handle} className="space-y-4">

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
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-[#8CA4C0] hover:text-white transition">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs text-[#8CA4C0] cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 accent-[#00F0FF]" />
                Mantener sesión activa
              </label>
              <button type="button" className="text-xs text-[#E5A93C] hover:underline font-semibold">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 font-black mt-2
                bg-gradient-to-r from-[#0D1B2E] to-[#111D35] border border-[#00F0FF]
                text-[#00F0FF] uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition
                disabled:opacity-50"
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
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#1C2F4A]" />
            <span className="text-xs text-[#3A4F6A] font-medium">sin cuenta</span>
            <div className="flex-1 h-px bg-[#1C2F4A]" />
          </div>

          {/* Registro nuevo socio */}
          <button
            onClick={() => onLogin({ name: 'Nuevo Socio', business: 'Mi Negocio', email: 'demo@elevatenode.com' })}
            className="w-full py-3 rounded-xl border border-[#E5A93C] bg-transparent text-sm font-bold text-[#E5A93C]
              flex items-center justify-center gap-2 hover:bg-[#E5A93C]/10 transition"
          >
            <Building2 className="w-4 h-4" />
            <span>Registrar mi Negocio</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[#3A4F6A] mt-8 leading-relaxed tracking-wider uppercase">
          ELEVATE NODE | PLATAFORMA TECH PARA BARBERÍAS<br />
          www.elevatenode.com · Solo para Socios Autorizados
        </p>
      </div>

      {/* Cyan accent line bottom */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #00F0FF, transparent)' }} />
    </div>
  )
}
