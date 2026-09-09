import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface PromoBanner {
  id: string
  title: string
  subtitle: string
  tag?: string
  price?: string
  imageUrl?: string
  bgStyle?: 'gold' | 'navy' | 'teal'
}

export interface BusinessConfig {
  id: string
  name: string
  slug: string
  type: string
  subtitle?: string
  address: string
  schedule: string
  isOpen: boolean
  clabePayout?: string
  bannerUrl?: string
  logoUrl?: string
  primaryColor?: string
  accentColor?: string
  ctaText?: string
  promoBanners?: PromoBanner[]
}

export function useBusinessConfig(businessId?: string, initialFallback?: Partial<BusinessConfig>) {
  const [business, setBusiness] = useState<BusinessConfig | null>(() => {
    if (initialFallback?.name) {
      return {
        id: initialFallback.id || 'temp-local-tenant',
        name: initialFallback.name,
        slug: initialFallback.slug || initialFallback.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        type: initialFallback.type || 'barberia',
        subtitle: initialFallback.subtitle || 'Personaliza el subtítulo y servicios de tu negocio',
        address: initialFallback.address || 'Ingresa tu dirección en Ajustes',
        schedule: initialFallback.schedule || 'Lun a Sáb: 10:00 – 20:00',
        isOpen: false,
        clabePayout: initialFallback.clabePayout,
        primaryColor: initialFallback.primaryColor,
        accentColor: initialFallback.accentColor,
        ctaText: initialFallback.ctaText,
        promoBanners: initialFallback.promoBanners || [],
      }
    }
    return null
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchConfig = async () => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase.from('businesses').select('*')
      if (businessId) {
        query = query.eq('id', businessId)
      } else {
        // Intentar obtener el negocio asociado al usuario autenticado
        const { data: userData } = await supabase.auth.getUser()
        if (userData?.user?.id) {
          const { data: ownerRecord } = await supabase
            .from('business_owners')
            .select('business_id')
            .eq('user_id', userData.user.id)
            .maybeSingle()

          if (ownerRecord?.business_id) {
            query = query.eq('id', ownerRecord.business_id)
          }
        }
      }
      const { data, error: sbError } = await query.order('created_at', { ascending: false }).limit(1).maybeSingle()

      if (sbError) throw sbError
      if (data) {
        setBusiness({
          id: data.id,
          name: data.name,
          slug: data.slug,
          type: data.type,
          subtitle: data.subtitle,
          address: data.address,
          schedule: data.schedule,
          isOpen: data.is_open,
          clabePayout: data.clabe_payout,
          bannerUrl: data.theme_config?.banner_url || undefined,
          logoUrl: data.theme_config?.logo_url || undefined,
          primaryColor: data.theme_config?.primary_color || undefined,
          accentColor: data.theme_config?.accent_color || undefined,
          ctaText: data.theme_config?.cta_text || undefined,
          promoBanners: data.theme_config?.banners || [],
        })
      } else if (initialFallback?.name) {
        // Mantener fallback proporcionado si no se encuentra registro remoto aún
        setBusiness(prev => prev || ({
          id: initialFallback.id || 'temp-local-tenant',
          name: initialFallback.name || 'Mi Negocio',
          slug: initialFallback.slug || 'mi-negocio',
          type: initialFallback.type || 'barberia',
          subtitle: initialFallback.subtitle || 'Personaliza el subtítulo y servicios de tu negocio',
          address: initialFallback.address || 'Ingresa tu dirección en Ajustes',
          schedule: initialFallback.schedule || 'Lun a Sáb: 10:00 – 20:00',
          isOpen: false,
          clabePayout: initialFallback.clabePayout,
          primaryColor: initialFallback.primaryColor,
          accentColor: initialFallback.accentColor,
          ctaText: initialFallback.ctaText,
          promoBanners: initialFallback.promoBanners || [],
        }))
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [businessId])

  // Mutación: Actualizar horario de atención
  const updateBusinessHours = async (schedule: string) => {
    if (!business?.id) return false
    setSaving(true)
    try {
      const { error: updateError } = await supabase
        .from('businesses')
        .update({ schedule, updated_at: new Date().toISOString() })
        .eq('id', business.id)

      if (updateError) throw updateError
      setBusiness(prev => prev ? { ...prev, schedule } : null)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Abrir o cerrar negocio
  const toggleBusinessOpen = async (isOpen: boolean) => {
    if (!business?.id) return false
    setSaving(true)
    try {
      const { error: updateError } = await supabase
        .from('businesses')
        .update({ is_open: isOpen, updated_at: new Date().toISOString() })
        .eq('id', business.id)

      if (updateError) throw updateError
      setBusiness(prev => prev ? { ...prev, isOpen } : null)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Actualizar dirección y datos generales
  const updateBusinessProfile = async (updates: { name?: string; address?: string; subtitle?: string }) => {
    if (!business?.id) return false
    setSaving(true)
    try {
      const { error: updateError } = await supabase
        .from('businesses')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', business.id)

      if (updateError) throw updateError
      setBusiness(prev => prev ? { ...prev, ...updates } : null)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Actualizar CLABE interbancaria
  const updateClabePayout = async (clabePayout: string) => {
    if (!business?.id) return false
    setSaving(true)
    try {
      const { error: updateError } = await supabase
        .from('businesses')
        .update({ clabe_payout: clabePayout, updated_at: new Date().toISOString() })
        .eq('id', business.id)

      if (updateError) throw updateError
      setBusiness(prev => prev ? { ...prev, clabePayout } : null)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Actualizar banner del negocio (elevate-media)
  const updateBannerUrl = async (bannerUrl: string) => {
    if (!business?.id) return false
    setSaving(true)
    try {
      const { data: currentData } = await supabase
        .from('businesses')
        .select('theme_config')
        .eq('id', business.id)
        .single()

      const updatedTheme = { ...(currentData?.theme_config || {}), banner_url: bannerUrl }

      const { error: updateError } = await supabase
        .from('businesses')
        .update({ theme_config: updatedTheme, updated_at: new Date().toISOString() })
        .eq('id', business.id)

      if (updateError) throw updateError
      setBusiness(prev => prev ? { ...prev, bannerUrl } : null)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Actualizar configuración del Escaparate B2C (Storefront Studio)
  const updateStorefrontConfig = async (config: {
    primaryColor?: string
    accentColor?: string
    ctaText?: string
    logoUrl?: string
    bannerUrl?: string
    promoBanners?: PromoBanner[]
  }) => {
    if (!business?.id) return false
    setSaving(true)
    try {
      const { data: currentData } = await supabase
        .from('businesses')
        .select('theme_config')
        .eq('id', business.id)
        .single()

      const updatedTheme = {
        ...(currentData?.theme_config || {}),
        ...(config.primaryColor ? { primary_color: config.primaryColor } : {}),
        ...(config.accentColor ? { accent_color: config.accentColor } : {}),
        ...(config.ctaText ? { cta_text: config.ctaText } : {}),
        ...(config.logoUrl ? { logo_url: config.logoUrl } : {}),
        ...(config.bannerUrl ? { banner_url: config.bannerUrl } : {}),
        ...(config.promoBanners ? { banners: config.promoBanners } : {}),
      }

      const { error: updateError } = await supabase
        .from('businesses')
        .update({ theme_config: updatedTheme, updated_at: new Date().toISOString() })
        .eq('id', business.id)

      if (updateError) throw updateError
      setBusiness(prev => prev ? {
        ...prev,
        primaryColor: config.primaryColor ?? prev.primaryColor,
        accentColor: config.accentColor ?? prev.accentColor,
        ctaText: config.ctaText ?? prev.ctaText,
        logoUrl: config.logoUrl ?? prev.logoUrl,
        bannerUrl: config.bannerUrl ?? prev.bannerUrl,
        promoBanners: config.promoBanners ?? prev.promoBanners,
      } : null)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  return {
    business,
    loading,
    saving,
    error,
    updateBusinessHours,
    toggleBusinessOpen,
    updateBusinessProfile,
    updateClabePayout,
    updateBannerUrl,
    updateStorefrontConfig,
    refetch: fetchConfig,
  }
}
