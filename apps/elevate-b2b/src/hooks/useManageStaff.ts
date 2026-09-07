import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface StaffSpecialist {
  id: string
  businessId: string
  name: string
  role: string
  status: 'disponible' | 'ocupado' | 'descanso'
  avatarUrl: string
  retentionRate: number
  avgDurationMinutes: number
}

export function useManageStaff(businessId?: string) {
  const [staff, setStaff] = useState<StaffSpecialist[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStaff = async () => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase.from('staff_specialists').select('*').order('created_at', { ascending: true })
      if (businessId) {
        query = query.eq('business_id', businessId)
      }
      const { data, error: sbError } = await query

      if (sbError) throw sbError
      if (data) {
        setStaff(
          data.map(st => ({
            id: st.id,
            businessId: st.business_id,
            name: st.name,
            role: st.role,
            status: st.status,
            avatarUrl: st.avatar_url || '',
            retentionRate: Number(st.retention_rate || 60),
            avgDurationMinutes: st.avg_duration_minutes || 45,
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
    fetchStaff()
  }, [businessId])

  // Mutación: Cambiar disponibilidad del barbero (disponible / ocupado / descanso)
  const toggleStaffStatus = async (staffId: string, newStatus: 'disponible' | 'ocupado' | 'descanso') => {
    setSaving(true)
    try {
      const { error: updateError } = await supabase
        .from('staff_specialists')
        .update({ status: newStatus })
        .eq('id', staffId)

      if (updateError) throw updateError
      setStaff(prev => prev.map(s => s.id === staffId ? { ...s, status: newStatus } : s))
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Actualizar foto de perfil (URL de elevate-media)
  const updateStaffAvatar = async (staffId: string, avatarUrl: string) => {
    setSaving(true)
    try {
      const { error: updateError } = await supabase
        .from('staff_specialists')
        .update({ avatar_url: avatarUrl })
        .eq('id', staffId)

      if (updateError) throw updateError
      setStaff(prev => prev.map(s => s.id === staffId ? { ...s, avatarUrl } : s))
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  // Mutación: Añadir nuevo especialista
  const addStaffMember = async (member: {
    businessId: string
    name: string
    role: string
    avatarUrl?: string
    avgDurationMinutes?: number
  }) => {
    setSaving(true)
    try {
      const { data, error: insertError } = await supabase
        .from('staff_specialists')
        .insert({
          business_id: member.businessId,
          name: member.name,
          role: member.role,
          avatar_url: member.avatarUrl || '',
          avg_duration_minutes: member.avgDurationMinutes || 45,
          status: 'disponible',
        })
        .select()
        .single()

      if (insertError) throw insertError
      if (data) {
        setStaff(prev => [
          ...prev,
          {
            id: data.id,
            businessId: data.business_id,
            name: data.name,
            role: data.role,
            status: data.status,
            avatarUrl: data.avatar_url || '',
            retentionRate: Number(data.retention_rate || 60),
            avgDurationMinutes: data.avg_duration_minutes || 45,
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
    staff,
    loading,
    saving,
    error,
    toggleStaffStatus,
    updateStaffAvatar,
    addStaffMember,
    refetch: fetchStaff,
  }
}
