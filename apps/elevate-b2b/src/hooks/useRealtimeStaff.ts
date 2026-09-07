import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import type { StaffMember } from '../types'

const BUSINESS_SLUG = 'urban-barberia'

export function useRealtimeStaff(staticStaff: StaffMember[]) {
  const [staff, setStaff] = useState<StaffMember[]>(staticStaff)
  const [liveCount, setLiveCount] = useState(0)
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  // Load real staff status from Supabase on mount
  useEffect(() => {
    const loadStaff = async () => {
      const { data, error } = await supabase
        .from('staff_specialists')
        .select('id, name, role, status, avatar_url, retention_rate, avg_duration_minutes')
        .eq('business_id', BUSINESS_SLUG)

      if (!error && data && data.length > 0) {
        // Merge DB status into static mock (preserves scheduleBlocks)
        setStaff(prev => prev.map(s => {
          const live = data.find(d => d.name === s.name)
          return live ? { ...s, status: live.status as StaffMember['status'] } : s
        }))
      }
    }
    loadStaff()
  }, [])

  // Subscribe to Realtime: any INSERT in appointments → mark specialist as 'ocupado'
  useEffect(() => {
    const channel = supabase
      .channel('appointments-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'appointments' },
        (payload) => {
          const newAppt = payload.new as { specialist_id?: string }

          if (newAppt.specialist_id) {
            setStaff(prev =>
              prev.map(s =>
                s.id === newAppt.specialist_id
                  ? { ...s, status: 'ocupado' as const }
                  : s
              )
            )
            setLiveCount(c => c + 1)
          }
        }
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { staff, liveCount }
}
