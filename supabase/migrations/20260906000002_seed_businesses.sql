-- Semilla inicial de datos para Elevate Node
DO $BODY$
DECLARE
    biz_id UUID;
BEGIN
    INSERT INTO public.businesses (id, name, slug, type, subtitle, address, schedule, is_open)
    VALUES (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'Urban Barbería',
        'urban-barberia',
        'barberia',
        'Cortes Urbanos y Grooming Profesional',
        'Calle 50, Centro, CDMX',
        'Abierto Hoy: 10:00 – 20:00',
        TRUE
    )
    ON CONFLICT (slug) DO UPDATE 
    SET name = EXCLUDED.name, address = EXCLUDED.address, schedule = EXCLUDED.schedule
    RETURNING id INTO biz_id;

    INSERT INTO public.services (business_id, category, name, price, duration_minutes, description, is_active)
    VALUES
        (biz_id, 'Corte', 'Corte Cabello', 550, 30, 'Degradado a elección + perfilado con navaja', TRUE),
        (biz_id, 'Barba', 'Barba Completa', 550, 35, 'Toalla caliente + aceites + delineado perfecto', TRUE),
        (biz_id, 'Combo', 'Corte + Barba', 550, 45, 'Combo insignia con ritual completo', TRUE)
    ON CONFLICT DO NOTHING;

    INSERT INTO public.staff_specialists (business_id, name, role, status, avatar_url, retention_rate, avg_duration_minutes)
    VALUES
        (biz_id, 'Carlos V.', 'Master Barber', 'disponible', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 64.2, 35),
        (biz_id, 'Miguel S.', 'Barba & Navaja', 'ocupado', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 58.9, 45),
        (biz_id, 'Carlos G.', 'Barbero Clásico', 'disponible', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80', 53.0, 40),
        (biz_id, 'Luis R.', 'Técnico Capilar', 'ocupado', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', 61.5, 50),
        (biz_id, 'Miguel M.', 'Barbero Estilista', 'descanso', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 50.0, 30)
    ON CONFLICT DO NOTHING;

END $BODY$;