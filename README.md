# Elevate Node | Plataforma SaaS Multimodal B2B & B2C

Plataforma integral para negocios de cuidado personal (Barberías, Salones de Pestañas, Spas y Estéticas) con arquitectura multi-tenant y mutación dinámica de identidad de marca.

## 🚀 Arquitectura del Proyecto

El sistema está dividido en dos aplicaciones sincronizadas:

### 1. 📱 App B2C (Cliente Final)
- **Experiencia Mobile-First**: Diseñada específicamente para smartphones con navegación nativa fluida.
- **Hub de Mutación**: Capacidad de alternar en tiempo real entre marcas (*Elevate Node: Barbería Urbana*, *Dary Lashes*, *Estética Chic*) cambiando paleta de colores, banners, servicios y especialistas.
- **Catálogo de Servicios**: Listado con precios, duración en minutos y descripción detallada.
- **Barberos y Especialistas en Vivo**: Estados de disponibilidad en tiempo real (*Disponible*, *En Cita*, *Descanso*).
- **Flujo de Agendamiento Multi-paso**:
  1. Selección de Servicio
  2. Selección de Especialista
  3. Selección de Fecha y Franja Horaria
  4. Pasarela de Pagos (Mockup interactivo de Stripe Elements)
  5. Confirmación con generación de comprobante y sincronización de calendario.

### 2. 🖥️ Dashboard B2B (Cockpit de Operación del Socio)
- **Cockpit de Operación Real-Time**: Matriz visual de horarios con el timeline y estado de cada barbero.
- **Métricas Clave de Negocio**: Gross Revenue, Total Día's Revenue, comisiones y estatus de puestos.
- **Kill Switch Bot**: Mecanismo de seguridad para pausar reservas automatizadas o agentes de IA.
- **Ajustes de Mutación & Flyers con IA**: Detección de baja ocupación y sugerencia automática de promociones con un clic para mutar la App B2C.
- **Inventario & Alertas de Stock**: Alertas críticas (navajas, pomadas) y órdenes de compra sugeridas.
- **Contabilidad & Stripe Payouts**: Integración de transferencias bancarias y comisiones de plataforma.
- **Wizard de Onboarding de 5 Pasos**:
  1. Registro de Socio (Supabase Auth)
  2. Configuración del Local & CLABE
  3. Alta de Personal (Barberos)
  4. Definición de Servicios
  5. Lanzamiento & Mutación

---

## 🗄️ Base de Datos (Supabase)
El script SQL completo y listo para producción se encuentra en:
```
supabase/schema.sql
```
Incluye las tablas de `businesses`, `staff_specialists`, `services`, `appointments`, `inventory_stock`, `daily_metrics` y políticas de Row Level Security (RLS).

---

## 🛠️ Tecnologías Utilizadas
- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS con diseño neón/dark cyber
- **Iconografía**: Lucide React
- **Backend / Database**: Supabase (PostgreSQL + RLS + Auth)
- **Hosting**: Optimizado para Vercel
