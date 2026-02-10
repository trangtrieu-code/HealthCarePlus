import React, { useMemo } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { doctors, specialityData } from '../assets/assets.js'
import DrCard from '../components/DrCard.jsx'

const Doctors = () => {
  const { speciality } = useParams()

  const filterDoc = useMemo(() => {
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
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Filter */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Filter by Specialty</h2>
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/doctors"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-800 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                All Doctors
              </NavLink>
              {specialityData.map((item) => (
                <NavLink
                  key={item.speciality}
                  to={`/doctors/${encodeURIComponent(item.speciality)}`}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.speciality}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Doctor Cards Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filterDoc.map((doctor) => (
              <DrCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Doctors