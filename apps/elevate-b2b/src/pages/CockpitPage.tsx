import React, { useState } from 'react'
import { ElevateLogo } from '../components/ElevateLogo'
import {
  TrendingUp, AlertTriangle, Zap, Power, BarChart2, Users, ShoppingCart, Settings,
  LogOut, Bell, DollarSign, Clock, ChevronRight
} from 'lucide-react'
import { METRICS, STAFF, STOCK_ALERTS, HOURS, AI_PROMO, PARTNER } from '../data/dashboard'

type Section = 'cockpit' | 'contabilidad' | 'inventario' | 'staff' | 'ajustes'

const statusConfig = {
  disponible: { label: 'Disponible', cellClass: 'cell-libre' },
  ocupado:    { label: 'En Cita',    cellClass: 'cell-servicio' },
  descanso:   { label: 'Descanso',   cellClass: 'cell-descanso' },
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
  const [section, setSection]     = useState<Section>('cockpit')
  const [killActive, setKill]     = useState(false)
  const [aiApproved, setAiApproved] = useState(false)

  const nav = [
    { id: 'cockpit',       icon: <BarChart2 className="w-4 h-4" />,    label: 'Cockpit' },
    { id: 'contabilidad',  icon: <DollarSign className="w-4 h-4" />,   label: 'Contabilidad' },
    { id: 'inventario',    icon: <ShoppingCart className="w-4 h-4" />, label: 'Inventario' },
    { id: 'staff',         icon: <Users className="w-4 h-4" />,        label: 'Staff' },
    { id: 'ajustes',       icon: <Settings className="w-4 h-4" />,     label: 'Ajustes' },
  ] as const

  return (
    <div className="min-h-screen bg-[#070E1A] flex flex-col md:flex-row">

      {/* ── Sidebar (desktop) / Bottom nav (mobile) ─────────── */}
      <aside className="hidden md:flex flex-col w-56 bg-[#0D1B2E] border-r border-[#1C2F4A] shrink-0">
        <div className="p-5 border-b border-[#1C2F4A]">
          <ElevateLogo variant="dark" size="sm" showTagline tagline={PARTNER.businessName} />
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setSection(n.id as Section)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition ${
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
          className="m-3 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-[#E53935] hover:bg-[#E53935]/10 transition"
        >
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </button>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-[#0D1B2E] border-b border-[#1C2F4A] px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 md:hidden">
            <ElevateLogo variant="dark" size="sm" showTagline={false} />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">Cockpit de Operación Real-Time</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Bell className="w-4 h-4 text-[#8CA4C0]" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1C2F4A] flex items-center justify-center text-xs font-bold text-[#00F0FF] uppercase">
                {partnerName[0]}
              </div>
              <span className="text-sm font-bold text-white hidden md:block">{partnerName}</span>
            </div>
          </div>
        </header>

        {/* ─────────────────── COCKPIT ─────────────────────── */}
        {section === 'cockpit' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto circuit-bg">

            {/* Revenue strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { label: 'Revenue del Día', value: `$${METRICS.dailyRevenue.toFixed(2)}`, accent: '#00F0FF', icon: '💰' },
                { label: 'Citas Hoy',       value: METRICS.totalAppointmentsToday,        accent: '#E5A93C', icon: '📅' },
                { label: 'Retención Staff', value: `${METRICS.staffRetentionRate}%`,      accent: '#00D4AA', icon: '👥' },
                { label: 'Duración Media',  value: `${METRICS.avgServiceDuration} min`,   accent: '#F59E0B', icon: '⏱️' },
              ].map(m => (
                <div key={m.label} className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4">
                  <p className="text-xs text-[#8CA4C0] font-bold uppercase tracking-wider mb-1">{m.icon} {m.label}</p>
                  <p className="text-2xl font-black" style={{ color: m.accent }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Timeline grid */}
            <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <h3 className="text-sm font-black text-white">Timeline · Barberos Disponibilidad</h3>
                <span className="ml-auto text-xs text-[#8CA4C0]">Actualización cada 30s</span>
              </div>

              {/* Horas header */}
              <div className="flex gap-2 mb-2">
                <div className="w-28 shrink-0" />
                {HOURS.map(h => (
                  <div key={h} className="flex-1 text-center text-[10px] font-bold text-[#8CA4C0]">{h}</div>
                ))}
              </div>

              {/* Staff rows */}
              <div className="space-y-2">
                {STAFF.map(sp => (
                  <div key={sp.id} className="flex gap-2 items-center">
                    <div className="w-28 shrink-0 flex items-center gap-2">
                      <img src={sp.avatarUrl} alt={sp.name} className="w-7 h-7 rounded-full object-cover border border-[#1C2F4A]" />
                      <div>
                        <p className="text-[11px] font-bold text-white leading-none">{sp.name}</p>
                        <p className={`text-[10px] font-bold ${statusConfig[sp.status].cellClass}`}
                           style={{ color: sp.status === 'disponible' ? '#00D4AA' : sp.status === 'ocupado' ? '#EF5350' : '#F59E0B' }}>
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

              {/* Legend */}
              <div className="flex gap-4 mt-4 pt-3 border-t border-[#1C2F4A]">
                {[
                  { label: 'Libre',       cls: 'cell-libre' },
                  { label: 'En Servicio', cls: 'cell-servicio' },
                  { label: 'Descanso',    cls: 'cell-descanso' },
                ].map(l => (
                  <div key={l.label} className={`px-2 py-1 rounded-md text-[10px] font-bold ${l.cls}`}>{l.label}</div>
                ))}
              </div>
            </div>

            {/* Bottom grid: Alertas + IA + Kill Switch */}
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
                      hover:bg-[#E5A93C]/10 transition uppercase tracking-wider"
                  >
                    ✓ Aprobar & Mutar App B2C
                  </button>
                ) : (
                  <div className="w-full py-2.5 rounded-xl text-xs font-black text-[#00D4AA] border border-[#00D4AA] text-center">
                    ✓ Promo activada y enviada
                  </div>
                )}
              </div>

              {/* Kill Switch */}
              <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Power className="w-4 h-4 text-[#E53935]" />
                  <h4 className="text-sm font-black text-white">Seguridad & Kill Switch</h4>
                </div>
                <p className="text-xs text-[#8CA4C0] leading-relaxed mb-4 flex-1">
                  Detiene inmediatamente todas las reservas entrantes y pone tu negocio en modo mantenimiento.
                </p>
                <button
                  onClick={() => setKill(!killActive)}
                  className={`w-full py-4 rounded-2xl flex flex-col items-center gap-2 font-black transition border-2 ${
                    killActive
                      ? 'bg-[#E53935]/20 border-[#E53935] text-[#E53935] kill-active glow-red'
                      : 'bg-[#111D35] border-[#1C2F4A] text-[#8CA4C0] hover:border-[#E53935] hover:text-[#E53935]'
                  }`}
                >
                  <Power className="w-8 h-8" />
                  <span className="text-xs uppercase tracking-widest">
                    {killActive ? '⚡ KILL SWITCH ACTIVO' : 'KILL SWITCH BOT'}
                  </span>
                </button>
              </div>
            </div>
          </main>
        )}

        {/* ─────────────────── CONTABILIDAD ────────────────── */}
        {section === 'contabilidad' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <h2 className="text-lg font-black text-white mb-5">Contabilidad & Stripe Payouts</h2>
            <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-black text-white">Stripe Payouts</p>
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
                    <button className="text-xs px-2 py-1 rounded-lg border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition">Retirar</button>
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
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-[#E5A93C]/40 text-[#E5A93C] hover:bg-[#E5A93C]/10 transition font-bold">
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ─────────────────── STAFF ───────────────────────── */}
        {section === 'staff' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <h2 className="text-lg font-black text-white mb-5">Gestión Staff & Rendimiento</h2>
            <div className="space-y-3">
              {STAFF.map(sp => (
                <div key={sp.id} className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-4 flex items-center gap-4">
                  <img src={sp.avatarUrl} alt={sp.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#1C2F4A]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-black text-white">{sp.name}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusConfig[sp.status].cellClass}`}>
                        {statusConfig[sp.status].label}
                      </span>
                    </div>
                    <p className="text-xs text-[#8CA4C0]">{sp.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#8CA4C0]">Retención</p>
                    <p className="text-base font-black text-[#00F0FF]">{sp.retentionRate}%</p>
                    <p className="text-[10px] text-[#8CA4C0]">{sp.avgDurationMinutes}m / servicio</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ─────────────────── AJUSTES ─────────────────────── */}
        {section === 'ajustes' && (
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <h2 className="text-lg font-black text-white mb-5">Ajustes de Mutación & Flyers</h2>
            <div className="bg-[#0D1B2E] border border-[#1C2F4A] rounded-2xl p-5 space-y-4">
              {[
                { label: 'Nombre del Negocio', value: PARTNER.businessName },
                { label: 'CLABE Bancaria',     value: PARTNER.clabe },
                { label: 'Dirección',          value: PARTNER.address },
                { label: 'Estado Stripe',      value: 'Conectado ✓' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-[#1C2F4A] last:border-0">
                  <span className="text-sm text-[#8CA4C0]">{s.label}</span>
                  <span className="text-sm font-bold text-white">{s.value}</span>
                </div>
              ))}
              <button
                onClick={onLogout}
                className="w-full py-3 rounded-xl border border-[#E53935]/40 text-[#E53935] text-sm font-bold hover:bg-[#E53935]/10 transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Cerrar Sesión
              </button>
            </div>
          </main>
        )}

        {/* ── Bottom nav (mobile only) ──────────────────────── */}
        <nav className="md:hidden bg-[#0D1B2E] border-t border-[#1C2F4A] flex shrink-0">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setSection(n.id as Section)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition ${
                section === n.id ? 'text-[#00F0FF]' : 'text-[#3A4F6A]'
              }`}
            >
              {n.icon}
              <span className="text-[9px] font-bold uppercase tracking-wider">{n.label}</span>
              {section === n.id && <div className="w-1 h-1 rounded-full bg-[#E5A93C]" />}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
