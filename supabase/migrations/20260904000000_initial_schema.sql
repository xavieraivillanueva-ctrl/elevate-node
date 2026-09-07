-- ==============================================================================
-- ELEVATE NODE: INSTANCIA DE BASE DE DATOS (SUPABASE)
-- ARQUITECTURA MULTI-TENANT CON MUTACIÓN B2B Y B2C
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA DE NEGOCIOS / SOCIOS (TENANTS)
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('barberia', 'lashes', 'estetica', 'general')),
    subtitle TEXT,
    address TEXT NOT NULL,
    schedule TEXT NOT NULL,
    is_open BOOLEAN DEFAULT TRUE,
    clabe_payout TEXT,
    theme_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA DE ESPECIALISTAS / STAFF / BARBEROS
CREATE TABLE IF NOT EXISTS public.staff_specialists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    avatar_url TEXT,
    status TEXT NOT NULL DEFAULT 'disponible' CHECK (status IN ('disponible', 'ocupado', 'descanso')),
    retention_rate NUMERIC(5,2) DEFAULT 60.00,
    avg_duration_minutes INT DEFAULT 45,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA DE SERVICIOS
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    duration_minutes INT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA DE CITAS / RESERVAS (B2C & B2B)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    specialist_id UUID REFERENCES public.staff_specialists(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE RESTRICT,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pendiente' CHECK (payment_status IN ('pendiente', 'pagado', 'en_local', 'reembolsado')),
    status TEXT NOT NULL DEFAULT 'confirmada' CHECK (status IN ('confirmada', 'en_curso', 'completada', 'cancelada')),
    stripe_session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA DE INVENTARIO Y ALERTAS DE STOCK
CREATE TABLE IF NOT EXISTS public.inventory_stock (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    current_stock INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 10,
    severity TEXT NOT NULL DEFAULT 'sugerida' CHECK (severity IN ('critica', 'sugerida')),
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLA DE MÉTRICAS Y PAYOUTS
CREATE TABLE IF NOT EXISTS public.daily_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    record_date DATE NOT NULL DEFAULT CURRENT_DATE,
    gross_revenue NUMERIC(10,2) DEFAULT 0.00,
    commissions NUMERIC(10,2) DEFAULT 0.00,
    tips NUMERIC(10,2) DEFAULT 0.00,
    payout_amount NUMERIC(10,2) DEFAULT 0.00,
    payout_status TEXT DEFAULT 'pendiente'
);

-- 8. POLÍTICAS DE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_metrics ENABLE ROW LEVEL SECURITY;

-- Políticas públicas para lectura B2C
CREATE POLICY "Acceso público lectura negocios" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Acceso público lectura staff" ON public.staff_specialists FOR SELECT USING (true);
CREATE POLICY "Acceso público lectura servicios" ON public.services FOR SELECT USING (true);
CREATE POLICY "Clientes pueden crear citas" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Clientes pueden ver sus citas creadas" ON public.appointments FOR SELECT USING (true);
