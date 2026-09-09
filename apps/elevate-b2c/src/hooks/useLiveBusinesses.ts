import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { BUSINESSES as fallbackBusinesses } from '../data/businesses'
import type { Business } from '../types'

export function useLiveBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>(fallbackBusinesses)
  const [loading, setLoading] = useState(true)

  const fetchBusinesses = async () => {
    try {
      // Consultar negocios reales en Supabase
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          id,
          name,
          slug,
          type,
          subtitle,
          address,
          schedule,
          is_open,
          theme_config,
          services (
            id,
            category,
            name,
            price,
            duration_minutes,
            description,
            is_active
          ),
          staff_specialists (
            id,
            name,
            role,
            avatar_url,
            status
          )
        `)
        .eq('is_open', true)
        .order('created_at', { ascending: false })

      if (error || !data || data.length === 0) {
        console.warn('Usando fallback local para Lobby:', error)
        setBusinesses(fallbackBusinesses)
        setLoading(false)
        return
      }

      const mapped: Business[] = data.map(b => {
        // Encontrar mock si existe para banners de respaldo
        const fallbackMatch = fallbackBusinesses.find(fb => fb.slug === b.slug || fb.id === b.id)

        const services = (b.services || [])
          .filter((s: any) => s.is_active !== false)
          .map((s: any) => ({
            id: s.id,
            businessId: b.id,
            category: s.category || 'General',
            name: s.name,
            price: Number(s.price),
            durationMinutes: s.duration_minutes || 45,
            description: s.description || '',
            icon: s.category?.toLowerCase().includes('barba') ? '🪒' :
                  s.category?.toLowerCase().includes('uñ') ? '💅' :
                  s.category?.toLowerCase().includes('spa') ? '🌿' : '✂️',
          }))

        const staff = (b.staff_specialists || []).map((st: any) => ({
          id: st.id,
          businessId: b.id,
          name: st.name,
          role: st.role,
          status: st.status as any,
          avatarUrl: st.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
          scheduleBlocks: fallbackMatch?.staff[0]?.scheduleBlocks || [],
        }))

        const banners = b.theme_config?.banners && b.theme_config.banners.length > 0
          ? b.theme_config.banners
          : fallbackMatch?.banners || []

        return {
          id: b.id,
          name: b.name,
          category: (b.type as any) || 'barberia',
          slug: b.slug,
          logoUrl: b.theme_config?.logo_url,
          address: b.address || 'Ubicación central',
          city: 'CDMX',
          schedule: b.schedule || 'Abierto Hoy: 10:00 – 20:00',
          isOpen: b.is_open,
          rating: 4.9,
          reviewCount: 240,
          primaryColor: b.theme_config?.primary_color || '#0A1628',
          accentColor: b.theme_config?.accent_color || '#D4A017',
          ctaText: b.theme_config?.cta_text || '✦ AGENDAR CITA',
          banners,
          services: services.length > 0 ? services : fallbackMatch?.services || [],
          staff: staff.length > 0 ? staff : fallbackMatch?.staff || [],
        }
      })

      setBusinesses(mapped)
    } catch (err) {
      console.error('Error cargando negocios vivos:', err)
      setBusinesses(fallbackBusinesses)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBusinesses()

    // Suscripción Realtime para actualizar la app cuando un negocio se publica o muta
    const channel = supabase
      .channel('public:businesses-lobby')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'businesses' },
        () => {
          fetchBusinesses()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { businesses, loading, refetch: fetchBusinesses }
}
