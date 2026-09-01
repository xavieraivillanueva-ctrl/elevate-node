import { BusinessTenant, Specialist, ServiceItem, InventoryAlert, DashboardMetrics } from '../types';

export const BUSINESS_TENANTS: BusinessTenant[] = [
  {
    id: 'urban-barberia',
    name: 'Elevate Node: Barbería Urbana',
    type: 'barberia',
    slug: 'urban-barberia',
    subtitle: 'PLATAFORMA TECH PARA BARBERÍAS',
    address: 'Calle 50, Centro, CDMX',
    schedule: 'Abierto Hoy: 10:00 - 20:00',
    isOpen: true,
    ctaText: '✨ AGENDAR CITA URBANA 📅',
    theme: {
      primaryColor: '#00F0FF',
      accentColor: '#E5A93C',
      bgGradient: 'from-slate-950 via-slate-900 to-cyan-950/40',
      cardBorder: 'border-cyan-500/30',
      buttonClass: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold border border-amber-300/40 shadow-lg shadow-amber-500/20',
      activeTabClass: 'text-amber-400 border-amber-400'
    },
    banners: [
      {
        title: '15% OFF',
        subtitle: 'Primer Corte | Estilo Urbano',
        tag: 'Promo de Inicio',
        bgClass: 'from-amber-500/20 to-cyan-950/80 border-amber-500/40',
        price: 'Para nuevos clientes'
      },
      {
        title: 'CORTE + BARBA + POMADA GRATIS',
        subtitle: 'Combo Master Grooming',
        tag: 'Más Vendido',
        bgClass: 'from-blue-900/40 to-slate-900 border-blue-500/40',
        price: '$550 MXN'
      },
      {
        title: 'RESERVA FIN DE SEMANA',
        subtitle: 'Asegura tu lugar con anticipación',
        tag: 'Alta Demanda',
        bgClass: 'from-emerald-950/40 to-slate-900 border-emerald-500/40',
        price: 'Slots limitados'
      }
    ]
  },
  {
    id: 'dary-lashes',
    name: 'Dary Lashes B2C',
    type: 'lashes',
    slug: 'dary-lashes',
    subtitle: 'ESTUDIO DE PESTAÑAS & UÑAS GLAMOUR',
    address: 'Calle 50, Centro, CDMX',
    schedule: 'Abierto Hoy: 10:00 - 20:00',
    isOpen: true,
    ctaText: '✨ AGENDAR CITA DARY 💖',
    theme: {
      primaryColor: '#EC4899',
      accentColor: '#F472B6',
      bgGradient: 'from-slate-950 via-pink-950/30 to-slate-900',
      cardBorder: 'border-pink-500/30',
      buttonClass: 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold border border-pink-300/40 shadow-lg shadow-pink-500/30',
      activeTabClass: 'text-pink-400 border-pink-400'
    },
    banners: [
      {
        title: '15% OFF Pestañas',
        subtitle: 'Lashes Volumen o Híbridas',
        tag: 'Tendencia',
        bgClass: 'from-pink-900/40 to-purple-950/60 border-pink-500/40',
        price: 'Solo esta semana'
      },
      {
        title: 'Promoción Especial Uñas',
        subtitle: 'Gelish + Manicura Spa',
        tag: 'Favorito',
        bgClass: 'from-rose-950/40 to-slate-900 border-rose-500/40',
        price: '$350 MXN'
      },
      {
        title: 'Combo Mirada Dary',
        subtitle: 'Lashes + Diseño de Cejas HD',
        tag: 'VIP',
        bgClass: 'from-fuchsia-950/40 to-slate-900 border-fuchsia-500/40',
        price: '$890 MXN'
      }
    ]
  },
  {
    id: 'estetica-chic',
    name: 'Estética Chic',
    type: 'estetica',
    slug: 'estetica-chic',
    subtitle: 'SALÓN INTEGRAL DE BELLEZA',
    address: 'Av. Insurgentes Sur 1420, CDMX',
    schedule: 'Abierto Hoy: 09:00 - 21:00',
    isOpen: true,
    ctaText: '✨ AGENDAR EN ESTÉTICA CHIC ✨',
    theme: {
      primaryColor: '#8B5CF6',
      accentColor: '#C084FC',
      bgGradient: 'from-slate-950 via-purple-950/30 to-slate-900',
      cardBorder: 'border-purple-500/30',
      buttonClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold border border-purple-300/40 shadow-lg shadow-purple-500/30',
      activeTabClass: 'text-purple-400 border-purple-400'
    },
    banners: [
      {
        title: 'Balayage & Corte',
        subtitle: 'Incluye hidratación profunda',
        tag: 'Top Salon',
        bgClass: 'from-purple-900/40 to-slate-900 border-purple-500/40',
        price: '$1,400 MXN'
      }
    ]
  }
];

