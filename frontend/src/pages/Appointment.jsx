import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DrDetails from '../components/doctor/DrDetails'
import BookingSlots from '../components/appointment/BookingSlots'
import RelatedDoctors from '../components/doctor/RelatedDoctors'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState(null)
  const [slotIndex, setSlotIndex] = useState(0)
  const [selectedTime, setSelectedTime] = useState(null)

  const fetchDocInfo = async () => {
    const found = doctors.find(doctor => doctor._id === docId)
    setDocInfo(found)
  }

  const fetchDocSlots = () => {
    const today = new Date()
    const slotsByDay = []

    // Start from tomorrow; only include weekdays (Mon–Fri)
    let date = new Date(today)
    date.setDate(date.getDate() + 1)

    let weekdaysCollected = 0
    const maxWeekdays = 7

    // collect weekdays until maxWeekdays is reached
    while (weekdaysCollected < maxWeekdays) {
      const dayOfWeek = date.getDay() // 0 = Sun, 6 = Sat
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        date.setDate(date.getDate() + 1)
        continue
      }

      const dayStart = new Date(date)
      dayStart.setHours(10, 0, 0, 0)

      const endTime = new Date(date)
      endTime.setHours(17, 0, 0, 0)

      const currentDate = new Date(dayStart)
      const timeSlots = []

      // collect time slots until endTime is reached
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })
        currentDate.setMinutes(currentDate.getMinutes() + 60)
      }

      // add time slots to slotsByDay array
      slotsByDay.push({ date: new Date(date), slots: timeSlots })
      weekdaysCollected++
      date.setDate(date.getDate() + 1)
    }

    setDocSlots(slotsByDay)
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [docId])

  useEffect(() => {
    fetchDocSlots()
  }, [doctors, docId])

  const handleDaySelect = (index) => {
    setSlotIndex(index)
    setSelectedTime(null)
  }

  const handleBook = () => {
    // TODO: submit booking (selectedTime, slotIndex, docId)
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Doctor details */}
          {docInfo && (
            <DrDetails docInfo={docInfo} currencySymbol={currencySymbol} />
          )}

          {/* Booking slots */}
          {docSlots && docSlots.length > 0 && (
            <BookingSlots
              docSlots={docSlots}
              slotIndex={slotIndex}
              selectedTime={selectedTime}
              onDaySelect={handleDaySelect}
              onTimeSelect={setSelectedTime}
              onBook={handleBook}
              hasDoctorCard={!!docInfo}
            />
          )}
        </div>
      </div>

      {docInfo && (
        <div className="max-w-[1200px] mr-auto px-6 lg:px-10 w-full">
          <RelatedDoctors
            docId={docId}
            speciality={docInfo.speciality}
            doctors={doctors}
          />
        </div>
      )}
    </>
  )
}

export default Appointment