import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: '2022-11-15',
})

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET') ?? ''

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  let event: Stripe.Event

  try {
    if (endpointSecret && signature) {
      event = await stripe.webhooks.constructEventAsync(body, signature, endpointSecret)
    } else {
      event = JSON.parse(body)
    }
  } catch (err: any) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`)
    return new Response(JSON.stringify({ error: err.message }), { status: 400 })
  }

  // Manejar el evento payment_intent.succeeded
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const meta = paymentIntent.metadata || {}

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Si metadata contiene información de la cita, creamos o confirmamos la cita
    if (meta.businessId) {
      console.log(`✅ Procesando cita confirmada para: ${meta.clientName} ($${paymentIntent.amount / 100})`)

      const appointmentData = {
        business_id: meta.businessId,
        service_id: meta.serviceId || null,
        specialist_id: meta.specialistId || null,
        user_id: meta.clientId || null,
        client_name: meta.clientName || 'Cliente Stripe',
        client_phone: meta.clientPhone || '',
        client_email: meta.clientEmail || '',
        appointment_date: meta.appointmentDate || new Date().toISOString().split('T')[0],
        time_slot: meta.timeSlot || '12:00',
        total_price: paymentIntent.amount / 100,
        payment_status: 'pagado',
        status: 'confirmada',
        notes: `Stripe PaymentIntent ID: ${paymentIntent.id}`,
      }

      const { error: insertError } = await supabaseAdmin
        .from('appointments')
        .insert(appointmentData)

      if (insertError) {
        console.error('❌ Error al registrar cita en Postgres:', insertError)
        return new Response(JSON.stringify({ error: insertError.message }), { status: 500 })
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
