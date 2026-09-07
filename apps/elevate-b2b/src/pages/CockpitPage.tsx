import React, { useState, useEffect, useRef } from 'react'
import { ElevateLogo } from '../components/ElevateLogo'
import {
  TrendingUp, AlertTriangle, Zap, Power, BarChart2, Users, ShoppingCart, Settings,
  LogOut, Bell, DollarSign, Clock, ChevronRight, Check, Save, Loader2, Smartphone,
  Pencil, Upload, Scissors, Plus, Globe, PauseCircle, Rocket, Camera, Sparkles, X
} from 'lucide-react'
import { METRICS, STAFF, STOCK_ALERTS, HOURS, AI_PROMO, PARTNER } from '../data/dashboard'
import { useRealtimeStaff } from '../hooks/useRealtimeStaff'
import { useBusinessConfig } from '../hooks/useBusinessConfig'
import { useManageStaff } from '../hooks/useManageStaff'
import { useManageServices } from '../hooks/useManageServices'
import { useStorageUpload } from '../hooks/useStorageUpload'
import { AppPreviewModal } from '../components/AppPreviewModal'

type Section = 'cockpit' | 'servicios' | 'staff' | 'contabilidad' | 'inventario' | 'ajustes'

const statusConfig = {
  disponible: { label: 'Disponible', cellClass: 'cell-libre', color: '#00D4AA' },
  ocupado:    { label: 'En Cita',    cellClass: 'cell-servicio', color: '#EF5350' },
  descanso:   { label: 'Descanso',   cellClass: 'cell-descanso', color: '#F59E0B' },
}

const stateCell = {
  libre:       'cell-libre',
  en_servicio: 'cell-servicio',
  descanso:    'cell-descanso',
}

const stateLabel = {
  libre:       'Libre',
  en_servicio: 'En Servicio',
  descanso:    'Descanso',
}

interface CockpitProps {
  partnerName: string
  onLogout: () => void
}

