import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface ClientAppointment {
  id: string
  businessId: string
  businessName: string
  serviceName: string
  specialistName: string
  appointmentDate: string
  timeSlot: string
  totalPrice: number
  paymentStatus: 'pendiente' | 'pagado' | 'en_local' | 'reembolsado'
  status: 'confirmada' | 'en_curso' | 'completada' | 'cancelada'
  createdAt: string
}

export function useClientAppointments() {
  const [appointments, setAppointments] = useState<ClientAppointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)

    try {
      // 1. Obtener citas del usuario autenticado (RLS filtra automáticamente por auth.uid() = user_id)
      const { data: apptsData, error: apptsError } = await supabase
        .from('appointments')
        .select(`
          id,
          business_id,
          service_id,
          specialist_id,
          appointment_date,
          time_slot,
          total_price,
          payment_status,
          status,
          created_at,
          businesses ( name ),
          services ( name ),
          staff_specialists ( name )
        `)
        .order('appointment_date', { ascending: false })

      if (apptsError) throw apptsError

      if (apptsData) {
        const mapped: ClientAppointment[] = apptsData.map((a: any) => ({
          id: a.id,
          businessId: a.business_id,
          businessName: a.businesses?.name || 'Urban Barbería',
          serviceName: a.services?.name || 'Servicio Barbería',
          specialistName: a.staff_specialists?.name || 'Especialista',
          appointmentDate: a.appointment_date,
          timeSlot: a.time_slot,
          totalPrice: Number(a.total_price || 0),
          paymentStatus: a.payment_status || 'pagado',
          status: a.status || 'confirmada',
          createdAt: a.created_at,
        }))
        setAppointments(mapped)
      }
    } catch (err: any) {
      console.error('Error al cargar citas del cliente:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
  }
}
