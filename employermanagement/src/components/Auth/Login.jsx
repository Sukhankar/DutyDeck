import React, { useState } from 'react'

const Login = ({ handleLogin, handleRegister, handleForgotPassword }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [view, setView] = useState('login') // 'login' | 'register' | 'forgot'

  // Simulate secure backend call
  const fakeAuth = async (type) => {
    await new Promise((res) => setTimeout(res, 500))
    if (!email || (type !== 'forgot' && !password)) throw new Error('Invalid credentials')
    if (type === 'register') {
      if (!name) throw new Error('Name is required')
      if (password !== confirmPassword) throw new Error('Passwords do not match')
      handleRegister && handleRegister(email, password, name)
    }
    if (type === 'login') handleLogin(email, password)
    if (type === 'forgot') handleForgotPassword && handleForgotPassword(email)
    setEmail('')
    setPassword('')
    setName('')
    setConfirmPassword('')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (view === 'login') await fakeAuth('login')
      if (view === 'register') await fakeAuth('register')
      if (view === 'forgot') await fakeAuth('forgot')
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-4 glass-card">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-6"
          autoComplete="off"
        >
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
            <label htmlFor="email" className="text-blue-100 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Enter your email"
              spellCheck={false}
              inputMode="email"
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            />
          </div>
          {view === 'register' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-blue-100 font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                placeholder="Enter your name"
                spellCheck={false}
              />
            </div>
          )}
          {view !== 'forgot' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-blue-100 font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={view === 'register' ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                placeholder={view === 'register' ? "Create a password" : "Enter your password"}
                spellCheck={false}
                onCopy={e => e.preventDefault()}
                onPaste={e => e.preventDefault()}
                minLength={8}
                maxLength={64}
                autoCapitalize="off"
                autoCorrect="off"
              />
              {view === 'register' && (
                <span className="text-xs text-blue-200/80 mt-1">
                  Password must be at least 8 characters.
                </span>
              )}
            </div>
          )}
          {view === 'register' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-blue-100 font-medium">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                placeholder="Confirm your password"
                spellCheck={false}
                onCopy={e => e.preventDefault()}
                onPaste={e => e.preventDefault()}
                minLength={8}
                maxLength={64}
                autoCapitalize="off"
                autoCorrect="off"
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
              onClick={() => { setView('login'); setError(''); setPassword(''); setName(''); setConfirmPassword(''); }}
              type="button"
            >
              Back to Login
            </button>
          )}
          {view === 'login' && (
            <>
              <button
                className="text-blue-300 hover:underline text-xs"
                onClick={() => { setView('forgot'); setError(''); setPassword(''); setName(''); setConfirmPassword(''); }}
                type="button"
              >
                Forgot Password?
              </button>
              <button
                className="text-blue-300 hover:underline text-xs"
                onClick={() => { setView('register'); setError(''); setPassword(''); setName(''); setConfirmPassword(''); }}
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
      <style>
        {`
          .glass-card {
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border-radius: 1.5rem;
            border: 1px solid rgba(255,255,255,0.18);
          }
        `}
      </style>
    </div>
  )
}

export default Login