export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-blue-200 mb-6 tracking-tight drop-shadow">
            Welcome to Employer Management System
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
            Streamline your organization's employee management with our powerful and intuitive platform. 
            Manage profiles, track performance, and enhance productivity effortlessly.
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="/register-user" 
              className="bg-blue-600/80 hover:bg-blue-700/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition text-lg tracking-wide"
            >
              Get Started
            </a>
            <a 
              href="/login" 
              className="bg-transparent border-2 border-blue-500/80 hover:border-blue-600 text-blue-200 font-bold py-3 px-8 rounded-xl shadow-lg transition text-lg tracking-wide"
            >
              Login
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 glass-card">
            <h2 className="text-2xl font-bold text-blue-200 mb-4">Efficient Management</h2>
            <p className="text-blue-100">
              Centralize all employee data and manage it with ease through our intuitive interface.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 glass-card">
            <h2 className="text-2xl font-bold text-blue-200 mb-4">Real-time Analytics</h2>
            <p className="text-blue-100">
              Get insights into your workforce with comprehensive analytics and reporting tools.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 glass-card">
            <h2 className="text-2xl font-bold text-blue-200 mb-4">Secure Platform</h2>
            <p className="text-blue-100">
              Your data is protected with enterprise-grade security measures and encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
