import { DashboardMetrics, StockAlert, StaffMember } from '../types'

export const PARTNER = {
  name: 'Xavier Villanueva',
  businessName: 'Urban Barbería',
  clabe: '012 7356037285',
  address: 'Calle 50, Centro, CDMX',
  stripeConnected: true,
}

export const METRICS: DashboardMetrics = {
  dailyRevenue: 310.77,
  grossRevenue: 2049.60,
  commissions: 10.00,
  tips: 0.00,
  bankTransfers: 2049.60,
  staffRetentionRate: 58.9,
  avgServiceDuration: 50,
  totalAppointmentsToday: 8,
}

export const STAFF: StaffMember[] = [
  {
    id: 'st1', businessId: 'urban-barberia', name: 'Carlos V.', role: 'Master Barber', status: 'disponible',
    retentionRate: 64.2, avgDurationMinutes: 35,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop',
    scheduleBlocks: [
      { hour: '9:00',  state: 'libre' },
      { hour: '10:00', state: 'en_servicio' },
      { hour: '11:00', state: 'libre' },
      { hour: '12:00', state: 'en_servicio' },
      { hour: '1:00',  state: 'descanso' },
      { hour: '3:00',  state: 'libre' },
    ],
  },
  {
    id: 'st2', businessId: 'urban-barberia', name: 'Luis B.', role: 'Barba & Navaja', status: 'ocupado',
    retentionRate: 58.9, avgDurationMinutes: 45,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop',
    scheduleBlocks: [
      { hour: '9:00',  state: 'en_servicio' },
      { hour: '10:00', state: 'en_servicio' },
      { hour: '11:00', state: 'libre' },
      { hour: '12:00', state: 'libre' },
      { hour: '1:00',  state: 'libre' },
      { hour: '3:00',  state: 'en_servicio' },
    ],
  },
  {
    id: 'st3', businessId: 'urban-barberia', name: 'Carlos G.', role: 'Barbero Clásico', status: 'disponible',
    retentionRate: 53.0, avgDurationMinutes: 40,
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&auto=format&fit=crop',
    scheduleBlocks: [
      { hour: '9:00',  state: 'libre' },
      { hour: '10:00', state: 'libre' },
      { hour: '11:00', state: 'en_servicio' },
      { hour: '12:00', state: 'libre' },
      { hour: '1:00',  state: 'descanso' },
      { hour: '3:00',  state: 'libre' },
    ],
  },
  {
    id: 'st4', businessId: 'urban-barberia', name: 'Ismael M.', role: 'Técnico Capilar', status: 'descanso',
    retentionRate: 61.5, avgDurationMinutes: 50,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop',
    scheduleBlocks: [
      { hour: '9:00',  state: 'libre' },
      { hour: '10:00', state: 'en_servicio' },
      { hour: '11:00', state: 'en_servicio' },
      { hour: '12:00', state: 'descanso' },
      { hour: '1:00',  state: 'descanso' },
      { hour: '3:00',  state: 'libre' },
    ],
  },
]

export const STOCK_ALERTS: StockAlert[] = [
  { id: 'a1', item: 'Navajas para rasurar', currentStock: 3, minStock: 10, severity: 'critica', description: 'Stock crítico — reabastece hoy' },
  { id: 'a2', item: 'Pomada texturizante', currentStock: 4, minStock: 8, severity: 'critica', description: 'Stock crítico — reabastece hoy' },
  { id: 'a3', item: 'Crema de afeitar', currentStock: 6, minStock: 10, severity: 'sugerida', description: 'Compra sugerida esta semana' },
  { id: 'a4', item: 'Toallas desechables', currentStock: 22, minStock: 50, severity: 'sugerida', description: 'Compra sugerida esta semana' },
]

export const HOURS = ['9:00', '10:00', '11:00', '12:00', '1:00', '3:00']

export const AI_PROMO = {
  alert: 'DETECTADA BAJA OCUPACIÓN',
  action: 'Lanzar Promo',
  detail: 'Martes 11:00 AM',
  message: 'Enviar promoción al 30% de clientes inactivos con 20% OFF en próxima cita',
}
