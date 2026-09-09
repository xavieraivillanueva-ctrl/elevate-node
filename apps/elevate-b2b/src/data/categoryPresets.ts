export interface CategoryPreset {
  id: string
  label: string
  icon: string
  primaryColor: string
  accentColor: string
  defaultCtaText: string
  inventoryItems: Array<{ id: string; item: string; currentStock: number; minStock: number; severity: 'critica' | 'sugerida' }>
  defaultBanners: Array<{ title: string; subtitle: string; tag: string; price?: string; bgStyle: 'gold' | 'navy' | 'teal' }>
}

export const CATEGORY_PRESETS: Record<string, CategoryPreset> = {
  barberia: {
    id: 'barberia',
    label: 'Barbería',
    icon: '💈',
    primaryColor: '#0A1628',
    accentColor: '#D4A017',
    defaultCtaText: '✦ AGENDAR CITA URBANA',
    inventoryItems: [
      { id: 'inv-b1', item: 'Navajas para rasurar', currentStock: 3, minStock: 10, severity: 'critica' },
      { id: 'inv-b2', item: 'Pomada texturizante', currentStock: 4, minStock: 8, severity: 'critica' },
      { id: 'inv-b3', item: 'Crema de afeitar', currentStock: 6, minStock: 10, severity: 'sugerida' },
      { id: 'inv-b4', item: 'Toallas desechables', currentStock: 22, minStock: 50, severity: 'sugerida' },
    ],
    defaultBanners: [
      { title: '15% OFF', subtitle: 'Primer Corte | Estilo Urbano', tag: 'Nuevos Clientes', bgStyle: 'gold' },
      { title: 'CORTE + BARBA + POMADA', subtitle: 'Combo Master Grooming', tag: 'Más Vendido', price: '$550 MXN', bgStyle: 'navy' },
    ],
  },
  spa: {
    id: 'spa',
    label: 'Spa & Wellness',
    icon: '🌿',
    primaryColor: '#0D2818',
    accentColor: '#52B788',
    defaultCtaText: '✦ RESERVAR SESIÓN DE SPA',
    inventoryItems: [
      { id: 'inv-s1', item: 'Aceite de Lavanda Orgánico', currentStock: 2, minStock: 8, severity: 'critica' },
      { id: 'inv-s2', item: 'Piedras Volcánicas Terapéuticas', currentStock: 5, minStock: 12, severity: 'sugerida' },
      { id: 'inv-s3', item: 'Sales de Baño Exfoliantes', currentStock: 4, minStock: 10, severity: 'critica' },
      { id: 'inv-s4', item: 'Velas Aromáticas Eucalipto', currentStock: 15, minStock: 30, severity: 'sugerida' },
    ],
    defaultBanners: [
      { title: 'RITUAL ANTI-ESTRÉS', subtitle: 'Masaje Relajante + Aromaterapia', tag: '2x1 Hoy', bgStyle: 'teal' },
      { title: 'CIRCUITO TERMAL & FACIAL', subtitle: 'Desconexión profunda 90 min', tag: 'Exclusivo', price: '$850 MXN', bgStyle: 'navy' },
    ],
  },
  nails: {
    id: 'nails',
    label: 'Salón de Uñas',
    icon: '💅',
    primaryColor: '#3A0D26',
    accentColor: '#F06292',
    defaultCtaText: '✦ AGENDAR MANICURA & UÑAS',
    inventoryItems: [
      { id: 'inv-n1', item: 'Gelish Esmaltes Semipermanentes', currentStock: 5, minStock: 25, severity: 'critica' },
      { id: 'inv-n2', item: 'Polímero Acrílico Cristal', currentStock: 2, minStock: 6, severity: 'critica' },
      { id: 'inv-n3', item: 'Aceite Regenerador de Cutícula', currentStock: 8, minStock: 15, severity: 'sugerida' },
      { id: 'inv-n4', item: 'Limas Estériles Desechables', currentStock: 20, minStock: 100, severity: 'sugerida' },
    ],
    defaultBanners: [
      { title: 'MANICURA RUSA + GELISH', subtitle: 'Acabado impecable de larga duración', tag: 'Tendencia', bgStyle: 'gold' },
      { title: 'SPA DE MANOS & PIES', subtitle: 'Exfoliación e hidratación intensiva', tag: 'Pack Dúo', price: '$480 MXN', bgStyle: 'teal' },
    ],
  },
  estetica: {
    id: 'estetica',
    label: 'Clínica / Estética',
    icon: '✨',
    primaryColor: '#1A1836',
    accentColor: '#9C27B0',
    defaultCtaText: '✦ AGENDAR CITA ESTÉTICA',
    inventoryItems: [
      { id: 'inv-e1', item: 'Ácido Hialurónico Serum', currentStock: 3, minStock: 10, severity: 'critica' },
      { id: 'inv-e2', item: 'Mascarillas de Hidrogel', currentStock: 7, minStock: 20, severity: 'sugerida' },
      { id: 'inv-e3', item: 'Puntas de Diamante Microdermo', currentStock: 4, minStock: 8, severity: 'critica' },
      { id: 'inv-e4', item: 'Guantes de Nitrilo', currentStock: 40, minStock: 150, severity: 'sugerida' },
    ],
    defaultBanners: [
      { title: 'LIMPIEZA FACIAL PROFUNDA', subtitle: 'Extracción ultrasónica + fototerapia', tag: 'Top Facial', bgStyle: 'teal' },
      { title: 'PEELING REJUVENECEDOR', subtitle: 'Luminosidad y renovación celular', tag: 'Renovación', price: '$950 MXN', bgStyle: 'navy' },
    ],
  },
  salon: {
    id: 'salon',
    label: 'Salón / Peluquería',
    icon: '✂️',
    primaryColor: '#1A1C20',
    accentColor: '#E5A93C',
    defaultCtaText: '✦ RESERVAR EN SALÓN',
    inventoryItems: [
      { id: 'inv-sa1', item: 'Tinte Profesional Sin Amoníaco', currentStock: 4, minStock: 15, severity: 'critica' },
      { id: 'inv-sa2', item: 'Decolorante Plex Protector', currentStock: 2, minStock: 6, severity: 'critica' },
      { id: 'inv-sa3', item: 'Mascarilla Keratina Botánica', currentStock: 5, minStock: 12, severity: 'sugerida' },
      { id: 'inv-sa4', item: 'Shampoo Neutro Purificante', currentStock: 8, minStock: 20, severity: 'sugerida' },
    ],
    defaultBanners: [
      { title: 'BALAYAGE & COLOR MASTER', subtitle: 'Diseño de color personalizado', tag: 'Especialidad', bgStyle: 'gold' },
      { title: 'TRATAMIENTO BOTOX CAPILAR', subtitle: 'Elimina el frizz y repara puntas', tag: 'Más Pedido', price: '$650 MXN', bgStyle: 'navy' },
    ],
  },
  lashes: {
    id: 'lashes',
    label: 'Pestañas & Cejas',
    icon: '👁️',
    primaryColor: '#2C1338',
    accentColor: '#E040FB',
    defaultCtaText: '✦ AGENDAR EXTENSIÓN LASHES',
    inventoryItems: [
      { id: 'inv-l1', item: 'Adhesivo Médico Grado Ocular', currentStock: 2, minStock: 6, severity: 'critica' },
      { id: 'inv-l2', item: 'Extensiones Seda Coreana 0.07', currentStock: 6, minStock: 20, severity: 'critica' },
      { id: 'inv-l3', item: 'Parches de Hidrogel Calmantes', currentStock: 18, minStock: 50, severity: 'sugerida' },
      { id: 'inv-l4', item: 'Cepillos Espiral Desechables', currentStock: 45, minStock: 150, severity: 'sugerida' },
    ],
    defaultBanners: [
      { title: 'VOLUMEN RUSO PREMIUM', subtitle: 'Abanicos hechos a mano densidad total', tag: 'Mirada WOW', bgStyle: 'navy' },
      { title: 'LASH LIFTING + LAMINADO', subtitle: 'Curvatura natural sin extensiones', tag: 'Natural', price: '$520 MXN', bgStyle: 'teal' },
    ],
  },
}
