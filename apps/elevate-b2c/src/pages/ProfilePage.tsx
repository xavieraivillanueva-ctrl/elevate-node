import React from 'react'
import { User, Mail, Calendar, Shield, LogOut, HelpCircle, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { ElevateLogo } from '../components/ElevateLogo'

interface ProfilePageProps {
  userEmail: string
  userName: string
  onGoToAppointments: () => void
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userEmail, userName, onGoToAppointments }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col pb-28">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E6EC] px-5 pt-5 pb-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <ElevateLogo variant="light" size="md" showTagline tagline="MI CUENTA" />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-6 space-y-6">
        {/* User Card */}
        <div className="bg-white rounded-3xl border border-[#E2E6EC] p-6 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0A1628] text-[#D4A017] flex items-center justify-center text-xl font-black shadow-md">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-[#0A1628] truncate">{userName}</h2>
            <div className="flex items-center gap-1.5 text-xs text-[#6B7B8F] mt-0.5">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{userEmail}</span>
            </div>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A1628]/5 text-[#0A1628]">
              Cliente Verificado
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl border border-[#E2E6EC] p-2 shadow-sm divide-y divide-[#F0F2F5]">
          <button
            onClick={onGoToAppointments}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F8F9FB] rounded-2xl transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0A1628]">Mis Reservas y Citas</p>
                <p className="text-xs text-[#6B7B8F]">Revisar proximas citas y recibos</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0ADB8]" />
          </button>

          <button
            onClick={() => window.open('https://wa.me/5215500000000?text=Hola%20Elevate%20Node%20necesito%20ayuda', '_blank')}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F8F9FB] rounded-2xl transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0A1628]">Soporte y Atencion</p>
                <p className="text-xs text-[#6B7B8F]">Ayuda en linea por WhatsApp</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A0ADB8]" />
          </button>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#0A1628]">Seguridad de Pagos</p>
                <p className="text-xs text-[#6B7B8F]">Transacciones encriptadas via Stripe</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              SSL Activo
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full py-4 rounded-2xl border border-red-200 bg-red-50 text-red-600 font-black text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesion</span>
        </button>
      </main>
    </div>
  )
}
