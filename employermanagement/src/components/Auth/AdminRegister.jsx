import React, { useState } from 'react'

const AdminRegister = ({ handleAdminRegister, onBackToLogin }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name || !email || !organization || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      await handleAdminRegister(email, password, name, organization)
      setSuccess('Admin registered successfully!')
      setEmail('')
      setName('')
      setOrganization('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.message || 'Registration failed.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-4 glass-card">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-200 tracking-tight drop-shadow">
          Admin Registration
        </h2>

        {error && (
          <div className="bg-red-500/80 text-white rounded-lg px-4 py-2 text-center text-sm font-semibold shadow">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/80 text-white rounded-lg px-4 py-2 text-center text-sm font-semibold shadow">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-6" autoComplete="off">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-blue-100 font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Enter your full name"
              required
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-blue-100 font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Enter your email"
              required
              spellCheck={false}
              inputMode="email"
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="organization" className="text-blue-100 font-medium">
              Organization
            </label>
            <input
              id="organization"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Enter your organization"
              required
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-blue-100 font-medium">
              Create Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Create a password"
              required
              minLength={8}
              maxLength={64}
              autoCapitalize="off"
              autoCorrect="off"
              onCopy={e => e.preventDefault()}
              onPaste={e => e.preventDefault()}
            />
            <span className="text-xs text-blue-200/80 mt-1">
              Password must be at least 8 characters.
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-blue-100 font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Confirm your password"
              required
              minLength={8}
              maxLength={64}
              autoCapitalize="off"
              autoCorrect="off"
              onCopy={e => e.preventDefault()}
              onPaste={e => e.preventDefault()}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600/80 hover:bg-blue-700/90 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide mt-2"
          >
            Register Admin
          </button>
          <button
            className="text-blue-300 hover:underline text-xs mt-4"
            onClick={onBackToLogin}
            type="button"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister
