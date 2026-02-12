import React from 'react'
import { useNavigate } from 'react-router-dom'

const DrCard = ({ doctor }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/appointment/${doctor._id}`)}
      className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="bg-blue-50 aspect-square overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-xs font-semibold uppercase tracking-wider">Available</span>
        </div>
        <p className="text-gray-900 text-lg font-medium mb-1 group-hover:text-blue-800 transition-colors">
          {doctor.name}
        </p>
        <p className="text-gray-600 text-sm">{doctor.speciality}</p>
      </div>
    </div>
  )
}

export default DrCard