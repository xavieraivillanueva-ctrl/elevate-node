import React, { useState, useEffect } from 'react'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { CockpitPage } from './pages/CockpitPage'
import { supabase } from './lib/supabase'

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [demoUser, setDemoUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const [initialSection, setInitialSection] = useState<'cockpit' | 'escaparate' | 'servicios' | 'staff' | 'contabilidad' | 'inventario' | 'ajustes'>('cockpit')

  if (loading) {
    return <div className="min-h-screen bg-[#070E1A] flex items-center justify-center text-[#00F0FF]">Cargando...</div>
  }

  if (!session && !demoUser) {
    return (
      <LoginPage
        onLogin={(partner, targetSection) => {
          if (targetSection) setInitialSection(targetSection)
          setDemoUser(partner.name || partner.email)
        }}
      />
    )
  }
  
  return (
    <CockpitPage
      partnerName={session?.user?.email?.split('@')[0] || demoUser || 'Socio'}
      initialSection={initialSection}
      onLogout={async () => {
        setDemoUser(null)
        setInitialSection('cockpit')
        await supabase.auth.signOut()
      }}
    />
  )
}
