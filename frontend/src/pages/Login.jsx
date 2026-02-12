import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: submit login
  }

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
            Welcome back
          </h1>
          <p className="text-slate-500 text-base font-normal leading-normal">
            Securely log in to manage your appointments
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <div className="flex flex-col w-full">
            <label className="flex flex-col w-full">
              <span className="text-slate-700 text-sm font-medium leading-normal pb-2">
                Email address
              </span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 h-14 placeholder:text-slate-400 pl-12 pr-4 py-[15px] text-base text-slate-900 outline-none focus:ring-2 focus:ring-blue-800/30 focus:border-blue-800 transition-colors"
                />
              </div>
            </label>
          </div>

          <div className="flex flex-col w-full">
            <label className="flex flex-col w-full">
              <span className="text-slate-700 text-sm font-medium leading-normal pb-2">
                Password
              </span>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 h-14 placeholder:text-slate-400 pl-12 pr-12 py-[15px] text-base text-slate-900 outline-none focus:ring-2 focus:ring-blue-800/30 focus:border-blue-800 transition-colors"
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
            </label>
          </div>

          <div className="flex items-center justify-between py-2 px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-blue-800 focus:ring-blue-800 size-4"
              />
              <span className="text-xs text-slate-500">Remember me</span>
            </label>
            <a
              href="#"
              className="text-xs font-semibold text-blue-800 hover:text-blue-900 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex h-14 items-center justify-center rounded-lg bg-blue-800 text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-blue-800/20 hover:bg-blue-900 hover:scale-[1.01] transition-all"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-slate-500 pt-4">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-bold text-blue-800 hover:underline transition-colors"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
