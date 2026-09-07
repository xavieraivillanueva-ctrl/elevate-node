import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Service, StaffMember } from '../types'

export interface BookingPayload {
  businessId: string
  businessSlug: string
  serviceId: string
  specialistId: string
  clientId?: string
  clientName: string
  clientPhone: string
  clientEmail: string
  appointmentDate: string   // 'YYYY-MM-DD'
  timeSlot: string          // 'HH:mm'
  totalPrice: number
}

export type BookingState = 'idle' | 'loading' | 'success' | 'error'

export function useBooking() {
  const [state, setState]   = useState<BookingState>('idle')
  const [error, setError]   = useState<string | null>(null)
  const [appointmentId, setAppointmentId] = useState<string | null>(null)

  const insertAppointment = async (payload: BookingPayload) => {
    setState('loading')
    setError(null)

    const { data, error: sbError } = await supabase
      .from('appointments')
      .insert({
        business_id:      payload.businessId,
        service_id:       payload.serviceId,
        specialist_id:    payload.specialistId,
        user_id:          payload.clientId || null,
        client_name:      payload.clientName,
        client_phone:     payload.clientPhone,
        client_email:     payload.clientEmail || null,
        appointment_date: payload.appointmentDate,
        time_slot:        payload.timeSlot,
        total_price:      payload.totalPrice,
        payment_status:   'pagado',
        status:           'confirmada',
      })
      .select('id')
      .single()

    if (sbError) {
      setError(sbError.message)
      setState('error')
      return false
    }

    setAppointmentId(data?.id ?? null)
    setState('success')
    return true
  }

  const reset = () => { setState('idle'); setError(null); setAppointmentId(null) }

  return { state, error, appointmentId, insertAppointment, reset }
}
