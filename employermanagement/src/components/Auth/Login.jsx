import React, { useState } from 'react'

const Login = ({ handleLogin, handleRegister, handleForgotPassword }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [view, setView] = useState('login') // 'login' | 'register' | 'forgot'

  const validateCredentials = () => {
    if (!email) throw new Error('Email is required')
    if (view !== 'forgot' && !password) throw new Error('Password is required')
    if (view === 'register') {
      if (!name) throw new Error('Name is required')
      if (password !== confirmPassword) throw new Error('Passwords do not match')
      if (password.length < 8) throw new Error('Password must be at least 8 characters')
    }
  }

  const handleAuth = async (type) => {
    await new Promise((res) => setTimeout(res, 500))
    validateCredentials()
    
    switch (type) {
      case 'register':
        handleRegister?.(email, password, name)
        break
      case 'login':
        handleLogin(email, password)
        break
      case 'forgot':
        handleForgotPassword?.(email)
        break
      default:
        throw new Error('Invalid authentication type')
    }

    // Reset form fields
    setEmail('')
    setPassword('')
    setName('')
    setConfirmPassword('')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await handleAuth(view)
    } catch (err) {
      setError(err.message || 'Authentication failed')
    }
  }

  const switchView = (newView) => {
    setView(newView)
    setError('')
    setPassword('')
    setName('')
    setConfirmPassword('')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-4 glass-card">
        <form onSubmit={submitHandler} className="flex flex-col gap-6" autoComplete="off">
          <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-200 tracking-tight drop-shadow">
            {view === 'login' && 'Login'}
            {view === 'register' && 'Register'}
            {view === 'forgot' && 'Forgot Password'}
          </h2>
          
          {error && (
            <div className="bg-red-500/80 text-white rounded-lg px-4 py-2 text-center text-sm font-semibold shadow">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-blue-100 font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Enter your email"
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            />
          </div>

          {view === 'register' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-blue-100 font-medium">Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                placeholder="Enter your name"
              />
            </div>
          )}

          {view !== 'forgot' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-blue-100 font-medium">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                placeholder={view === 'register' ? "Create a password" : "Enter your password"}
                minLength={8}
                maxLength={64}
              />
            </div>
          )}

          {view === 'register' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-blue-100 font-medium">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                placeholder="Confirm your password"
                minLength={8}
                maxLength={64}
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600/80 hover:bg-blue-700/90 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide mt-2"
          >
            {view === 'login' && 'Login'}
            {view === 'register' && 'Register'}
            {view === 'forgot' && 'Send Reset Link'}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
          {view !== 'login' && (
            <button
              className="text-blue-300 hover:underline text-xs"
              onClick={() => switchView('login')}
              type="button"
            >
              Back to Login
            </button>
          )}
          {view === 'login' && (
            <>
              <button
                className="text-blue-300 hover:underline text-xs"
                onClick={() => switchView('forgot')}
                type="button"
              >
                Forgot Password?
              </button>
              <button
                className="text-blue-300 hover:underline text-xs"
                onClick={() => switchView('register')}
                type="button"
              >
                Register
              </button>
            </>
          )}
        </div>

        <div className="mt-6 text-center text-blue-300/80 text-xs">
          &copy; {new Date().getFullYear()} Employer Management. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Login