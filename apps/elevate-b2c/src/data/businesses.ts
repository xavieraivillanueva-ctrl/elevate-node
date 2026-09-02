import { Business, CATEGORIES } from '../types'

export { CATEGORIES }

export const BUSINESSES: Business[] = [
  // ── BARBERÍAS ──────────────────────────────────────────────────────────
  {
    id: 'urban-barberia',
    name: 'Urban Barbería',
    category: 'barberia',
    slug: 'urban-barberia',
    address: 'Calle 50, Centro',
    city: 'CDMX',
    schedule: 'Abierto Hoy: 10:00 – 20:00',
    isOpen: true,
    rating: 4.9,
    reviewCount: 312,
    primaryColor: '#0A1628',
    accentColor: '#D4A017',
    ctaText: '✦ AGENDAR CITA URBANA',
    banners: [
      {
        id: 'b1', title: '15% OFF', subtitle: 'Primer Corte | Estilo Urbano',
        tag: 'Promo Nuevos Clientes', price: 'Para nuevos clientes',
        bgStyle: 'gold',
        imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'b2', title: 'CORTE + BARBA\n+ POMADA GRATIS', subtitle: 'Combo Master Grooming',
        tag: 'Más Vendido', price: '$550 MXN', bgStyle: 'navy',
        imageUrl: 'https://images.unsplash.com/photo-1587095951604-b9d924a3fda0?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 'b3', title: 'RESERVA FIN DE SEMANA', subtitle: 'Asegura tu lugar',
        tag: 'Alta Demanda', price: 'Slots Limitados', bgStyle: 'teal',
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
      },
    ],
    services: [
      { id: 's1', businessId: 'urban-barberia', category: 'Corte', name: 'Corte Cabello', price: 550, durationMinutes: 30, description: 'Degradado a elección + perfilado con navaja', icon: '✂️' },
      { id: 's2', businessId: 'urban-barberia', category: 'Barba', name: 'Barba Completa', price: 550, durationMinutes: 35, description: 'Toalla caliente + aceites + delineado perfecto', icon: '🪒' },
      { id: 's3', businessId: 'urban-barberia', category: 'Combo', name: 'Corte + Barba', price: 550, durationMinutes: 45, description: 'Combo insignia con ritual completo', icon: '⭐' },
    ],
    staff: [
      { id: 'st1', businessId: 'urban-barberia', name: 'Carlos V.', role: 'Master Barber', status: 'disponible', retentionRate: 64.2, avgDurationMinutes: 35,
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        scheduleBlocks: [{ hour: '9:00', state: 'libre' }, { hour: '10:00', state: 'en_servicio' }, { hour: '11:00', state: 'libre' }, { hour: '12:00', state: 'en_servicio' }, { hour: '1:00', state: 'descanso' }, { hour: '3:00', state: 'libre' }] },
      { id: 'st2', businessId: 'urban-barberia', name: 'Miguel S.', role: 'Barba & Navaja', status: 'ocupado', retentionRate: 58.9, avgDurationMinutes: 45,
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        scheduleBlocks: [{ hour: '9:00', state: 'en_servicio' }, { hour: '10:00', state: 'en_servicio' }, { hour: '11:00', state: 'libre' }, { hour: '12:00', state: 'libre' }, { hour: '1:00', state: 'libre' }, { hour: '3:00', state: 'en_servicio' }] },
      { id: 'st3', businessId: 'urban-barberia', name: 'Carlos G.', role: 'Barbero Clásico', status: 'disponible', retentionRate: 53.0, avgDurationMinutes: 40,
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        scheduleBlocks: [{ hour: '9:00', state: 'libre' }, { hour: '10:00', state: 'libre' }, { hour: '11:00', state: 'en_servicio' }, { hour: '12:00', state: 'libre' }, { hour: '1:00', state: 'descanso' }, { hour: '3:00', state: 'libre' }] },
      { id: 'st4', businessId: 'urban-barberia', name: 'Luis R.', role: 'Técnico Capilar', status: 'ocupado', retentionRate: 61.5, avgDurationMinutes: 50,
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        scheduleBlocks: [{ hour: '9:00', state: 'libre' }, { hour: '10:00', state: 'en_servicio' }, { hour: '11:00', state: 'en_servicio' }, { hour: '12:00', state: 'libre' }, { hour: '1:00', state: 'libre' }, { hour: '3:00', state: 'libre' }] },
      { id: 'st5', businessId: 'urban-barberia', name: 'Miguel M.', role: 'Barbero Estilista', status: 'descanso', retentionRate: 50.0, avgDurationMinutes: 30,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        scheduleBlocks: [{ hour: '9:00', state: 'libre' }, { hour: '10:00', state: 'libre' }, { hour: '11:00', state: 'libre' }, { hour: '12:00', state: 'descanso' }, { hour: '1:00', state: 'descanso' }, { hour: '3:00', state: 'libre' }] },
    ],
  },

  // ── PESTAÑAS / LASHES ─────────────────────────────────────────────────
  {
    id: 'dary-lashes',
    name: 'Dary Lashes',
    category: 'lashes',
    slug: 'dary-lashes',
    address: 'Calle 50, Centro',
    city: 'CDMX',
    schedule: 'Abierto Hoy: 10:00 – 20:00',
    isOpen: true,
    rating: 4.8,
    reviewCount: 198,
    primaryColor: '#7B1FA2',
    accentColor: '#F06292',
    ctaText: '✦ AGENDAR CITA DARY',
    banners: [
      { id: 'd1', title: '15% OFF Pestañas', subtitle: 'Lashes Volumen o Híbridas', tag: 'Tendencia', price: 'Solo esta semana', bgStyle: 'navy',
        imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&auto=format&fit=crop&q=80' },
      { id: 'd2', title: 'Manicura Gelish\n+ Spa de Manos', subtitle: 'Pack de Belleza Total', tag: 'Favorito', price: '$350 MXN', bgStyle: 'teal',
        imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop&q=80' },
    ],
    services: [
      { id: 'ds1', businessId: 'dary-lashes', category: 'Lashes', name: 'Extensiones Clásicas 1x1', price: 650, durationMinutes: 60, description: 'Efecto rímel natural, seda coreana premium', icon: '👁️' },
      { id: 'ds2', businessId: 'dary-lashes', category: 'Lashes', name: 'Volumen Ruso', price: 850, durationMinutes: 85, description: 'Abanicos hechos a mano para mirada densa', icon: '✨' },
      { id: 'ds3', businessId: 'dary-lashes', category: 'Nails', name: 'Manicura Gelish Ruso', price: 350, durationMinutes: 45, description: 'Torno + esmaltado semipermanente', icon: '💅' },
    ],
    staff: [
      { id: 'dt1', businessId: 'dary-lashes', name: 'Dary L.', role: 'Master Lash Artist', status: 'disponible', retentionRate: 78.4, avgDurationMinutes: 65,
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { id: 'dt2', businessId: 'dary-lashes', name: 'Carla C.', role: 'Nail Artist', status: 'disponible', retentionRate: 71.0, avgDurationMinutes: 50,
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
    ],
  },

  // ── ESTÉTICA ──────────────────────────────────────────────────────────
  {
    id: 'estetica-chic',
    name: 'Estética Chic',
    category: 'estetica',
    slug: 'estetica-chic',
    address: 'Av. Insurgentes Sur 1420',
    city: 'CDMX',
    schedule: 'Abierto Hoy: 09:00 – 21:00',
    isOpen: true,
    rating: 4.7,
    reviewCount: 156,
    primaryColor: '#4A148C',
    accentColor: '#CE93D8',
    ctaText: '✦ AGENDAR EN CHIC',
    banners: [
      { id: 'ec1', title: 'Balayage & Corte', subtitle: 'Hidratación profunda incluida', tag: 'Top Salón', price: '$1,400 MXN', bgStyle: 'navy',
        imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=80' },
    ],
    services: [
      { id: 'ec1', businessId: 'estetica-chic', category: 'Cabello', name: 'Corte + Peinado', price: 480, durationMinutes: 60, description: 'Corte a elección + styling profesional', icon: '✂️' },
      { id: 'ec2', businessId: 'estetica-chic', category: 'Color', name: 'Balayage Premium', price: 1400, durationMinutes: 120, description: 'Técnica francesa de degradado natural', icon: '🎨' },
    ],
    staff: [
      { id: 'ect1', businessId: 'estetica-chic', name: 'Valeria M.', role: 'Colorista Senior', status: 'disponible', retentionRate: 82.0, avgDurationMinutes: 90,
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
    ],
  },

  // ── SPA ────────────────────────────────────────────────────────────────
  {
    id: 'zen-spa',
    name: 'Zen Spa & Wellness',
    category: 'spa',
    slug: 'zen-spa',
    address: 'Polanco, Col. Polanco',
    city: 'CDMX',
    schedule: 'Abierto Hoy: 08:00 – 22:00',
    isOpen: true,
    rating: 4.9,
    reviewCount: 204,
    primaryColor: '#1B5E20',
    accentColor: '#81C784',
    ctaText: '✦ RESERVAR SPA',
    banners: [
      { id: 'sp1', title: 'Masaje Relajante 90 min', subtitle: 'Aromaterapia + Aceites Esenciales', tag: 'Más Popular', price: '$950 MXN', bgStyle: 'teal',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80' },
    ],
    services: [
      { id: 'sp1', businessId: 'zen-spa', category: 'Masajes', name: 'Masaje Sueco Clásico', price: 750, durationMinutes: 60, description: 'Técnica europea de relajación profunda', icon: '🌿' },
      { id: 'sp2', businessId: 'zen-spa', category: 'Faciales', name: 'Facial Hidratante Zen', price: 600, durationMinutes: 50, description: 'Limpieza + hidratación + mascarilla', icon: '✨' },
    ],
    staff: [
      { id: 'spt1', businessId: 'zen-spa', name: 'Ana R.', role: 'Terapeuta Senior', status: 'disponible', retentionRate: 88.0, avgDurationMinutes: 70,
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80' },
    ],
  },
]
