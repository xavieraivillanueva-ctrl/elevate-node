export type BusinessCategory = 'barberia' | 'lashes' | 'estetica' | 'spa' | 'nails' | 'salon';

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  slug: string;
  logoUrl?: string;
  address: string;
  city: string;
  schedule: string;
  isOpen: boolean;
  rating: number;
  reviewCount: number;
  ctaText: string;
  primaryColor: string;
  accentColor: string;
  banners: Banner[];
  services: Service[];
  staff: StaffMember[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tag?: string;
  price?: string;
  imageUrl?: string;
  bgStyle: 'gold' | 'navy' | 'teal';
}

export interface Service {
  id: string;
  businessId: string;
  category: string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
  icon?: string;
}

export interface StaffMember {
  id: string;
  businessId: string;
  name: string;
  role: string;
  avatarUrl: string;
  status: 'disponible' | 'ocupado' | 'descanso';
  retentionRate?: number;
  avgDurationMinutes?: number;
  scheduleBlocks?: ScheduleBlock[];
}

export interface ScheduleBlock {
  hour: string;
  state: 'libre' | 'en_servicio' | 'descanso';
}

export interface Appointment {
  id: string;
  businessId: string;
  businessName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  specialistId: string;
  specialistName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  timeSlot: string;
  paymentStatus: 'pagado' | 'pendiente' | 'en_local';
  status: 'confirmada' | 'completada' | 'cancelada';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarInitials: string;
  loyaltyVisits: number;
  loyaltyTarget: number;
  role: 'cliente' | 'socio';
}

export interface DashboardMetrics {
  dailyRevenue: number;
  grossRevenue: number;
  commissions: number;
  tips: number;
  bankTransfers: number;
  staffRetentionRate: number;
  avgServiceDuration: number;
  totalAppointmentsToday: number;
}

export interface StockAlert {
  id: string;
  item: string;
  currentStock: number;
  minStock: number;
  severity: 'critica' | 'sugerida';
  description: string;
}

export const CATEGORIES: { id: BusinessCategory; label: string; icon: string }[] = [
  { id: 'barberia', label: 'Barbería', icon: '💈' },
  { id: 'lashes', label: 'Pestañas', icon: '👁️' },
  { id: 'nails', label: 'Uñas', icon: '💅' },
  { id: 'estetica', label: 'Estética', icon: '✂️' },
  { id: 'spa', label: 'Spa', icon: '🌿' },
  { id: 'salon', label: 'Salón', icon: '💇' },
];
