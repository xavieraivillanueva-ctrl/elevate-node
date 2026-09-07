import React, { useState, useEffect } from 'react'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { LobbyPage } from './pages/LobbyPage'
import { BusinessPage } from './pages/BusinessPage'
import { AppointmentsPage } from './pages/AppointmentsPage'
import { supabase } from './lib/supabase'

type View = 'login' | 'lobby' | 'business'
type BottomTab = 'inicio' | 'citas' | 'perfil' | 'ajustes'

interface AuthUser { id: string; email: string }

export default function App() {
  const [view, setView]               = useState<View>('login')
  const [user, setUser]               = useState<AuthUser | null>(null)
  const [loading, setLoading]         = useState(true)
  const [selectedBiz, setSelectedBiz] = useState<string | null>(null)
  const [tab, setTab]                 = useState<BottomTab>('inicio')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email || '' } : null)
      setView(session ? 'lobby' : 'login')
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email || '' } : null)
      setView(session ? 'lobby' : 'login')
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSelectBiz = (id: string) => { setSelectedBiz(id); setView('business') }
  const handleBack = () => { setSelectedBiz(null); setView('lobby') }

  if (loading) return <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center text-[#0A1628]">Cargando...</div>
  if (view === 'login') return <LoginPage />

  return (
    <div className="relative min-h-screen">
      {/* Vista principal según la pestaña o selección de negocio */}
      {tab === 'citas' ? (
        <AppointmentsPage onExplore={() => { setTab('inicio'); setView('lobby'); setSelectedBiz(null) }} />
      ) : view === 'business' && selectedBiz ? (
        <BusinessPage
          businessId={selectedBiz}
          onBack={handleBack}
          tab={tab}
          onTabChange={setTab}
          userId={user?.id}
          userName={user?.email?.split('@')[0] || 'Cliente'}
        />
      ) : (
        <LobbyPage onSelectBusiness={handleSelectBiz} />
      )}

      {/* Barra de navegación inferior global persistente */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-[#E2E6EC] z-40 max-w-2xl mx-auto">
        <div className="flex">
          {(['inicio', 'citas', 'perfil', 'ajustes'] as const).map(t => {
            const icons: Record<typeof t, string> = { inicio: '🏠', citas: '📅', perfil: '👤', ajustes: '⚙️' }
            const labels: Record<typeof t, string> = { inicio: 'Inicio', citas: 'Citas', perfil: 'Perfil', ajustes: 'Ajustes' }
            const isActive = tab === t
            return (
              <button
                key={t}
                onClick={() => {
                  setTab(t)
                  if (t === 'inicio' && !selectedBiz) setView('lobby')
                }}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition ${isActive ? 'text-[#0A1628]' : 'text-[#A0ADB8]'}`}
              >
                <span className="text-lg">{icons[t]}</span>
                <span className={`text-[10px] font-bold ${isActive ? 'text-[#0A1628]' : 'text-[#A0ADB8]'}`}>{labels[t]}</span>
                {isActive && <div className="w-1 h-1 rounded-full bg-[#D4A017]" />}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
