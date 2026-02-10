import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { doctors } from '../assets/assets.js'
import DrCard from '../components/DrCard.jsx'

const Doctors = () => {
  const { speciality } = useParams()

  const filteredDoctors = useMemo(() => {
    if (!speciality) {
      return doctors
    }
    return doctors.filter(doctor =>
      doctor.speciality.toLowerCase() === decodeURIComponent(speciality).toLowerCase()
    )
  }, [speciality])

  return (
    <main className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {speciality ? `${decodeURIComponent(speciality)} Doctors` : 'All Doctors'}
        </h1>
        <p className="text-slate-600">Discover top-rated specialists for your healthcare needs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <DrCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </main>
  )
}

export default Doctors