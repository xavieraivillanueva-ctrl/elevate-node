import React, { useState } from 'react'
import { ElevateLogo } from '../components/ElevateLogo'
import { Search, MapPin, Star, Clock, ChevronRight } from 'lucide-react'
import { BUSINESSES, CATEGORIES } from '../data/businesses'
import type { BusinessCategory } from '../types'

interface LobbyPageProps {
  onSelectBusiness: (id: string) => void
}

export const LobbyPage: React.FC<LobbyPageProps> = ({ onSelectBusiness }) => {
  const [activeCategory, setActiveCategory] = useState<BusinessCategory | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = BUSINESSES.filter(b => {
    const matchCat = activeCategory === 'all' || b.category === activeCategory
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
                        b.address.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">

      {/* ── Top Header ───────────────────────────────────────────── */}
      <header className="bg-white border-b border-[#E2E6EC] px-5 pt-5 pb-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <ElevateLogo variant="light" size="md" showTagline tagline="ENCUENTRA TU ESTILO" />

          {/* Search bar */}
          <div className="mt-4 flex items-center gap-2.5 bg-[#F0F2F5] border border-[#E2E6EC] rounded-2xl px-4 py-2.5 focus-within:border-[#0A1628] transition">
            <Search className="w-4 h-4 text-[#6B7B8F] shrink-0" />
            <input
              type="text"
              placeholder="Busca un negocio o servicio..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm text-[#0A1628] outline-none w-full placeholder:text-[#A0ADB8]"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-5 space-y-6 pb-24">

        {/* ── Categorías / Giros de negocio ─────────────────────── */}
        <section>
          <h2 className="text-xs font-black text-[#0A1628] uppercase tracking-widest mb-3">
            ¿Qué tipo de negocio buscas?
          </h2>

          {/* Barra de desplazamiento horizontal de giros */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">

            {/* Todos */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`snap-start shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-bold transition whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-md'
                  : 'bg-white text-[#1A2B45] border-[#E2E6EC] hover:border-[#0A1628]'
              }`}
            >
              <span>🏪</span>
              <span>Todos</span>
            </button>

            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-start shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-bold transition whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-md'
                    : 'bg-white text-[#1A2B45] border-[#E2E6EC] hover:border-[#0A1628]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Lista de negocios ─────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-black text-[#0A1628] uppercase tracking-widest">
              {activeCategory === 'all' ? 'Negocios Disponibles' : CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h2>
            <span className="text-xs text-[#6B7B8F] font-medium">
              {filtered.length} {filtered.length === 1 ? 'negocio' : 'negocios'}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#6B7B8F]">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-sm font-semibold">Sin resultados</p>
              <p className="text-xs mt-1">Intenta con otro giro o nombre</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(biz => {
                const cat = CATEGORIES.find(c => c.id === biz.category)
                return (
                  <button
                    key={biz.id}
                    onClick={() => onSelectBusiness(biz.id)}
                    className="card-hover w-full bg-white rounded-2xl border border-[#E2E6EC] p-4 text-left flex items-center gap-4 shadow-sm"
                  >
                    {/* Logo placeholder con inicial */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner"
                      style={{ background: `linear-gradient(135deg, ${biz.primaryColor}18, ${biz.accentColor}22)`, border: `1.5px solid ${biz.primaryColor}22` }}
                    >
                      <span>{cat?.icon || '🏪'}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-black text-[#0A1628] truncate">{biz.name}</h3>
                        {biz.isOpen && (
                          <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Abierto
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-[#6B7B8F] mb-1.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{biz.address} · {biz.city}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Rating */}
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#D4A017]">
                          <Star className="w-3 h-3 fill-[#D4A017] text-[#D4A017]" />
                          {biz.rating} <span className="text-[#A0ADB8] font-normal">({biz.reviewCount})</span>
                        </span>

                        {/* Schedule */}
                        <span className="flex items-center gap-1 text-[11px] text-[#6B7B8F]">
                          <Clock className="w-3 h-3" />
                          {biz.schedule.replace('Abierto Hoy: ', '')}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 text-[#C0C9D6] shrink-0" />
                  </button>
                )
              })}
            </div>
          )}
        </section>

        {/* ── Footer de marca ──────────────────────────────────── */}
        <div className="text-center pt-4 border-t border-[#E2E6EC]">
          <p className="text-[10px] text-[#A0ADB8] tracking-wider uppercase">
            ELEVATE NODE | PLATAFORMA TECH PARA NEGOCIOS | www.elevatenode.com
          </p>
        </div>
      </main>
    </div>
  )
}
