import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Info } from 'lucide-react'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    // TODO: submit registration
  } 

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-slate-50 h-14 placeholder:text-slate-400 px-4 py-[15px] text-base text-slate-900 outline-none focus:ring-2 focus:ring-blue-800/30 focus:border-blue-800 transition-colors'

  return (
    <div
      className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: 'radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-[500px] border border-slate-200">
        <div className="text-center mb-2">
          <h1 className="text-slate-900 text-[32px] font-bold leading-tight tracking-tight pb-2">
            Create a Secure Account
          </h1>
          <p className="text-slate-500 text-base font-normal leading-normal">
            Enter your details to access your healthcare dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 mt-8">
          <label className="flex flex-col w-full">
            <span className="text-slate-700 text-sm font-medium leading-normal pb-2">
              Full Name
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col w-full">
            <span className="text-slate-700 text-sm font-medium leading-normal pb-2">
              Email Address
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col w-full">
            <span className="text-slate-700 text-sm font-medium leading-normal pb-2">
              Password
            </span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0" />
              Minimum 8 characters with at least one symbol.
            </p>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-slate-700 text-sm font-medium leading-normal pb-2">
              Confirm Password
            </span>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-[11px] text-red-600 mt-1.5">
                Passwords do not match.
              </p>
            )}
          </label>

          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 size-4 rounded border-slate-300 text-blue-800 focus:ring-blue-800 cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-xs text-slate-500 leading-normal cursor-pointer"
            >
              I agree to the{' '}
              <a href="#" className="text-blue-800 font-bold hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-800 font-bold hover:underline">
                Privacy Policy
              </a>{' '}
              regarding my medical data.
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex h-14 items-center justify-center rounded-lg bg-blue-800 text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-blue-800/20 hover:bg-blue-900 hover:scale-[1.01] transition-all"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-slate-500 pt-2">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-blue-800 hover:underline transition-colors"
            >
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register