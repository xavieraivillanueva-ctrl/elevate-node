import React, { useState } from 'react'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { LobbyPage } from './pages/LobbyPage'
import { BusinessPage } from './pages/BusinessPage'

type View = 'login' | 'lobby' | 'business'
type BottomTab = 'inicio' | 'citas' | 'perfil' | 'ajustes'

interface AuthUser { name: string; email: string }

export default function App() {
  const [view, setView]           = useState<View>('login')
  const [user, setUser]           = useState<AuthUser | null>(null)
  const [selectedBiz, setSelectedBiz] = useState<string | null>(null)
  const [tab, setTab]             = useState<BottomTab>('inicio')

  const handleLogin = (u: AuthUser) => { setUser(u); setView('lobby') }
  const handleSelectBiz = (id: string) => { setSelectedBiz(id); setView('business') }
  const handleBack = () => { setSelectedBiz(null); setView('lobby') }

  if (view === 'login') return <LoginPage onLogin={handleLogin} />
  if (view === 'lobby') return <LobbyPage onSelectBusiness={handleSelectBiz} />
  if (view === 'business' && selectedBiz) {
    return (
      <BusinessPage
        businessId={selectedBiz}
        onBack={handleBack}
        tab={tab}
        onTabChange={setTab}
        userName={user?.name || 'Cliente'}
      />
    )
  }
  return null
}
