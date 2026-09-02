import React, { useState } from 'react'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { CockpitPage } from './pages/CockpitPage'

interface Partner {
  name: string
  business: string
  email: string
}

export default function App() {
  const [partner, setPartner] = useState<Partner | null>(null)

  if (!partner) return <LoginPage onLogin={setPartner} />
  return <CockpitPage partnerName={partner.name} onLogout={() => setPartner(null)} />
}
