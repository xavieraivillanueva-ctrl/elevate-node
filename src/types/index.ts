export type BusinessType = 'barberia' | 'lashes' | 'estetica';

export interface BusinessTenant {
  id: string;
  name: string;
  type: BusinessType;
  slug: string;
  subtitle: string;
  address: string;
  schedule: string;
  isOpen: boolean;
  ctaText: string;
  theme: {
    primaryColor: string; // e.g. '#00F0FF' or '#EC4899'
    accentColor: string;  // e.g. '#F59E0B'
    bgGradient: string;
    cardBorder: string;
    buttonClass: string;
    activeTabClass: string;
  };
  banners: {
    title: string;
    subtitle: string;
    tag?: string;
    bgClass: string;
    price?: string;
  }[];
}

export type SpecialistStatus = 'disponible' | 'ocupado' | 'descanso';

export interface Specialist {
  id: string;
  businessId: string;
  name: string;
  role: string;
  avatarUrl: string;
  status: SpecialistStatus;
  statusColor: string;
  scheduleTimeline?: {
    time: string;
    state: 'libre' | 'en_servicio' | 'descanso';
  }[];
  retentionRate?: number;
  avgDurationMinutes?: number;
}

export interface ServiceItem {
  id: string;
  businessId: string;
  category: string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
}

export interface Appointment {
  id: string;
  businessId: string;
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
  createdAt: string;
}

export interface InventoryAlert {
  id: string;
  item: string;
  severity: 'critica' | 'sugerida';
  description: string;
  currentStock: number;
}

export interface DashboardMetrics {
  grossRevenue: number;
  dailyRevenue: number;
  commissions: number;
  tips: number;
  bankTransfers: number;
  staffRetentionRate: number;
  avgServiceDuration: number;
}
