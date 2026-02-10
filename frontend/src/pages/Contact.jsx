import React from 'react'
import { assets } from '../assets/assets.js'

const Contact = () => {
  return (
    <main className="flex flex-col flex-1">
      <section className="flex flex-1 justify-center px-4 md:px-8 lg:px-40 py-12 md:py-24 bg-white">
        <div className="max-w-[1200px] flex-1">
          <div className="flex flex-col gap-12 md:flex-row md:items-center">
            <div
              className="w-full md:w-1/2 aspect-video md:aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-2xl shadow-xl border border-slate-100"
              style={{ backgroundImage: `url("${assets.contact}")` }}
              aria-hidden
            />
            <div className="flex flex-col gap-6 md:w-1/2">
              <h1 className="text-slate-800 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Get in <span className="text-blue-800">Touch</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                Have questions? We’re here to help. Reach out and we’ll get back to you as soon as we can.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <p className="text-slate-700 font-medium">Email: support@healthcareplus.com</p>
                <p className="text-slate-700 font-medium">Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
