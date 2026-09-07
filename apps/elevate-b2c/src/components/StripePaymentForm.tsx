import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Loader2 } from 'lucide-react'

interface StripePaymentFormProps {
  amount: number
  clientName: string
  clientEmail: string
  appointmentDetails: any
  onSuccess: (paymentIntentId: string) => void
  onError: (error: string) => void
  isSubmitting: boolean
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  clientName,
  clientEmail,
  appointmentDetails,
  onSuccess,
  onError,
  isSubmitting,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    try {
      // 1. Llamar a la Edge Function de Supabase para obtener el client_secret
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      const res = await fetch(`${supabaseUrl}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          amount,
          currency: 'mxn',
          appointmentDetails,
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Error al inicializar la pasarela de pago')
      }

      // 2. Confirmar el pago con Stripe Elements
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error('No se encontró el elemento de tarjeta')

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: clientName,
              email: clientEmail || undefined,
            },
          },
        }
      )

      if (stripeError) {
        throw new Error(stripeError.message || 'El pago fue rechazado')
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id)
      } else {
        throw new Error('Estado de pago no confirmado')
      }
    } catch (err: any) {
      onError(err.message || 'Ocurrió un error inesperado al procesar el pago')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-2xl border border-[#E2E6EC] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black text-[#6B7B8F] uppercase tracking-wider">
            Tarjeta de Crédito / Débito
          </p>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            Stripe Secure
          </span>
        </div>
        <div className="bg-[#F0F2F5] border border-[#E2E6EC] rounded-xl p-3 focus-within:border-[#0A1628] transition">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '14px',
                  color: '#0A1628',
                  '::placeholder': {
                    color: '#A0ADB8',
                  },
                },
                invalid: {
                  color: '#EF4444',
                },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || isSubmitting}
        className="btn-cta w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {processing || isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Procesando pago con Stripe...
          </>
        ) : (
          <>🔒 Pagar e Inscribir Cita (${amount.toLocaleString()} MXN) →</>
        )}
      </button>
    </form>
  )
}
