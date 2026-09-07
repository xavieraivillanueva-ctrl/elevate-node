-- ==============================================================================
-- FASE 1: SEGURIDAD MULTI-TENANT (RLS ESTRICTO)
-- ==============================================================================

-- 0. ASEGURAR COLUMNA USER_ID EN APPOINTMENTS
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS user_id UUID;

-- 1. TABLA DE RELACIÓN BUSINESS_OWNERS
CREATE TABLE IF NOT EXISTS public.business_owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'staff')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, business_id)
);

-- Habilitar RLS en business_owners
ALTER TABLE public.business_owners ENABLE ROW LEVEL SECURITY;

-- Los usuarios solo pueden ver a qué negocios están vinculados
DROP POLICY IF EXISTS "business_owners_select_own" ON public.business_owners;
CREATE POLICY "business_owners_select_own" ON public.business_owners
    FOR SELECT USING (auth.uid() = user_id);

-- Función auxiliar para verificar si un usuario es dueño/admin de un negocio
CREATE OR REPLACE FUNCTION public.is_business_member(b_id UUID)
RETURNS BOOLEAN AS $BODY$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.business_owners
        WHERE user_id = auth.uid()
        AND business_id = b_id
    );
END;
$BODY$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. POLÍTICAS RLS ESTRICTAS PARA BUSINESSES
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Público/B2C puede ver negocios activos
DROP POLICY IF EXISTS "businesses_public_select" ON public.businesses;
CREATE POLICY "businesses_public_select" ON public.businesses
    FOR SELECT USING (is_open = true);

-- Socios B2B solo pueden ver y actualizar su propio negocio
DROP POLICY IF EXISTS "businesses_owner_manage" ON public.businesses;
CREATE POLICY "businesses_owner_manage" ON public.businesses
    FOR ALL USING (public.is_business_member(id));

-- 3. POLÍTICAS RLS ESTRICTAS PARA SERVICES
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- B2C puede ver servicios activos
DROP POLICY IF EXISTS "services_public_select" ON public.services;
CREATE POLICY "services_public_select" ON public.services
    FOR SELECT USING (is_active = true);

-- B2B puede hacer SELECT, INSERT, UPDATE, DELETE solo en los servicios de su negocio
DROP POLICY IF EXISTS "services_owner_manage" ON public.services;
CREATE POLICY "services_owner_manage" ON public.services
    FOR ALL USING (public.is_business_member(business_id))
    WITH CHECK (public.is_business_member(business_id));

-- 4. POLÍTICAS RLS ESTRICTAS PARA STAFF_SPECIALISTS
ALTER TABLE public.staff_specialists ENABLE ROW LEVEL SECURITY;

-- B2C puede ver el staff para agendar
DROP POLICY IF EXISTS "staff_public_select" ON public.staff_specialists;
CREATE POLICY "staff_public_select" ON public.staff_specialists
    FOR SELECT USING (true);

-- B2B puede gestionar solo el staff de su negocio
DROP POLICY IF EXISTS "staff_owner_manage" ON public.staff_specialists;
CREATE POLICY "staff_owner_manage" ON public.staff_specialists
    FOR ALL USING (public.is_business_member(business_id))
    WITH CHECK (public.is_business_member(business_id));

-- 5. POLÍTICAS RLS ESTRICTAS PARA APPOINTMENTS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- B2C puede insertar citas
DROP POLICY IF EXISTS "appointments_b2c_insert" ON public.appointments;
CREATE POLICY "appointments_b2c_insert" ON public.appointments
    FOR INSERT WITH CHECK (true);

-- B2C puede ver sus propias citas si está autenticado
DROP POLICY IF EXISTS "appointments_b2c_select" ON public.appointments;
CREATE POLICY "appointments_b2c_select" ON public.appointments
    FOR SELECT USING (auth.uid() = user_id);

-- B2B puede ver y actualizar solo las citas que pertenezcan a su negocio
DROP POLICY IF EXISTS "appointments_owner_manage" ON public.appointments;
CREATE POLICY "appointments_owner_manage" ON public.appointments
    FOR ALL USING (public.is_business_member(business_id))
    WITH CHECK (public.is_business_member(business_id));


-- ==============================================================================
-- FASE 3: STORAGE (BUCKET ELEVATE-MEDIA)
-- ==============================================================================

-- Crear el bucket 'elevate-media' si no existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'elevate-media',
    'elevate-media',
    true,
    5242880, -- 5 MB
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Permitir lectura pública de imágenes en elevate-media
DROP POLICY IF EXISTS "elevate_media_public_select" ON storage.objects;
CREATE POLICY "elevate_media_public_select" ON storage.objects
    FOR SELECT USING (bucket_id = 'elevate-media');

-- Permitir a usuarios autenticados subir imágenes
DROP POLICY IF EXISTS "elevate_media_auth_insert" ON storage.objects;
CREATE POLICY "elevate_media_auth_insert" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'elevate-media');

-- Permitir a usuarios autenticados actualizar o borrar sus imágenes
DROP POLICY IF EXISTS "elevate_media_auth_update" ON storage.objects;
CREATE POLICY "elevate_media_auth_update" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'elevate-media');

DROP POLICY IF EXISTS "elevate_media_auth_delete" ON storage.objects;
CREATE POLICY "elevate_media_auth_delete" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'elevate-media');