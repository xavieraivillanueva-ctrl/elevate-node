import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { BUSINESSES as fallbackBusinesses } from '../data/businesses'
import type { Business, Service, StaffMember } from '../types'

export function useLiveBusiness(identifier: string = 'urban-barberia') {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier)
        
        let query = supabase.from('businesses').select('*')
        if (isUuid) {
          query = query.eq('id', identifier)
        } else {
          query = query.eq('slug', identifier)
        }

        const { data: bizData, error: bizError } = await query.single()

        if (bizError || !bizData) {
          console.warn('Usando fallback local para negocio:', bizError)
          const fallback = fallbackBusinesses.find(b => b.id === identifier || b.slug === identifier) || fallbackBusinesses[0]
          setBusiness(fallback)
          setLoading(false)
          return
        }

        // 2. Obtener servicios activos
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .eq('business_id', bizData.id)
          .eq('is_active', true)

        // 3. Obtener especialistas
        const { data: staffData } = await supabase
          .from('staff_specialists')
          .select('*')
          .eq('business_id', bizData.id)

        // Mock de diseño fallback
        const localMock = fallbackBusinesses.find(b => b.slug === bizData.slug || b.id === bizData.id) || fallbackBusinesses[0]

        const mappedServices: Service[] = (servicesData && servicesData.length > 0)
          ? servicesData.map(s => ({
              id: s.id,
              businessId: s.business_id,
              category: s.category,
              name: s.name,
              price: Number(s.price),
              durationMinutes: s.duration_minutes,
              description: s.description || '',
              icon: s.category === 'Barba' ? '🪒' : s.category === 'Combo' ? '⭐' : s.category === 'Spa' ? '💆' : '✂️',
            }))
          : localMock.services

        const mappedStaff: StaffMember[] = (staffData && staffData.length > 0)
          ? staffData.map(st => ({
              id: st.id,
              businessId: st.business_id,
              name: st.name,
              role: st.role,
              status: st.status as any,
              retentionRate: Number(st.retention_rate || 60),
              avgDurationMinutes: st.avg_duration_minutes || 35,
              avatarUrl: st.avatar_url || localMock.staff[0]?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
              scheduleBlocks: localMock.staff[0]?.scheduleBlocks || [],
            }))
          : localMock.staff

        const theme = bizData.theme_config || {}
        const primaryColor = theme.primary_color || theme.primaryColor || '#0A1628'
        const accentColor = theme.accent_color || theme.accentColor || '#D4A017'
        const ctaText = theme.cta_text || theme.ctaText || (bizData.type === 'spa' ? '✦ RESERVAR SESIÓN DE SPA' : '✦ AGENDAR CITA AHORA')

        const banners = (theme.promo_banners && theme.promo_banners.length > 0)
          ? theme.promo_banners.map((b: any, idx: number) => ({
              id: b.id || `promo-${idx}`,
              title: b.title || bizData.name,
              subtitle: b.subtitle || 'Experiencia exclusiva y personalizada',
              tag: b.tag || 'DESTACADO',
              bgStyle: (b.bgStyle || 'gold') as any,
              price: b.price || '',
              imageUrl: b.imageUrl,
            }))
          : localMock.banners

        const fullBusiness: Business = {
          id: bizData.id,
          name: bizData.name,
          category: bizData.type as any,
          slug: bizData.slug,
          address: bizData.address,
          city: 'CDMX',
          schedule: bizData.schedule,
          isOpen: bizData.is_open,
          rating: 4.9,
          reviewCount: 312,
          primaryColor,
          accentColor,
          ctaText,
          banners,
          services: mappedServices,
          staff: mappedStaff,
        }

        setBusiness(fullBusiness)
      } catch (err) {
        console.error('Error al cargar datos de Supabase:', err)
        const fallback = fallbackBusinesses.find(b => b.id === identifier || b.slug === identifier) || fallbackBusinesses[0]
        setBusiness(fallback)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [identifier])

  return { business, loading }
}
