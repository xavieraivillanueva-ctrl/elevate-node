-- ==============================================================================
-- CORRECCIÓN DEL TRIGGER PARA USUARIOS CLIENTES (B2C)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_b2b_user()
RETURNS TRIGGER AS $BODY$
DECLARE
    biz_name TEXT;
    biz_type TEXT;
    biz_slug TEXT;
    new_biz_id UUID;
    user_role TEXT;
BEGIN
    -- Verificar si el usuario es un socio B2B o un cliente final B2C
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'client');

    -- Solo crear negocio si es un socio comercial B2B (partner o tiene business_name explícito)
    IF user_role = 'partner' OR NEW.raw_user_meta_data->>'business_name' IS NOT NULL THEN
        biz_name := COALESCE(NEW.raw_user_meta_data->>'business_name', 'Nuevo Negocio');
        biz_type := COALESCE(NEW.raw_user_meta_data->>'business_type', 'barberia');
        biz_slug := lower(regexp_replace(biz_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(NEW.id::text, 1, 6);

        INSERT INTO public.businesses (
            id, name, slug, type, subtitle, address, schedule, is_open
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

        INSERT INTO public.business_owners (user_id, business_id, role)
        VALUES (NEW.id, new_biz_id, 'owner');
    END IF;

    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- Evitar que un fallo al crear negocio bloquee la creación de cuenta del cliente
    RAISE WARNING 'Error en trigger de onboarding: %', SQLERRM;
    RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql SECURITY DEFINER;