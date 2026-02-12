import React from 'react'
import { Link } from 'react-router-dom'
import { specialityData } from '../../assets/assets.js'

const SpecialityMenu = () => {
  // Map specialty names to Material Symbols icons
  const iconMap = {
    'Primary care': 'medical_services',
    'General physician': 'stethoscope',
    'Cardiologist': 'cardiology',
    'Dermatologist': 'dermatology',
    'Gynecologist': 'pregnant_woman',
    'Pediatrician': 'child_care',
    'Psychiatrist': 'psychology',
    'Orthopedic': 'orthopedics',
  }

  return (
    <section className="py-20">
      <div className="flex flex-wrap justify-between items-end gap-4 px-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Browse by Department</h2>
          <p className="text-slate-600 mt-2">Specialized care for every medical requirement</p>
        </div>
        <Link to="/doctors" className="text-blue-800 font-bold flex items-center gap-1 hover:underline underline-offset-4">
          Explore All Departments
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {specialityData.map((speciality) => {
          const icon = iconMap[speciality.speciality] || 'medical_services';
          
          return (
            <Link 
              key={speciality.speciality} 
              to={`/doctors/${encodeURIComponent(speciality.speciality)}`} 
              className="flex flex-col items-center p-8 bg-white border border-slate-200 rounded-2xl hover:border-blue-800/30 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="size-16 bg-slate-50 text-blue-800 rounded-full flex items-center justify-center mb-5 group-hover:bg-blue-800 group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">{icon}</span>
              </div>
              <span className="font-bold text-center text-slate-800">{speciality.speciality}</span>
            </Link>
          );
        })}
      </div>
    </section>
  )
}

export default SpecialityMenu