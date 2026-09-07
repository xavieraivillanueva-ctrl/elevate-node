import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

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
}

export function useBusinessConfig(businessId?: string) {
  const [business, setBusiness] = useState<BusinessConfig | null>(null)
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
      }
      const { data, error: sbError } = await query.limit(1).maybeSingle()

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
        })
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
    refetch: fetchConfig,
  }
}
