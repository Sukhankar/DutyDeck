import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp + new password
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      const res = await API.post("/auth/forgot-password", { email: form.email });
      setMessage(res.data.message);
      setError("");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      setMessage("");
    }
  };

  const resetPassword = async () => {
    try {
      const res = await API.post("/auth/reset-password", {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
      });
      setMessage(res.data.message);
      setError("");
      setStep(1);
      setForm({ email: "", otp: "", newPassword: "" });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-4 glass-card">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-200 tracking-tight drop-shadow">
          Forgot Password
        </h2>

        {message && (
          <div className="bg-green-500/80 text-white rounded-lg px-4 py-2 text-center text-sm font-semibold shadow">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-500/80 text-white rounded-lg px-4 py-2 text-center text-sm font-semibold shadow">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-blue-100 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                required
              />
            </div>
            <button
              onClick={sendOtp}
              className="bg-blue-600/80 hover:bg-blue-700/90 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="otp" className="text-blue-100 font-medium">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-blue-100 font-medium">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={form.newPassword}
                onChange={handleChange}
                className="bg-white/20 border border-white/30 text-blue-100 placeholder-blue-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-inner"
                required
                minLength={8}
              />
            </div>
            <button
              onClick={resetPassword}
              className="bg-green-600/80 hover:bg-green-700/90 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;