import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { User, Calendar, FileText, CreditCard, Settings, Pencil } from 'lucide-react'
import { assets } from '../assets/assets.js'

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    gender: 'Male',
    birthday: '1992-05-15',
    email: 'john.doe@example.com',
    phone: '+1 (555) 000-1234',
    address: { line1: '123 Health St, Medical District', line2: 'NY 10001' },
  })
  const [errors, setErrors] = useState({})
  // After first save, gender and birthday are read-only
  const [genderBirthdayLocked, setGenderBirthdayLocked] = useState(false)

  const validate = () => {
    const next = {}
    const name = profile.name?.trim()
    if (!name) next.name = 'Name is required'
    else if (name.length < 2) next.name = 'Name must be at least 2 characters'

    if (!genderBirthdayLocked) {
      const bday = profile.birthday?.trim()
      if (!bday) next.birthday = 'Birthday is required'
      else if (new Date(bday) > new Date()) next.birthday = 'Birthday cannot be in the future'
    }

    const email = profile.email?.trim()
    if (!email) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email'

    if (!profile.phone?.trim()) next.phone = 'Phone number is required'

    const line1 = profile.address?.line1?.trim()
    const line2 = profile.address?.line2?.trim()
    if (!line1) next.addressLine1 = 'Address line 1 is required'
    if (!line2) next.addressLine2 = 'Address line 2 is required'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }
  const handleAddressChange = (line, value) => {
    setProfile((prev) => ({
      ...prev,
      address: { ...prev.address, [line]: value },
    }))
    const key = line === 'line1' ? 'addressLine1' : 'addressLine2'
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsEditing(false)
    setErrors({})
    setGenderBirthdayLocked(true)
    // TODO: submit to API
  }

  const navItems = [
    { to: '/my-profile', icon: User, label: 'Profile' },
    { to: '/my-appointments', icon: Calendar, label: 'My Appointments' },
    { to: '#', icon: FileText, label: 'Medical Records' },
    { to: '#', icon: CreditCard, label: 'Payments' },
    { to: '#', icon: Settings, label: 'Settings' },
  ]

  const inputClass =
    'w-full rounded-xl border bg-white h-11 px-4 text-sm text-slate-800 outline-none transition-colors focus:border-blue-800'
  const getInputClass = (field) =>
    `${inputClass} ${errors[field] ? 'border-red-500' : 'border-slate-200'}`
  const labelClass =
    'text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-1.5 block'
  const errorClass = 'text-red-600 text-xs mt-1'

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col lg:flex-row gap-6 p-6">
      {/* Sidebar */}
      <aside className="flex w-full flex-col gap-6 lg:w-72">
        <div className="flex flex-col bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex gap-3 items-center">
              <div
                className="rounded-full size-12 bg-cover bg-center bg-no-repeat border border-slate-200 shrink-0"
                style={{ backgroundImage: `url(${assets.userImage})` }}
                role="img"
                aria-label="Profile photo"
              />
              <div className="flex flex-col min-w-0">
                <h1 className="text-slate-800 text-base font-bold leading-none truncate">
                  {profile.name}
                </h1>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map(({ to, icon: Icon, label }) =>
                to.startsWith('#') ? (
                  <a
                    key={label}
                    href={to}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{label}</span>
                  </a>
                ) : (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-800 text-white font-semibold shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm">{label}</span>
                  </NavLink>
                )
              )}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content – single card, no repeated fields */}
      <main className="flex-1 flex flex-col gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-8 py-5 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div
                className="rounded-full size-16 sm:size-20 bg-cover bg-center bg-no-repeat border-2 border-slate-100 shrink-0"
                style={{ backgroundImage: `url(${assets.userImage})` }}
                role="img"
                aria-label="Profile photo"
              />
              <div>
                <h2 className="text-slate-800 text-xl font-bold">
                  Account Details
                </h2>
                <p className="text-slate-600 text-sm mt-0.5">
                  Manage your personal information.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsEditing(!isEditing)
                if (isEditing) setErrors({})
              }}
              className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-blue-800 text-white font-bold text-sm tracking-wide transition-all hover:bg-blue-900 shadow-lg shrink-0"
            >
              <Pencil className="w-5 h-5" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          <form onSubmit={handleSave} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <label className="flex flex-col">
                <span className={labelClass}>Full Name</span>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={getInputClass('name')}
                    />
                    {errors.name && (
                      <span className={errorClass}>{errors.name}</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-800 font-semibold">
                    {profile.name}
                  </span>
                )}
              </label>
              <label className="flex flex-col">
                <span className={labelClass}>Gender</span>
                {isEditing && !genderBirthdayLocked ? (
                  <select
                    value={profile.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className={getInputClass('gender')}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <span className="text-slate-800 font-semibold">
                    {profile.gender}
                  </span>
                )}
              </label>
              <label className="flex flex-col">
                <span className={labelClass}>Birthday</span>
                {isEditing && !genderBirthdayLocked ? (
                  <>
                    <input
                      type="date"
                      value={profile.birthday}
                      onChange={(e) => handleChange('birthday', e.target.value)}
                      className={getInputClass('birthday')}
                    />
                    {errors.birthday && (
                      <span className={errorClass}>{errors.birthday}</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-800 font-semibold">
                    {profile.birthday}
                  </span>
                )}
              </label>
              <label className="flex flex-col md:col-span-2">
                <span className={labelClass}>Email Address</span>
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={getInputClass('email')}
                    />
                    {errors.email && (
                      <span className={errorClass}>{errors.email}</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-800 font-semibold">
                    {profile.email}
                  </span>
                )}
              </label>
              <label className="flex flex-col md:col-span-2">
                <span className={labelClass}>Phone Number</span>
                {isEditing ? (
                  <>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={getInputClass('phone')}
                    />
                    {errors.phone && (
                      <span className={errorClass}>{errors.phone}</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-800 font-semibold">
                    {profile.phone}
                  </span>
                )}
              </label>
              <label className="flex flex-col">
                <span className={labelClass}>Address line 1</span>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={profile.address?.line1 ?? ''}
                      onChange={(e) => handleAddressChange('line1', e.target.value)}
                      className={getInputClass('addressLine1')}
                    />
                    {errors.addressLine1 && (
                      <span className={errorClass}>{errors.addressLine1}</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-800 font-semibold">
                    {profile.address?.line1 ?? ''}
                  </span>
                )}
              </label>
              <label className="flex flex-col">
                <span className={labelClass}>Address line 2</span>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={profile.address?.line2 ?? ''}
                      onChange={(e) => handleAddressChange('line2', e.target.value)}
                      className={getInputClass('addressLine2')}
                    />
                    {errors.addressLine2 && (
                      <span className={errorClass}>{errors.addressLine2}</span>
                    )}
                  </>
                ) : (
                  <span className="text-slate-800 font-semibold">
                    {profile.address?.line2 ?? ''}
                  </span>
                )}
              </label>
            </div>
            {isEditing && (
              <div className="mt-8">
                <button
                  type="submit"
                  className="rounded-lg h-11 px-6 bg-blue-800 text-white font-bold text-sm hover:bg-blue-900 transition-colors"
                >
                  Save changes
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}

export default MyProfile