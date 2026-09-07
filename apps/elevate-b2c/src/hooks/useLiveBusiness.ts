import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { BUSINESSES as fallbackBusinesses } from '../data/businesses'
import type { Business, Service, StaffMember } from '../types'

export function useLiveBusiness(slug: string = 'urban-barberia') {
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Obtener negocio por slug
        const { data: bizData, error: bizError } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .single()

        if (bizError || !bizData) {
          console.warn('Usando fallback local para negocio:', bizError)
          const fallback = fallbackBusinesses.find(b => b.slug === slug) || fallbackBusinesses[0]
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

        // 3. Obtener especialistas / barberos
        const { data: staffData } = await supabase
          .from('staff_specialists')
          .select('*')
          .eq('business_id', bizData.id)

        // Encontrar mock de diseño para enriquecer banners visuales
        const localMock = fallbackBusinesses.find(b => b.slug === slug) || fallbackBusinesses[0]

        const mappedServices: Service[] = (servicesData && servicesData.length > 0)
          ? servicesData.map(s => ({
              id: s.id,
              businessId: s.business_id,
              category: s.category,
              name: s.name,
              price: Number(s.price),
              durationMinutes: s.duration_minutes,
              description: s.description || '',
              icon: s.category === 'Barba' ? '🪒' : s.category === 'Combo' ? '⭐' : '✂️',
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
              avatarUrl: st.avatar_url || localMock.staff[0].avatarUrl,
              scheduleBlocks: localMock.staff[0]?.scheduleBlocks || [],
            }))
          : localMock.staff

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
          primaryColor: '#0A1628',
          accentColor: '#D4A017',
          ctaText: '✦ AGENDAR CITA URBANA',
          banners: localMock.banners,
          services: mappedServices,
          staff: mappedStaff,
        }

        setBusiness(fullBusiness)
      } catch (err) {
        console.error('Error al cargar datos de Supabase:', err)
        const fallback = fallbackBusinesses.find(b => b.slug === slug) || fallbackBusinesses[0]
        setBusiness(fallback)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [slug])

  return { business, loading }
}