export const CockpitPage: React.FC<CockpitProps> = ({ partnerName, onLogout }) => {
  const [section, setSection] = useState<Section>('cockpit')
  const [aiApproved, setAiApproved] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  // 1. Motor Multi-tenant y Configuración del Negocio
  const {
    business,
    saving: savingConfig,
    toggleBusinessOpen,
    updateBusinessProfile,
    updateClabePayout,
    updateBannerUrl,
  } = useBusinessConfig()
  const isBusinessOpen = business ? business.isOpen : true

  // 2. Motor de Staff en Vivo (Base de Datos + Mutaciones)
  const {
    staff: dbStaff,
    toggleStaffStatus,
    updateStaffAvatar,
    addStaffMember,
    saving: savingStaff,
  } = useManageStaff(business?.id)
  
  // 3. Motor de Servicios (Base de Datos + Mutaciones)
  const {
    services: dbServices,
    updateServicePrice,
    toggleServiceActive,
    createService,
    saving: savingServices,
  } = useManageServices(business?.id)

  // 4. Hook para Subida de Imágenes a Supabase Storage (elevate-media)
  const { uploadMedia, uploading: uploadingMedia, error: uploadError } = useStorageUpload()

  // 5. Realtime staff para el Timeline (combina sockets con fallback)
  const { staff: liveStaff, liveCount } = useRealtimeStaff(STAFF)

  // 6. Formulario de Ajustes del Negocio
  const [editName, setEditName]         = useState('')
  const [editAddress, setEditAddress]   = useState('')
  const [editSubtitle, setEditSubtitle] = useState('')
  const [profileSaved, setProfileSaved] = useState(false)

  // 7. Edición explícita de Finanzas / CLABE
  const [editingClabe, setEditingClabe] = useState(false)
  const [clabeInput, setClabeInput]     = useState('')
  const [clabeSaved, setClabeSaved]     = useState(false)

  // 8. Edición de Precios de Servicios
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null)
  const [tempPrice, setTempPrice]           = useState<number>(0)
  const [showAddService, setShowAddService] = useState(false)
  const [newSvcName, setNewSvcName]         = useState('')
  const [newSvcPrice, setNewSvcPrice]       = useState('')
  const [newSvcCategory, setNewSvcCategory] = useState('Corte')
  const [newSvcDuration, setNewSvcDuration] = useState('45')

  // 9. Edición / Añadir Staff
  const [showAddStaff, setShowAddStaff]     = useState(false)
  const [newStaffName, setNewStaffName]     = useState('')
  const [newStaffRole, setNewStaffRole]     = useState('Especialista')
  const [newStaffAvatar, setNewStaffAvatar] = useState('')

  // 10. Referencias para subir archivos
  const bannerFileRef = useRef<HTMLInputElement>(null)
  const avatarFileRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const [bannerSuccess, setBannerSuccess] = useState(false)

  useEffect(() => {
    if (business) {
      setEditName(business.name || PARTNER.businessName)
      setEditAddress(business.address || PARTNER.address)
      setEditSubtitle(business.subtitle || '')
      setClabeInput(business.clabePayout || PARTNER.clabe)
    }
  }, [business])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = await updateBusinessProfile({
      name: editName,
      address: editAddress,
      subtitle: editSubtitle,
    })
    if (ok) {
      setProfileSaved(true)
      setTimeout(() => setProfileSaved(false), 3000)
    }
  }

  const handleSaveClabe = async () => {
    if (!clabeInput.trim()) return
    const ok = await updateClabePayout(clabeInput.trim())
    if (ok) {
      setEditingClabe(false)
      setClabeSaved(true)
      setTimeout(() => setClabeSaved(false), 3000)
    }
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const publicUrl = await uploadMedia(file, 'banners')
    if (publicUrl) {
      await updateBannerUrl(publicUrl)
      setBannerSuccess(true)
      setTimeout(() => setBannerSuccess(false), 3500)
    }
  }

  const handleStaffAvatarUpload = async (staffId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const publicUrl = await uploadMedia(file, 'avatars')
    if (publicUrl) {
      await updateStaffAvatar(staffId, publicUrl)
    }
  }

  const handleCreateNewService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!business?.id || !newSvcName.trim()) return
    const ok = await createService({
      businessId: business.id,
      name: newSvcName.trim(),
      price: Number(newSvcPrice) || 200,
      category: newSvcCategory,
      durationMinutes: Number(newSvcDuration) || 45,
    })
    if (ok) {
      setNewSvcName('')
      setNewSvcPrice('')
      setShowAddService(false)
    }
  }

  const handleCreateNewStaff = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!business?.id || !newStaffName.trim()) return
    const ok = await addStaffMember({
      businessId: business.id,
      name: newStaffName.trim(),
      role: newStaffRole.trim() || 'Especialista',
      avatarUrl: newStaffAvatar.trim() || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop',
    })
    if (ok) {
      setNewStaffName('')
      setNewStaffRole('Especialista')
      setNewStaffAvatar('')
      setShowAddStaff(false)
    }
  }

  const nav = [
    { id: 'cockpit',       icon: <BarChart2 className="w-4 h-4" />,    label: 'Cockpit' },
    { id: 'servicios',    icon: <Scissors className="w-4 h-4" />,     label: 'Servicios' },
    { id: 'staff',         icon: <Users className="w-4 h-4" />,        label: 'Staff' },
    { id: 'contabilidad',  icon: <DollarSign className="w-4 h-4" />,   label: 'Contabilidad' },
    { id: 'inventario',    icon: <ShoppingCart className="w-4 h-4" />, label: 'Inventario' },
    { id: 'ajustes',       icon: <Settings className="w-4 h-4" />,     label: 'Ajustes' },
  ] as const

  // Datos consolidados para el simulador de App
  const activeStaffList = dbStaff.length > 0 ? dbStaff : STAFF.map(s => ({
    id: s.id,
    name: s.name,
    role: s.role,
    status: s.status,
    avatarUrl: s.avatarUrl,
  }))

  const activeServicesList = dbServices.length > 0 ? dbServices : [
    { id: 's1', name: 'Corte Tradicional', price: 350, durationMinutes: 45, category: 'Corte', isActive: true },
    { id: 's2', name: 'Perfilado de Barba', price: 220, durationMinutes: 30, category: 'Barba', isActive: true },
    { id: 's3', name: 'Combo Elevate Premium', price: 520, durationMinutes: 70, category: 'Combo', isActive: true },
  ]

  return (
    <div className="min-h-screen bg-[#070E1A] flex flex-col md:flex-row">

      {/* ── Sidebar (desktop) / Bottom nav (mobile) ─────────── */}
      <aside className="hidden md:flex flex-col w-56 bg-[#0D1B2E] border-r border-[#1C2F4A] shrink-0">
        <div className="p-5 border-b border-[#1C2F4A]">
          <ElevateLogo variant="dark" size="sm" showTagline tagline={business?.name || PARTNER.businessName} />
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setSection(n.id as Section)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                section === n.id
                  ? 'bg-[#111D35] text-[#00F0FF] border border-[#1C2F4A]'
                  : 'text-[#8CA4C0] hover:text-white hover:bg-[#111D35]'
              }`}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="m-3 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-[#E53935] hover:bg-[#E53935]/10 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </button>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar con Botón WOW de Vista Previa */}
        <header className="bg-[#0D1B2E] border-b border-[#1C2F4A] px-4 md:px-6 py-3.5 flex items-center justify-between shrink-0 gap-3">
          <div className="flex items-center gap-3 md:hidden">
            <ElevateLogo variant="dark" size="sm" showTagline={false} />
          </div>

          {/* Estado de Publicación: Borrador vs Publicado */}
          <div className="hidden md:flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isBusinessOpen ? 'bg-[#00F0FF] animate-pulse' : 'bg-amber-400'}`} />
            <div className="flex flex-col">
              <span className={`text-xs font-black uppercase tracking-wider ${isBusinessOpen ? 'text-[#00F0FF]' : 'text-amber-400'}`}>
                {isBusinessOpen ? 'Publicado & En Vivo en App B2C' : 'Modo Borrador (Offline)'}
              </span>
              <span className="text-[10px] text-[#8CA4C0]">
                {isBusinessOpen ? 'Recibiendo reservas de clientes' : 'Catálogo oculto mientras editas'}
              </span>
            </div>
          </div>

          {/* Acciones Superiores: Simulador WOW + Usuario */}
          <div className="flex items-center gap-3 ml-auto">
            {/* FASE 3: BOTÓN DESTACADO DE VISTA PREVIA DE APP */}
            <button
              onClick={() => setShowPreviewModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF]/15 via-[#00D4AA]/20 to-[#00F0FF]/15 border border-[#00F0FF]/60 text-[#00F0FF] text-xs font-black uppercase tracking-wider hover:bg-[#00F0FF]/25 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Vista Previa de App</span>
              <span className="sm:hidden">Simulador</span>
            </button>

            <button className="text-[#8CA4C0] hover:text-white p-2 rounded-xl hover:bg-[#111D35] transition cursor-pointer">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pl-1 border-l border-[#1C2F4A]">
              <div className="w-8 h-8 rounded-full bg-[#1C2F4A] border border-[#00F0FF]/40 flex items-center justify-center text-xs font-bold text-[#00F0FF] uppercase">
                {partnerName[0]}
              </div>
              <span className="text-sm font-bold text-white hidden lg:block">{partnerName}</span>
            </div>
          </div>
        </header>

        {/* ─────────────────── COCKPIT ─────────────────────── */}
        {section === 'cockpit' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto space-y-6">

            {/* Metrics cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Ocupación Sillones', value: '74%', sub: 'Pico máx: 88%', color: '#00F0FF' },
                { label: 'Ingreso del Día',    value: `$${METRICS.dailyRevenue.toLocaleString()} MXN`, sub: 'Meta: $15,000', color: '#00D4AA' },
                { label: 'Citas Hoy',          value: `${METRICS.totalAppointmentsToday}`, sub: '4 pendientes', color: '#E5A93C' },
                { label: 'Retención Clientes', value: `${METRICS.staffRetentionRate}%`, sub: '+3.2% vs semana anterior', color: '#8CA4C0' },
              ].map(m => (
                <div key={m.label} className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4">
                  <p className="text-[11px] font-bold text-[#8CA4C0] uppercase tracking-wider">{m.label}</p>
                  <p className="text-2xl font-black mt-1" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-[10px] text-[#8CA4C0] mt-1">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Timeline: Barberos vs Horas */}
            <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4 overflow-x-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <h3 className="text-sm font-black text-white">Timeline · Especialistas Disponibilidad</h3>
                <span className="ml-auto text-xs text-[#8CA4C0]">Supabase Realtime activo</span>
                {liveCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40">
                    +{liveCount} cita{liveCount > 1 ? 's' : ''} en vivo
                  </span>
                )}
              </div>

              {/* Horas header */}
              <div className="flex gap-2 mb-2">
                <div className="w-28 shrink-0" />
                {HOURS.map(h => (
                  <div key={h} className="flex-1 text-center text-[10px] font-bold text-[#8CA4C0]">{h}</div>
                ))}
              </div>

              {/* Staff rows — LIVE desde Supabase Realtime */}
              <div className="space-y-2">
                {liveStaff.map(sp => (
                  <div key={sp.id} className="flex gap-2 items-center">
                    <div className="w-28 shrink-0 flex items-center gap-2">
                      <img src={sp.avatarUrl} alt={sp.name} className="w-7 h-7 rounded-full object-cover border border-[#1C2F4A]" />
                      <div>
                        <p className="text-[11px] font-bold text-white leading-none">{sp.name}</p>
                        <p className={`text-[10px] font-bold ${statusConfig[sp.status].cellClass}`}
                           style={{ color: statusConfig[sp.status].color }}>
                          {statusConfig[sp.status].label}
                        </p>
                      </div>
                    </div>
                    {(sp.scheduleBlocks || []).map((block, i) => (
                      <div key={i} className={`flex-1 h-8 rounded-lg ${stateCell[block.state]} flex items-center justify-center`}>
                        <span className="text-[9px] font-bold">{stateLabel[block.state].split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom grid: Alertas + IA + FASE 4 KILL SWITCH REDISEÑADO */}
            <div className="grid md:grid-cols-3 gap-4">

              {/* Alertas de stock */}
              <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                  <h4 className="text-sm font-black text-white">Inventario & Alertas</h4>
                </div>
                <div className="space-y-2">
                  {STOCK_ALERTS.filter(a => a.severity === 'critica').map(a => (
                    <div key={a.id} className="flex items-center gap-2 text-xs">
                      <AlertTriangle className="w-3 h-3 text-[#E53935] shrink-0" />
                      <span className="text-[#E8EDF5]">{a.item}</span>
                    </div>
                  ))}
                  <div className="h-px bg-[#1C2F4A] my-2" />
                  {STOCK_ALERTS.filter(a => a.severity === 'sugerida').map(a => (
                    <div key={a.id} className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-[#F59E0B]/30 border border-[#F59E0B] shrink-0" />
                      <span className="text-[#8CA4C0]">{a.item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IA Promo */}
              <div className="bg-[#0D1B2E] border border-[#E5A93C]/40 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[#E5A93C]" />
                  <h4 className="text-sm font-black text-white">Recomendación IA</h4>
                </div>
                <div className="bg-[#111D35] border border-[#E5A93C]/20 rounded-xl p-3 mb-3">
                  <p className="text-[10px] font-black text-[#E5A93C] uppercase tracking-wider">{AI_PROMO.alert}</p>
                  <p className="text-xs font-bold text-white mt-1">{AI_PROMO.action}</p>
                  <p className="text-[10px] text-[#8CA4C0] mt-0.5">{AI_PROMO.detail}</p>
                </div>
                <p className="text-[11px] text-[#8CA4C0] mb-3 leading-relaxed">{AI_PROMO.message}</p>
                {!aiApproved ? (
                  <button
                    onClick={() => setAiApproved(true)}
                    className="w-full py-2.5 rounded-xl text-xs font-black text-[#E5A93C] border border-[#E5A93C]
                      hover:bg-[#E5A93C]/10 transition uppercase tracking-wider cursor-pointer"
                  >
                    ✓ Aprobar & Mutar App B2C
                  </button>
                ) : (
                  <div className="w-full py-2.5 rounded-xl text-xs font-black text-[#00D4AA] border border-[#00D4AA] text-center">
                    ✓ Promo activada y enviada
                  </div>
                )}
              </div>

              {/* ────────────────── FASE 4: EL BOTÓN DE PUBLICACIÓN (BORRADOR VS PUBLICADO) ── */}
              <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {isBusinessOpen ? (
                        <Globe className="w-4 h-4 text-[#00F0FF]" />
                      ) : (
                        <Power className="w-4 h-4 text-amber-400" />
                      )}
                      <h4 className="text-sm font-black text-white">Estado en App B2C</h4>
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isBusinessOpen
                        ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {isBusinessOpen ? '● Publicado' : '● Borrador'}
                    </span>
                  </div>

                  <p className="text-xs text-[#8CA4C0] leading-relaxed mb-4">
                    {isBusinessOpen
                      ? 'Tu negocio está recibiendo reservas y visible para clientes en tiempo real.'
                      : 'Modo Borrador activo. Personaliza servicios, staff y portada con privacidad total antes de salir en vivo.'}
                  </p>
                </div>

                <div>
                  {isBusinessOpen ? (
                    <button
                      disabled={savingConfig}
                      onClick={async () => await toggleBusinessOpen(false)}
                      className="w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider border border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition cursor-pointer disabled:opacity-50"
                    >
                      {savingConfig ? (
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      ) : (
                        <PauseCircle className="w-4 h-4 text-amber-400" />
                      )}
                      <span>Pausar Reservas</span>
                    </button>
                  ) : (
                    <button
                      disabled={savingConfig}
                      onClick={async () => await toggleBusinessOpen(true)}
                      className="w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider bg-gradient-to-r from-[#00F0FF] to-[#00D4AA] text-[#070E1A] shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition cursor-pointer disabled:opacity-50"
                    >
                      {savingConfig ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#070E1A]" />
                      ) : (
                        <Rocket className="w-4 h-4 text-[#070E1A]" />
                      )}
                      <span>Guardar y Publicar en la App</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </main>
        )}

        {/* ─────────────────── FASE 2: GESTIÓN DE SERVICIOS (EDICIÓN EXPLÍCITA) ──────── */}
        {section === 'servicios' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white">Catálogo de Servicios</h2>
                <p className="text-xs text-[#8CA4C0] mt-0.5">Define precios, duración y visibilidad en tiempo real para clientes</p>
              </div>
              <button
                onClick={() => setShowAddService(!showAddService)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00F0FF] text-[#070E1A] text-xs font-black uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Nuevo Servicio
              </button>
            </div>

            {/* Formulario para nuevo servicio */}
            {showAddService && (
              <form onSubmit={handleCreateNewService} className="bg-[#0D1B2E] border border-[#00F0FF]/40 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 animate-in fade-in duration-150">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-[#8CA4C0] uppercase block mb-1">Nombre del Servicio</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Corte Fade & Barba"
                    value={newSvcName}
                    onChange={e => setNewSvcName(e.target.value)}
                    className="w-full bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00F0FF]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#8CA4C0] uppercase block mb-1">Precio (MXN)</label>
                  <input
                    type="number"
                    required
                    placeholder="350"
                    value={newSvcPrice}
                    onChange={e => setNewSvcPrice(e.target.value)}
                    className="w-full bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00F0FF]"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    disabled={savingServices}
                    className="flex-1 py-2 rounded-xl bg-[#00F0FF] text-[#070E1A] text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    {savingServices ? 'Guardando...' : 'Crear'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddService(false)}
                    className="p-2 rounded-xl border border-[#1C2F4A] text-[#8CA4C0] hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(dbServices.length > 0 ? dbServices : activeServicesList).map(svc => (
                <div key={svc.id} className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#111D35] border border-[#1C2F4A] flex items-center justify-center text-lg shrink-0">
                      ✂️
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-white truncate">{svc.name}</p>
                      <p className="text-xs text-[#8CA4C0]">{svc.durationMinutes} min · {svc.category || 'General'}</p>
                    </div>
                  </div>

                  {/* Edición explícita de Precio */}
                  <div className="flex items-center gap-2 shrink-0">
                    {editingPriceId === svc.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={e => setTempPrice(Number(e.target.value))}
                          className="w-20 bg-[#111D35] border border-[#00F0FF] rounded-lg px-2 py-1 text-xs text-white outline-none"
                        />
                        <button
                          onClick={async () => {
                            await updateServicePrice(svc.id, tempPrice)
                            setEditingPriceId(null)
                          }}
                          className="p-1 rounded bg-[#00F0FF] text-[#070E1A] hover:opacity-90 cursor-pointer"
                          title="Confirmar precio"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="p-1 rounded bg-[#1C2F4A] text-white hover:opacity-90 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-[#E5A93C]">${svc.price.toLocaleString()} MXN</span>
                        <button
                          onClick={() => {
                            setEditingPriceId(svc.id)
                            setTempPrice(svc.price)
                          }}
                          className="p-1.5 rounded-lg bg-[#111D35] text-[#8CA4C0] hover:text-[#00F0FF] border border-[#1C2F4A] hover:border-[#00F0FF] transition cursor-pointer"
                          title="Editar Precio"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Toggle activo */}
                    <button
                      onClick={() => toggleServiceActive(svc.id, !svc.isActive)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition cursor-pointer ${
                        svc.isActive !== false
                          ? 'bg-[#00D4AA]/15 text-[#00D4AA] border-[#00D4AA]/40'
                          : 'bg-red-500/15 text-red-400 border-red-500/40'
                      }`}
                    >
                      {svc.isActive !== false ? 'Activo' : 'Pausado'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ─────────────────── FASE 2: GESTIÓN DE STAFF & SUBIDA DE AVATARES ──────── */}
        {section === 'staff' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white">Gestión de Especialistas & Avatares</h2>
                <p className="text-xs text-[#8CA4C0] mt-0.5">Actualiza turnos, edita roles y sube fotos directamente a elevate-media</p>
              </div>
              <button
                onClick={() => setShowAddStaff(!showAddStaff)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00F0FF] text-[#070E1A] text-xs font-black uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Añadir Especialista
              </button>
            </div>

            {/* Formulario para añadir miembro de staff */}
            {showAddStaff && (
              <form onSubmit={handleCreateNewStaff} className="bg-[#0D1B2E] border border-[#00F0FF]/40 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-150">
                <div>
                  <label className="text-[10px] font-bold text-[#8CA4C0] uppercase block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Mariana Torres"
                    value={newStaffName}
                    onChange={e => setNewStaffName(e.target.value)}
                    className="w-full bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00F0FF]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#8CA4C0] uppercase block mb-1">Puesto / Rol</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Estilista Senior"
                    value={newStaffRole}
                    onChange={e => setNewStaffRole(e.target.value)}
                    className="w-full bg-[#111D35] border border-[#1C2F4A] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#00F0FF]"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    disabled={savingStaff}
                    className="flex-1 py-2 rounded-xl bg-[#00F0FF] text-[#070E1A] text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    {savingStaff ? 'Guardando...' : 'Añadir'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddStaff(false)}
                    className="p-2 rounded-xl border border-[#1C2F4A] text-[#8CA4C0] hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
            
            <div className="space-y-3">
              {(dbStaff.length > 0 ? dbStaff : STAFF).map(sp => {
                const currentStatus = sp.status as 'disponible' | 'ocupado' | 'descanso'
                return (
                  <div key={sp.id} className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-4">
                    
                    {/* Avatar con botón visual de Subir Imagen */}
                    <div className="relative group shrink-0">
                      <img
                        src={sp.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop'}
                        alt={sp.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#1C2F4A]"
                      />
                      
                      {/* Input file oculto */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={el => { avatarFileRefs.current[sp.id] = el }}
                        onChange={e => handleStaffAvatarUpload(sp.id, e)}
                        className="hidden"
                      />

                      {/* Botón visual de subida de imagen */}
                      <button
                        type="button"
                        onClick={() => avatarFileRefs.current[sp.id]?.click()}
                        disabled={uploadingMedia}
                        className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition text-[9px] font-bold text-white cursor-pointer"
                        title="Subir nueva foto"
                      >
                        {uploadingMedia ? <Loader2 className="w-4 h-4 animate-spin text-[#00F0FF]" /> : <Camera className="w-4 h-4" />}
                        <span>Foto</span>
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-black text-white">{sp.name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig[currentStatus].cellClass}`}>
                          {statusConfig[currentStatus].label}
                        </span>
                        
                        {/* Botón visual de Editar Staff */}
                        <button
                          type="button"
                          onClick={() => avatarFileRefs.current[sp.id]?.click()}
                          className="flex items-center gap-1 text-[10px] text-[#00F0FF] bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 px-2 py-0.5 rounded-lg border border-[#00F0FF]/30 transition cursor-pointer"
                        >
                          <Pencil className="w-2.5 h-2.5" />
                          <span>Editar Foto</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#8CA4C0]">{sp.role}</p>
                    </div>

                    {/* Selector de disponibilidad directa */}
                    <div className="flex items-center gap-1.5 bg-[#111D35] p-1 rounded-xl border border-[#1C2F4A]">
                      {(['disponible', 'ocupado', 'descanso'] as const).map(st => (
                        <button
                          key={st}
                          disabled={savingStaff}
                          onClick={async () => {
                            await toggleStaffStatus(sp.id, st)
                          }}
                          className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition capitalize cursor-pointer ${
                            currentStatus === st
                              ? 'bg-[#00F0FF] text-[#070E1A] shadow'
                              : 'text-[#8CA4C0] hover:text-white hover:bg-[#1C2F4A]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs text-[#8CA4C0]">Retención</p>
                      <p className="text-base font-black text-[#00F0FF]">{sp.retentionRate}%</p>
                      <p className="text-[10px] text-[#8CA4C0]">{sp.avgDurationMinutes}m / servicio</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </main>
        )}

        {/* ─────────────────── CONTABILIDAD & CLABE EDITABLE ────────────────── */}
        {section === 'contabilidad' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto space-y-5">
            <h2 className="text-lg font-black text-white">Contabilidad & Stripe Payouts</h2>
            
            {/* Card CLABE con edición explícita */}
            <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-black text-white">Cuenta de Dispersión Automática (CLABE)</p>
                  <p className="text-xs text-[#8CA4C0]">Los ingresos de reservas en línea se depositan diariamente a esta cuenta</p>
                </div>
                {!editingClabe ? (
                  <button
                    onClick={() => setEditingClabe(true)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#111D35] border border-[#1C2F4A] text-xs font-bold text-[#00F0FF] hover:border-[#00F0FF] transition cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Editar CLABE
                  </button>
                ) : null}
              </div>

              {editingClabe ? (
                <div className="flex items-center gap-3 bg-[#111D35] p-3 rounded-xl border border-[#00F0FF]">
                  <input
                    type="text"
                    value={clabeInput}
                    onChange={e => setClabeInput(e.target.value)}
                    placeholder="Ingresa los 18 dígitos de tu CLABE"
                    className="bg-transparent text-sm font-mono text-white outline-none flex-1"
                  />
                  <button
                    onClick={handleSaveClabe}
                    disabled={savingConfig}
                    className="px-3 py-1.5 rounded-lg bg-[#00F0FF] text-[#070E1A] text-xs font-bold uppercase cursor-pointer"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingClabe(false)}
                    className="px-3 py-1.5 rounded-lg bg-[#1C2F4A] text-white text-xs font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="bg-[#111D35] p-3 rounded-xl border border-[#1C2F4A] flex items-center justify-between">
                  <span className="font-mono text-white text-sm tracking-wider">
                    {business?.clabePayout || PARTNER.clabe}
                  </span>
                  {clabeSaved && <span className="text-xs text-emerald-400 font-bold">✓ Actualizado</span>}
                </div>
              )}
            </div>

            <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-black text-white">Stripe Payouts Balance</p>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00D4AA]/20 text-[#00D4AA] border border-[#00D4AA]/40">Conectado</span>
              </div>
              {[
                { label: 'Gross Revenue', value: `$${METRICS.grossRevenue.toLocaleString()} MXN`, color: '#00F0FF' },
                { label: 'Comisiones',    value: `$${METRICS.commissions.toFixed(2)}`,            color: '#F59E0B' },
                { label: 'Tips',          value: `$${METRICS.tips.toFixed(2)}`,                   color: '#E5A93C' },
                { label: 'Transferencias de Banco', value: `$${METRICS.bankTransfers.toLocaleString()} MXN`, color: '#00D4AA' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between py-3 border-b border-[#1C2F4A] last:border-0">
                  <span className="text-sm text-[#8CA4C0]">{r.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black" style={{ color: r.color }}>{r.value}</span>
                    <button className="text-xs px-2 py-1 rounded-lg border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition cursor-pointer">Retirar</button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ─────────────────── INVENTARIO ──────────────────── */}
        {section === 'inventario' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <h2 className="text-lg font-black text-white mb-5">Inventario & Alertas de Stock</h2>
            <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-5">
              {STOCK_ALERTS.map(a => (
                <div key={a.id} className={`flex items-center justify-between py-3 border-b border-[#1C2F4A] last:border-0 ${a.severity === 'critica' ? '' : 'opacity-70'}`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-4 h-4 shrink-0 ${a.severity === 'critica' ? 'text-[#E53935]' : 'text-[#F59E0B]'}`} />
                    <div>
                      <p className="text-sm font-bold text-white">{a.item}</p>
                      <p className="text-xs text-[#8CA4C0]">Stock: {a.currentStock} / Mín: {a.minStock}</p>
                    </div>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-[#E5A93C]/40 text-[#E5A93C] hover:bg-[#E5A93C]/10 transition font-bold cursor-pointer">
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ─────────────────── FASE 2: AJUSTES & SUBIDA DE BANNER / PORTADA ───── */}
        {section === 'ajustes' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto space-y-6">
            <h2 className="text-lg font-black text-white">Ajustes del Negocio & Portada B2C</h2>

            {/* Card Visual de Banner y Portada con useStorageUpload */}
            <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">Imagen de Portada & Banner</h3>
                  <p className="text-xs text-[#8CA4C0]">Esta imagen aparecerá en el encabezado de tu negocio en la app de clientes</p>
                </div>
                
                {/* Botón visual de Subir Imagen */}
                <input
                  type="file"
                  accept="image/*"
                  ref={bannerFileRef}
                  onChange={handleBannerUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => bannerFileRef.current?.click()}
                  disabled={uploadingMedia}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00D4AA] text-[#070E1A] text-xs font-black uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition cursor-pointer disabled:opacity-50"
                >
                  {uploadingMedia ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#070E1A]" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>Subir Imagen</span>
                </button>
              </div>

              {bannerSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" /> Portada actualizada y sincronizada en Supabase
                </div>
              )}

              {/* Vista previa del banner */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-[#1C2F4A] bg-gradient-to-r from-[#0A1628] via-[#11233E] to-[#0D1B2E] flex flex-col justify-end p-5">
                {business?.bannerUrl ? (
                  <img src={business.bannerUrl} alt="Portada" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:16px_16px]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent opacity-90" />
                <div className="relative z-10">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#E5A93C] text-[#070E1A] text-[9px] font-black uppercase mb-1">
                    Vista Previa de Banner
                  </span>
                  <p className="text-white font-black text-lg">{editName || 'Tu Negocio'}</p>
                  <p className="text-[#8CA4C0] text-xs">{editSubtitle || 'Slogan de tu negocio'}</p>
                </div>
              </div>
            </div>
            
            {/* Formulario de información general con indicadores de edición */}
            <form onSubmit={handleSaveProfile} className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-5 space-y-5">
              
              {/* Nombre */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider block">
                    Nombre del Negocio (Visible en App B2C)
                  </label>
                  <span className="text-[10px] text-[#00F0FF] flex items-center gap-1 font-semibold">
                    <Pencil className="w-2.5 h-2.5" /> Campo editable
                  </span>
                </div>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                  className="w-full bg-[#111D35] border border-[#1C2F4A] rounded-xl px-4 py-3 text-sm text-white focus:border-[#00F0FF] outline-none transition"
                />
              </div>

              {/* Subtítulo / Slogan */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider block">
                    Slogan o Especialidad
                  </label>
                  <span className="text-[10px] text-[#00F0FF] flex items-center gap-1 font-semibold">
                    <Pencil className="w-2.5 h-2.5" /> Campo editable
                  </span>
                </div>
                <input
                  type="text"
                  value={editSubtitle}
                  onChange={e => setEditSubtitle(e.target.value)}
                  placeholder="ej. Cortes Urbanos y Grooming Profesional"
                  className="w-full bg-[#111D35] border border-[#1C2F4A] rounded-xl px-4 py-3 text-sm text-white focus:border-[#00F0FF] outline-none transition"
                />
              </div>

              {/* Dirección */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#8CA4C0] uppercase tracking-wider block">
                    Dirección Física
                  </label>
                  <span className="text-[10px] text-[#00F0FF] flex items-center gap-1 font-semibold">
                    <Pencil className="w-2.5 h-2.5" /> Campo editable
                  </span>
                </div>
                <input
                  type="text"
                  value={editAddress}
                  onChange={e => setEditAddress(e.target.value)}
                  required
                  className="w-full bg-[#111D35] border border-[#1C2F4A] rounded-xl px-4 py-3 text-sm text-white focus:border-[#00F0FF] outline-none transition"
                />
              </div>

              {/* Botón Guardar */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={savingConfig}
                  className="flex-1 py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2
                    bg-[#00F0FF] text-[#070E1A] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition disabled:opacity-50 cursor-pointer"
                >
                  {savingConfig ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : profileSaved ? (
                    <>
                      <Check className="w-4 h-4" /> Cambios Guardados en la Nube
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Guardar Perfil del Negocio
                    </>
                  )}
                </button>
              </div>

              <div className="h-px bg-[#1C2F4A] my-4" />

              <button
                type="button"
                onClick={onLogout}
                className="w-full py-3 rounded-xl border border-[#E53935]/40 text-[#E53935] text-sm font-bold hover:bg-[#E53935]/10 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Cerrar Sesión del Socio
              </button>
            </form>
          </main>
        )}

        {/* ── Bottom nav (mobile only) ──────────────────────── */}
        <nav className="md:hidden bg-[#0D1B2E] border-t border-[#1C2F4A] flex shrink-0">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setSection(n.id as Section)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 transition cursor-pointer ${
                section === n.id ? 'text-[#00F0FF]' : 'text-[#3A4F6A]'
              }`}
            >
              {n.icon}
              <span className="text-[9px] font-bold uppercase tracking-wider">{n.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── FASE 3: SIMULADOR DE VISTA PREVIA (MODAL WOW DE IPHONE) ── */}
      <AppPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        business={{
          name: editName || business?.name || PARTNER.businessName,
          subtitle: editSubtitle || business?.subtitle,
          address: editAddress || business?.address || PARTNER.address,
          schedule: business?.schedule || 'Lun a Sáb: 10:00 – 20:00',
          isOpen: isBusinessOpen,
          bannerUrl: business?.bannerUrl,
          type: business?.type || 'Barbería',
        }}
        services={activeServicesList}
        staff={activeStaffList}
      />
    </div>
  )
}