export const INITIAL_SPECIALISTS: Specialist[] = [
  // Barberos Urban Barberia
  {
    id: 'spec-1',
    businessId: 'urban-barberia',
    name: 'Carlos V.',
    role: 'Master Barber / Fade Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'disponible',
    statusColor: 'bg-emerald-500',
    retentionRate: 64.2,
    avgDurationMinutes: 35,
    scheduleTimeline: [
      { time: '9:00 AM', state: 'libre' },
      { time: '10:00 AM', state: 'en_servicio' },
      { time: '11:00 AM', state: 'libre' },
      { time: '12:00 PM', state: 'en_servicio' },
      { time: '1:00 PM', state: 'descanso' },
      { time: '3:00 PM', state: 'libre' }
    ]
  },
  {
    id: 'spec-2',
    businessId: 'urban-barberia',
    name: 'Miguel S.',
    role: 'Especialista en Barba & Navaja',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'ocupado',
    statusColor: 'bg-rose-500',
    retentionRate: 58.9,
    avgDurationMinutes: 45,
    scheduleTimeline: [
      { time: '9:00 AM', state: 'en_servicio' },
      { time: '10:00 AM', state: 'en_servicio' },
      { time: '11:00 AM', state: 'libre' },
      { time: '12:00 PM', state: 'libre' },
      { time: '1:00 PM', state: 'libre' },
      { time: '3:00 PM', state: 'en_servicio' }
    ]
  },
  {
    id: 'spec-3',
    businessId: 'urban-barberia',
    name: 'Carlos G.',
    role: 'Barbero Clásico & Freestyle',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'disponible',
    statusColor: 'bg-emerald-500',
    retentionRate: 53.0,
    avgDurationMinutes: 40,
    scheduleTimeline: [
      { time: '9:00 AM', state: 'libre' },
      { time: '10:00 AM', state: 'libre' },
      { time: '11:00 AM', state: 'en_servicio' },
      { time: '12:00 PM', state: 'libre' },
      { time: '1:00 PM', state: 'descanso' },
      { time: '3:00 PM', state: 'libre' }
    ]
  },
  {
    id: 'spec-4',
    businessId: 'urban-barberia',
    name: 'Luis R.',
    role: 'Técnico Capilar & Afeitado',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    status: 'ocupado',
    statusColor: 'bg-rose-500',
    retentionRate: 61.5,
    avgDurationMinutes: 50,
    scheduleTimeline: [
      { time: '9:00 AM', state: 'libre' },
      { time: '10:00 AM', state: 'en_servicio' },
      { time: '11:00 AM', state: 'en_servicio' },
      { time: '12:00 PM', state: 'libre' },
      { time: '1:00 PM', state: 'libre' },
      { time: '3:00 PM', state: 'libre' }
    ]
  },
  {
    id: 'spec-5',
    businessId: 'urban-barberia',
    name: 'Miguel M.',
    role: 'Barbero Estilista',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    status: 'descanso',
    statusColor: 'bg-amber-500',
    retentionRate: 50.0,
    avgDurationMinutes: 30,
    scheduleTimeline: [
      { time: '9:00 AM', state: 'libre' },
      { time: '10:00 AM', state: 'libre' },
      { time: '11:00 AM', state: 'libre' },
      { time: '12:00 PM', state: 'descanso' },
      { time: '1:00 PM', state: 'descanso' },
      { time: '3:00 PM', state: 'libre' }
    ]
  },

  // Especialistas Dary Lashes
  {
    id: 'spec-dary',
    businessId: 'dary-lashes',
    name: 'Dary Lashes',
    role: 'Master Lash Artist & Cejas HD',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'disponible',
    statusColor: 'bg-emerald-500',
    retentionRate: 78.4,
    avgDurationMinutes: 65,
    scheduleTimeline: [
      { time: '10:00 AM', state: 'libre' },
      { time: '11:30 AM', state: 'en_servicio' },
      { time: '1:00 PM', state: 'libre' },
      { time: '3:00 PM', state: 'libre' }
    ]
  },
  {
    id: 'spec-carla',
    businessId: 'dary-lashes',
    name: 'Carla C.',
    role: 'Nail Artist (Gelish & Acrílico)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'disponible',
    statusColor: 'bg-emerald-500',
    retentionRate: 71.0,
    avgDurationMinutes: 50,
    scheduleTimeline: [
      { time: '10:00 AM', state: 'libre' },
      { time: '11:00 AM', state: 'libre' },
      { time: '12:30 PM', state: 'en_servicio' },
      { time: '2:00 PM', state: 'descanso' }
    ]
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  // Barbería
  {
    id: 'srv-1',
    businessId: 'urban-barberia',
    category: 'Corte',
    name: 'Corte Cabello',
    price: 550,
    durationMinutes: 30,
    description: 'Degradado a elección, lavado express y perfilado con navaja.'
  },
  {
    id: 'srv-2',
    businessId: 'urban-barberia',
    category: 'Barba',
    name: 'Barba Completa',
    price: 550,
    durationMinutes: 35,
    description: 'Toalla caliente aromatizada, aceites hidratantes y delineado perfecto.'
  },
  {
    id: 'srv-3',
    businessId: 'urban-barberia',
    category: 'Combo',
    name: 'Corte + Barba Master',
    price: 550,
    durationMinutes: 45,
    description: 'Servicio insignia: Corte de autor + ritual completo de barba con toalla caliente.'
  },
  {
    id: 'srv-4',
    businessId: 'urban-barberia',
    category: 'Tratamiento',
    name: 'Mascarilla Negra & Exfoliación',
    price: 350,
    durationMinutes: 25,
    description: 'Limpieza profunda de impurezas y puntos negros con vapor ozono.'
  },

  // Dary Lashes
  {
    id: 'srv-d1',
    businessId: 'dary-lashes',
    category: 'Lashes',
    name: 'Extensiones Clásicas 1x1',
    price: 650,
    durationMinutes: 60,
    description: 'Efecto rímel natural pelo a pelo, seda coreana premium.'
  },
  {
    id: 'srv-d2',
    businessId: 'dary-lashes',
    category: 'Lashes',
    name: 'Volumen Híbrido & Ruso',
    price: 850,
    durationMinutes: 85,
    description: 'Abanicos hechos a mano para una mirada densa, suave y glamurosa.'
  },
  {
    id: 'srv-d3',
    businessId: 'dary-lashes',
    category: 'Nails',
    name: 'Manicura Gelish Ruso',
    price: 350,
    durationMinutes: 45,
    description: 'Limpieza con torno, esmaltado semipermanente de alta durabilidad.'
  },
  {
    id: 'srv-d4',
    businessId: 'dary-lashes',
    category: 'Nails',
    name: 'Acrílico Escultural Full Set',
    price: 600,
    durationMinutes: 75,
    description: 'Estructura almendra, coffin o square con encapsulado y nail art.'
  }
];

export const INITIAL_METRICS: DashboardMetrics = {
  grossRevenue: 1580.00,
  dailyRevenue: 310.70,
  commissions: 10.00,
  tips: 0.00,
  bankTransfers: 1250.00,
  staffRetentionRate: 58.9,
  avgServiceDuration: 50.0
};

export const INITIAL_STOCK_ALERTS: InventoryAlert[] = [
  {
    id: 'alt-1',
    item: 'Navajas Feather Platinum',
    severity: 'critica',
    description: 'Quedan 12 unidades en estación principal (Mínimo requerido: 30)',
    currentStock: 12
  },
  {
    id: 'alt-2',
    item: 'Pomadas Matte Clay Suavecito',
    severity: 'critica',
    description: 'Stock agotándose para ventas de mostrador (Quedan 3 frascos)',
    currentStock: 3
  },
  {
    id: 'alt-3',
    item: 'Toallas descartables desinfectadas',
    severity: 'sugerida',
    description: 'Consumo promedio de 40 toallas/día. Pedido preventivo recomendado.',
    currentStock: 80
  },
  {
    id: 'alt-4',
    item: 'Aceite de Barba Cedro & Bergamota',
    severity: 'sugerida',
    description: 'Stock moderado (8 unidades). Reabastecer antes del fin de semana.',
    currentStock: 8
  }
];
