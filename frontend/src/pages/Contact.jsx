import React from 'react'
import { Phone, Mail } from 'lucide-react'
import { assets } from '../assets/assets.js'

const Contact = () => {
  return (
    <main className="px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
        Contact Our Team.
      </h1>
      <p className="text-slate-600 max-w-2xl mb-12">
        We're dedicated to providing you with the best healthcare experience. Reach out with any questions about appointments, services, or technical support.
      </p>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 lg:items-stretch">
        {/* Form */}
        <div className="bg-white p-8 sm:p-10 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Send us a message</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                className="w-full h-11 px-4 rounded-lg border border-slate-300 text-slate-800 placeholder:text-slate-400"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full h-11 px-4 rounded-lg border border-slate-300 text-slate-800 placeholder:text-slate-400"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full h-11 px-4 rounded-lg border border-slate-300 text-slate-800 placeholder:text-slate-400"
              placeholder="john.doe@healthcare.com"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <select className="w-full h-11 px-4 rounded-lg border border-slate-300 text-slate-800 bg-white">
              <option>Appointment Inquiry</option>
              <option>Technical Support</option>
              <option>Billing Questions</option>
              <option>General Feedback</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-800 placeholder:text-slate-400 resize-y"
              placeholder="Please describe how we can assist you..."
            />
          </div>

          <button
            type="button"
            className="mt-6 w-full h-12 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900"
          >
            Submit Message
          </button>
        </div>

        {/* Contact Info & Image - same height as form */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0">
              <Phone className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800">Call Us</h3>
              <p className="text-sm text-slate-600 mt-0.5">Mon–Fri 8am–6pm. We’re here to help.</p>
              <p className="text-slate-800 font-medium mt-1">+1 (555) 000-HEALTH</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0">
              <Mail className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800">Email Support</h3>
              <p className="text-sm text-slate-600 mt-0.5">We typically respond within 24 hours.</p>
              <p className="text-slate-800 font-medium mt-1">support@h-plus.com</p>
            </div>
          </div>
          <div
            className="flex-1 min-h-[200px] rounded-xl overflow-hidden border border-slate-200 bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url("${assets.contact}")` }}
            aria-hidden
          />
        </div>
      </div>
    </main>
  )
}

export default Contact
