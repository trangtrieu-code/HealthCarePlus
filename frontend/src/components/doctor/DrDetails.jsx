import React from 'react'
import { BadgeCheck, Info } from 'lucide-react'

const DrDetails = ({ docInfo, currencySymbol }) => {
  if (!docInfo) return null

  return (
    <aside className="md:col-span-4 lg:col-span-3 h-full flex">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-0">
        <div className="aspect-square relative">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-800">{docInfo.name}</h1>
            <BadgeCheck className="w-5 h-5 text-blue-800 shrink-0" aria-hidden />
          </div>
          <p className="text-slate-500 text-sm mb-4">
            {docInfo.degree} - {docInfo.speciality}
          </p>
          <div className="flex items-center justify-between text-sm py-3 border-t border-slate-100">
            <span className="text-slate-500">Experience</span>
            <span className="font-semibold px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-700">
              {docInfo.experience} Years
            </span>
          </div>
          <div className="flex items-center justify-between text-sm py-3 border-t border-slate-100">
            <span className="text-slate-500">Consultation Fee</span>
            <span className="font-bold text-slate-800">
              {currencySymbol}{docInfo.fee}
            </span>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-4">
            <h2 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-2">
              About
              <Info className="w-4 h-4 text-slate-400 shrink-0" aria-hidden />
            </h2>
            <p className="text-sm leading-relaxed text-slate-500">
              {docInfo.about}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default DrDetails