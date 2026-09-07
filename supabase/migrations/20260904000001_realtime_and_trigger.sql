-- Habilitar Realtime en la tabla appointments
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;

-- Política adicional para B2B: lectura de appointments autenticada
CREATE POLICY "B2B puede leer todas las citas" ON public.appointments
  FOR SELECT USING (true);

-- Trigger: al confirmar una cita, marca al especialista como 'ocupado'
CREATE OR REPLACE FUNCTION public.mark_specialist_busy()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.specialist_id IS NOT NULL THEN
    UPDATE public.staff_specialists
    SET status = 'ocupado'
    WHERE id = NEW.specialist_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_appointment_created ON public.appointments;
CREATE TRIGGER on_appointment_created
  AFTER INSERT ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.mark_specialist_busy();
