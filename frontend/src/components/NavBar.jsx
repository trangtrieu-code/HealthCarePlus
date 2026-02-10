import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Diamond, ChevronDown } from 'lucide-react'
import { assets } from '../assets/assets.js'

const NavBar = () => {
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const getNavLinkClassName = ({ isActive }) => 
    isActive ? "nav-link-active" : "nav-link"

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true) // token is true if the user is logged in

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    // if the dropdown is open, add a event listener to the document to close the dropdown when clicking outside
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])


  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-6 sm:px-10 py-3 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-6 sm:gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-blue-800">
          <Diamond className="size-5 shrink-0 text-sky-400 fill-current" />
          <span className="text-lg font-bold">HealthCare Plus</span>
        </Link>
        {/* Navigation */}
        <nav className="flex items-center gap-6 sm:gap-9 text-sm font-medium text-slate-700">
          <NavLink to="/doctors" end className={getNavLinkClassName}>
            All Doctors
          </NavLink>
          <NavLink to="/about" className={getNavLinkClassName}>
            About
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClassName}>
            Contact
          </NavLink>
        </nav>
      </div>
      {/* User actions */}
      <div className="flex items-center gap-3">
        {token ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {/* User profile image */}
              <img 
                src={assets.userImage} 
                alt="User profile" 
                className="size-10 rounded-full object-cover border-2 border-slate-200 hover:border-blue-800 transition-colors"
              />
              {/* Dropdown arrow */}
              <ChevronDown className={`size-4 text-slate-600 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                {/* My Profile */}
                <button
                  type="button"
                  onClick={() => {
                    navigate('/my-profile')
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  My Profile
                </button>
                {/* My Appointments */}
                <button
                  type="button"
                  onClick={() => {
                    navigate('/my-appointments')
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  My Appointments
                </button>
                <div className="border-t border-slate-200 my-1" />
                {/* Logout */}
                <button
                  type="button"
                  onClick={() => {
                    setToken(false)
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Sign In */}
            <button 
              type="button" 
              onClick={() => navigate('/login')}
              className="h-10 px-5 rounded-lg bg-blue-800 text-white text-sm font-semibold hover:bg-blue-900"
            >
              Sign In
            </button>
            {/* Register */}
            <button 
              type="button" 
              onClick={() => navigate('/register')}
              className="h-10 px-5 rounded-lg border-2 border-slate-200 text-slate-800 text-sm font-semibold hover:bg-slate-50"
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default NavBar