import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Header = () => {
  return (
    <section className="py-16">
      <div className="flex flex-col gap-10 md:flex-row-reverse md:items-center">
        <div
          className="w-full md:w-1/2 aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-2xl shadow-xl ring-1 ring-black/5 min-h-[280px]"
          style={{ backgroundImage: `url("${assets.homeImage}")` }}
          aria-hidden
        />
        <div className="flex flex-col gap-8 md:w-1/2">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold w-fit tracking-wider">
              24/7 SUPPORT AVAILABLE
            </span>
            <h1 className="text-slate-800 text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight">
              Expert Care for Your Family's Health.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-[500px]">
              Access top-tier medical specialists and book instant consultations. Reliable healthcare management designed for your peace of mind.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/doctors">
              <button type="button" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-blue-800 text-white text-base font-bold shadow-lg hover:bg-blue-900 transition-all">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header