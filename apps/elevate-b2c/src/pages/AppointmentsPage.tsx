import React from 'react'
import { Calendar, Clock, MapPin, User, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import { useClientAppointments } from '../hooks/useClientAppointments'
import { ElevateLogo } from '../components/ElevateLogo'

interface AppointmentsPageProps {
  onExplore: () => void
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ onExplore }) => {
  const { appointments, loading, error, refetch } = useClientAppointments()

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col pb-24">
      {/* ── Header ────────────────────────────────────── */}
      <header className="bg-white border-b border-[#E2E6EC] px-5 pt-5 pb-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <ElevateLogo variant="light" size="md" showTagline tagline="HISTORIAL DE RESERVAS" />
          <button
            onClick={refetch}
            className="text-xs font-bold text-[#0A1628] hover:text-[#D4A017] transition"
          >
            Actualizar
          </button>
        </div>
      </header>

      {/* ── Main Content ──────────────────────────────── */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-black text-[#0A1628]">Mis Citas Agendadas</h1>
          <p className="text-xs text-[#6B7B8F] mt-1">Revisa el estado de tus citas y anticipos pagados</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#6B7B8F]">
            <Loader2 className="w-8 h-8 animate-spin text-[#0A1628] mb-3" />
            <p className="text-xs font-bold">Consultando tus citas en la nube...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center text-xs text-red-600 font-bold">
            <AlertCircle className="w-5 h-5 mx-auto mb-1" />
            {error}
          </div>
        ) : appointments.length === 0 ? (
          /* ── Empty State Elegante ─────────────────────── */
          <div className="bg-white rounded-3xl border border-[#E2E6EC] p-8 text-center shadow-sm space-y-4 my-6">
            <div className="w-16 h-16 rounded-full bg-[#0A1628]/5 flex items-center justify-center mx-auto text-[#0A1628]">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0A1628]">Aún no tienes citas activas</h3>
              <p className="text-xs text-[#6B7B8F] mt-1 max-w-xs mx-auto">
                Agenda tu próximo corte o sesión de grooming con los mejores especialistas.
              </p>
            </div>
            <button
              onClick={onExplore}
              className="btn-cta w-full max-w-xs mx-auto py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <span>Explorar Negocios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* ── Listado de Citas ────────────────────────── */
          <div className="space-y-4">
            {appointments.map((appt) => {
              const isPaid = appt.paymentStatus === 'pagado'
              return (
                <div
                  key={appt.id}
                  className="bg-white rounded-2xl border border-[#E2E6EC] p-5 shadow-sm space-y-3 transition hover:border-[#0A1628]"
                >
                  {/* Fila superior: Negocio y Badge de Pago */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-[#0A1628]">{appt.businessName}</h3>
                      <p className="text-xs font-semibold text-[#D4A017]">{appt.serviceName}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isPaid
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}
                    >
                      {isPaid ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {isPaid ? 'Anticipo Pagado' : 'Pago Pendiente'}
                    </span>
                  </div>

                  <div className="h-px bg-[#E2E6EC]" />

                  {/* Fila intermedia: Detalles de Fecha y Especialista */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-[#1A2B45]">
                      <Calendar className="w-4 h-4 text-[#6B7B8F] shrink-0" />
                      <span className="font-bold">{appt.appointmentDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1A2B45]">
                      <Clock className="w-4 h-4 text-[#6B7B8F] shrink-0" />
                      <span className="font-bold">{appt.timeSlot} hrs</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1A2B45] col-span-2 mt-1">
                      <User className="w-4 h-4 text-[#6B7B8F] shrink-0" />
                      <span>Especialista: <strong className="text-[#0A1628]">{appt.specialistName}</strong></span>
                    </div>
                  </div>

                  {/* Fila inferior: Total */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#F0F2F5] text-xs">
                    <span className="text-[#6B7B8F]">Total de Servicio</span>
                    <span className="font-black text-sm text-[#0A1628]">
                      ${appt.totalPrice.toLocaleString()} MXN
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
