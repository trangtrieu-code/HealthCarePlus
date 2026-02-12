import React from 'react'
import { Calendar } from 'lucide-react'

const getDayLabel = (date) => {
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
}

const getDayDate = (date) => {
  return date.getDate()
}

const BookingSlots = ({
  docSlots,
  slotIndex,
  selectedTime,
  onDaySelect,
  onTimeSelect,
  onBook,
  hasDoctorCard = true,
}) => {
  if (!docSlots || docSlots.length === 0) return null

  const daySlots = docSlots[slotIndex]?.slots ?? []
  const colSpan = hasDoctorCard
    ? 'md:col-span-8 lg:col-span-9'
    : 'md:col-span-12'

  return (
    <div className={`${colSpan} mt-8 md:mt-0 h-full flex min-h-0`}>
      <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Book Appointment
            </h2>
            <p className="text-slate-500">
              Select your preferred date and time to secure your consultation.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
              Select Date
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4">
              {docSlots.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onDaySelect(index)}
                  className={`w-full min-h-[5rem] sm:min-h-[7rem] flex flex-col items-center justify-center rounded-[32px] transition-all ${
                    slotIndex === index
                      ? 'bg-blue-800 text-white shadow-xl shadow-blue-800/20 sm:scale-105'
                      : 'border-2 border-slate-100 text-slate-600 hover:border-blue-800'
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${
                      slotIndex === index ? 'opacity-70' : 'text-slate-400'
                    }`}
                  >
                    {getDayLabel(day.date)}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold">{getDayDate(day.date)}</span>
                  {slotIndex === index && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
              Available Slots
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {daySlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    onTimeSelect(selectedTime?.time === slot.time ? null : slot)
                  }
                  className={`py-3.5 rounded-2xl border-2 text-sm font-semibold transition-all ${
                    selectedTime?.time === slot.time
                      ? 'bg-blue-800 text-white border-blue-800 shadow-lg ring-4 ring-blue-800/10'
                      : 'border-slate-100 text-slate-600 hover:border-blue-800 hover:text-blue-800'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onBook}
          className="w-full bg-blue-800 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-800/20 hover:bg-blue-900 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 mt-auto shrink-0"
        >
          <Calendar className="w-5 h-5" aria-hidden />
          Book an appointment
        </button>
      </div>
    </div>
  )
}

export default BookingSlots