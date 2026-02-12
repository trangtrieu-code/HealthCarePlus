import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, CreditCard, XCircle, PlusCircle } from 'lucide-react'
import { AppContext } from '../context/AppContext.jsx'

// Sample appointments: docId references a doctor in AppContext; lab entries have no docId
const SAMPLE_APPOINTMENTS = [
  { id: '1', docId: 'dr7', dateTime: 'Monday, Oct 24 • 10:00 AM' },
  { id: '2', docId: 'dr4', dateTime: 'Wednesday, Oct 26 • 02:30 PM' },
]

const MyAppointment = () => {
  const { doctors } = useContext(AppContext)
  const [status, setStatus] = useState(() =>
    Object.fromEntries(SAMPLE_APPOINTMENTS.map((a) => [a.id, { paid: false, cancelled: false }]))
  )

  const getDoctor = (docId) => doctors.find((d) => d._id === docId)

  const setPaid = (id) => {
    setStatus((prev) => ({ ...prev, [id]: { ...prev[id], paid: true } }))
  }
  const setCancelled = (id) => {
    setStatus((prev) => ({ ...prev, [id]: { ...prev[id], cancelled: true } }))
  }

  return (
    <main className="flex flex-1 justify-center py-12 px-4 md:px-10 lg:px-40">
      <div className="flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 pb-8">
          <div className="flex min-w-72 flex-col gap-1">
            <h1 className="text-slate-800 text-3xl font-extrabold leading-tight tracking-tight">
              My Appointments
            </h1>
            <p className="text-slate-500 text-base font-normal">
              Manage and track your upcoming healthcare visits
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {SAMPLE_APPOINTMENTS.map((apt) => {
            const doctor = apt.docId ? getDoctor(apt.docId) : null
            const title = doctor ? doctor.name : apt.title
            const subtitle = doctor
              ? `${doctor.speciality} • ${[doctor.address?.line1, doctor.address?.line2].filter(Boolean).join(', ')}`
              : apt.subtitle
            const image = doctor ? doctor.image : apt.image
            const imageAlt = doctor ? `Portrait of ${doctor.name}` : apt.imageAlt
            const { paid, cancelled } = status[apt.id] || { paid: false, cancelled: false }
            if (apt.docId && !doctor) return null
            return (
              <div key={apt.id} className="group">
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-xl bg-white p-6 shadow-sm border border-slate-200 transition-shadow hover:shadow-md">
                  <div className="flex flex-[2_2_0px] flex-col justify-between gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-blue-800 font-bold">
                        <CalendarDays className="w-4 h-4 shrink-0" />
                        <p className="text-xs uppercase tracking-widest">{apt.dateTime}</p>
                      </div>
                      <div>
                        <p className="text-slate-800 text-xl font-bold leading-tight">
                          {title}
                        </p>
                        <p className="text-slate-500 text-sm font-medium mt-1">{subtitle}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {paid ? (
                        <span className="flex min-w-[100px] items-center justify-center rounded-lg h-10 px-4 gap-2 text-sm font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <CreditCard className="w-5 h-5 shrink-0" />
                          Paid
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPaid(apt.id)}
                          className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 gap-2 text-sm font-bold bg-blue-800 text-white hover:bg-blue-700 shadow-sm transition-all"
                        >
                          <CreditCard className="w-5 h-5 shrink-0" />
                          Pay Here
                        </button>
                      )}
                      {cancelled ? (
                        <span className="flex min-w-[100px] items-center justify-center rounded-lg h-10 px-4 gap-2 text-sm font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <XCircle className="w-5 h-5 shrink-0" />
                          Cancelled
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCancelled(apt.id)}
                          className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 gap-2 text-sm font-bold bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors"
                        >
                          <XCircle className="w-5 h-5 shrink-0" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  <div
                    className="w-full md:w-48 bg-center bg-no-repeat aspect-video md:aspect-square bg-cover rounded-lg grayscale-[20%] group-hover:grayscale-0 transition-all"
                    style={{
                      backgroundImage: `url(${typeof image === 'string' ? image : image})`,
                    }}
                    role="img"
                    aria-label={imageAlt}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default MyAppointment