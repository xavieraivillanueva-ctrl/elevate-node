import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface ServiceItem {
  id: string
  businessId: string
  category: string
  name: string
  price: number
  durationMinutes: number
  description: string
  isActive: boolean
}

export function useManageServices(businessId?: string) {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = async () => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase.from('services').select('*').order('created_at', { ascending: true })
      if (businessId) {
        query = query.eq('business_id', businessId)
      }
      const { data, error: sbError } = await query

      if (sbError) throw sbError
      if (data) {
        setServices(
          data.map(s => ({
            id: s.id,
            businessId: s.business_id,
            category: s.category,
            name: s.name,
            price: Number(s.price),
            durationMinutes: s.duration_minutes,
            description: s.description || '',
            isActive: s.is_active,
          }))
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [businessId])

  // Mutación: Actualizar precio de un servicio
  const updateServicePrice = async (serviceId: string, newPrice: number) => {
    setSaving(true)
    try {
      const { error: updateError } = await supabase
        .from('services')
        .update({ price: newPrice })
        .eq('id', serviceId)

      if (updateError) throw updateError
      setServices(prev => prev.map(s => s.id === serviceId ? { ...s, price: newPrice } : s))
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Activar o pausar un servicio en el B2C
  const toggleServiceActive = async (serviceId: string, isActive: boolean) => {
    setSaving(true)
    try {
      const { error: updateError } = await supabase
        .from('services')
        .update({ is_active: isActive })
        .eq('id', serviceId)

      if (updateError) throw updateError
      setServices(prev => prev.map(s => s.id === serviceId ? { ...s, isActive } : s))
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Crear nuevo servicio
  const createService = async (service: {
    businessId: string
    category: string
    name: string
    price: number
    durationMinutes: number
    description?: string
  }) => {
    setSaving(true)
    try {
      const { data, error: insertError } = await supabase
        .from('services')
        .insert({
          business_id: service.businessId,
          category: service.category,
          name: service.name,
          price: service.price,
          duration_minutes: service.durationMinutes,
          description: service.description || '',
          is_active: true,
        })
        .select()
        .single()

      if (insertError) throw insertError
      if (data) {
        setServices(prev => [
          ...prev,
          {
            id: data.id,
            businessId: data.business_id,
            category: data.category,
            name: data.name,
            price: Number(data.price),
            durationMinutes: data.duration_minutes,
            description: data.description || '',
            isActive: data.is_active,
          },
        ])
      }
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  return {
    services,
    loading,
    saving,
    error,
    updateServicePrice,
    toggleServiceActive,
    createService,
    refetch: fetchServices,
  }
}
