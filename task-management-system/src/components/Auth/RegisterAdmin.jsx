import { useState } from "react";
import API from "../../api";

export default function RegisterAdmin() {
  const [form, setForm] = useState({ name: "", email: "", password: "", organization: "" });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register-admin", form);
      alert("Admin registered successfully!");
      setForm({ name: "", email: "", password: "", organization: "" });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-4 glass-card">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-200 tracking-tight drop-shadow">
            Admin Registration
          </h2>
          {error && (
            <div className="bg-red-500/80 text-white rounded-lg px-4 py-2 text-center text-sm font-semibold shadow">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-blue-100 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-blue-100 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-blue-100 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="organization" className="text-blue-100 font-medium">
              Organization
            </label>
            <select
              id="organization"
              required
              value={form.organization}
              onChange={e => setForm({ ...form, organization: e.target.value })}
              className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            >
              <option value="" disabled style={{ backgroundColor: "rgba(30,41,59,0.95)", color: "#93c5fd" }}>
                Select your organization
              </option>
              <option value="MERN stack" style={{ backgroundColor: "rgba(30,41,59,0.95)", color: "#93c5fd" }}>
                MERN stack
              </option>
              <option value="AI software development" style={{ backgroundColor: "rgba(30,41,59,0.95)", color: "#93c5fd" }}>
                AI software development
              </option>
              <option value="App development" style={{ backgroundColor: "rgba(30,41,59,0.95)", color: "#93c5fd" }}>
                App development
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600/80 hover:bg-blue-700/90 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide mt-2"
          >
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
}
