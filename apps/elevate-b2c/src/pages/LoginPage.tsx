import React, { useState } from 'react'
import { ElevateLogo } from '../components/ElevateLogo'
import { Eye, EyeOff, Lock, Mail, Sparkles, ArrowRight, User } from 'lucide-react'

interface LoginPageProps {
  onLogin: (user: { name: string; email: string }) => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ name: name || email.split('@')[0], email })
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] circuit-bg flex flex-col">

      {/* Header */}
      <header className="px-6 py-5">
        <ElevateLogo variant="light" size="md" showTagline tagline="PLATAFORMA MULTIMODAL" />
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-[#0A1628]/10 border border-[#E2E6EC] p-8">

            {/* Title */}
            <div className="text-center mb-7">
              <h1 className="text-2xl font-black text-[#0A1628] leading-tight">
                {isRegister ? 'Crear Cuenta' : 'Bienvenido'}
              </h1>
              <p className="text-sm text-[#6B7B8F] mt-1">
                {isRegister
                  ? 'Regístrate gratis en Elevate Node'
                  : 'Inicia sesión para agendar tu cita'}
              </p>
            </div>

            <form onSubmit={handle} className="space-y-4">

              {/* Name (register only) */}
              {isRegister && (
                <div>
                  <label className="text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-1.5 block">
                    Nombre completo
                  </label>
                  <div className="flex items-center gap-2.5 bg-[#F0F2F5] border border-[#E2E6EC] rounded-xl px-3.5 py-3 focus-within:border-[#0A1628] transition">
                    <User className="w-4 h-4 text-[#6B7B8F] shrink-0" />
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="bg-transparent text-sm text-[#0A1628] outline-none w-full placeholder:text-[#A0ADB8]"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-1.5 block">
                  Correo electrónico
                </label>
                <div className="flex items-center gap-2.5 bg-[#F0F2F5] border border-[#E2E6EC] rounded-xl px-3.5 py-3 focus-within:border-[#0A1628] transition">
                  <Mail className="w-4 h-4 text-[#6B7B8F] shrink-0" />
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="bg-transparent text-sm text-[#0A1628] outline-none w-full placeholder:text-[#A0ADB8]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-1.5 block">
                  Contraseña
                </label>
                <div className="flex items-center gap-2.5 bg-[#F0F2F5] border border-[#E2E6EC] rounded-xl px-3.5 py-3 focus-within:border-[#0A1628] transition">
                  <Lock className="w-4 h-4 text-[#6B7B8F] shrink-0" />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="bg-transparent text-sm text-[#0A1628] outline-none w-full placeholder:text-[#A0ADB8]"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-[#6B7B8F] hover:text-[#0A1628] transition">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              {!isRegister && (
                <div className="text-right">
                  <button type="button" className="text-xs text-[#D4A017] hover:underline font-semibold">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-cta w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isRegister ? 'Crear mi cuenta' : 'Iniciar sesión'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E2E6EC]" />
              <span className="text-xs text-[#A0ADB8] font-medium">o continúa con</span>
              <div className="flex-1 h-px bg-[#E2E6EC]" />
            </div>

            {/* Google */}
            <button
              onClick={() => onLogin({ name: 'Usuario Google', email: 'user@gmail.com' })}
              className="w-full py-3 rounded-xl border border-[#E2E6EC] bg-white hover:bg-[#F8F9FB] text-sm font-semibold text-[#0A1628] flex items-center justify-center gap-2.5 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar con Google</span>
            </button>

            {/* Toggle */}
            <p className="text-center text-xs text-[#6B7B8F] mt-5">
              {isRegister ? '¿Ya tienes cuenta?' : '¿Eres nuevo en Elevate Node?'}{' '}
              <button onClick={() => setIsRegister(!isRegister)} className="text-[#D4A017] font-bold hover:underline">
                {isRegister ? 'Iniciar sesión' : 'Crear cuenta gratis'}
              </button>
            </p>
          </div>

          {/* Footer note */}
          <p className="text-center text-[10px] text-[#A0ADB8] mt-6 leading-relaxed">
            Al continuar aceptas los Términos de Servicio y la<br />
            Política de Privacidad de Elevate Node.
          </p>
        </div>
      </main>
    </div>
  )
}
