-- ==============================================================================
-- FASE B: TRIGGER DE AUTO-ONBOARDING PARA SOCIOS B2B
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_b2b_user()
RETURNS TRIGGER AS $BODY$
DECLARE
    biz_name TEXT;
    biz_type TEXT;
    biz_slug TEXT;
    new_biz_id UUID;
BEGIN
    -- 1. Obtener nombre y giro del negocio desde metadata o fallback
    biz_name := COALESCE(NEW.raw_user_meta_data->>'business_name', 'Nuevo Negocio');
    biz_type := COALESCE(NEW.raw_user_meta_data->>'business_type', 'barberia');
    
    -- 2. Generar slug único basado en el nombre y los primeros 6 caracteres del UUID
    biz_slug := lower(regexp_replace(biz_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(NEW.id::text, 1, 6);

    -- 3. Crear el nuevo negocio en public.businesses (cerrado por defecto mientras configura)
    INSERT INTO public.businesses (
        id,
        name,
        slug,
        type,
        subtitle,
        address,
        schedule,
        is_open
    )
    VALUES (
        uuid_generate_v4(),
        biz_name,
        biz_slug,
        biz_type,
        'Configura el subtítulo y servicios de tu negocio',
        'Ingresa tu dirección en Ajustes',
        'Lun a Sab: 10:00 – 20:00',
        false
    )
    RETURNING id INTO new_biz_id;

    -- 4. Vincular al usuario autenticado como 'owner' en public.business_owners
    INSERT INTO public.business_owners (
        user_id,
        business_id,
        role
    )
    VALUES (
        NEW.id,
        new_biz_id,
        'owner'
    );

    RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar trigger previo si existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Activar trigger tras cada registro en auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_b2b_user();