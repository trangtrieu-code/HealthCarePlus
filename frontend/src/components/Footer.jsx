import React from 'react'
import { Settings, Share2 } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 px-6 sm:px-10 py-8 mt-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="font-semibold text-blue-800">HealthCare Plus</span>
          <span>© 2026 All rights reserved</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-600 hover:text-blue-800">Privacy Policy</a>
          <a href="#" className="text-slate-600 hover:text-blue-800">Terms of Service</a>
          <a href="#" className="text-slate-600 hover:text-blue-800">Accessibility</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer