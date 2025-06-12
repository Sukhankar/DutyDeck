import React from 'react'

const Footer = () => (
  <footer className="w-full bg-gray-900 text-blue-100 py-4 mt-10 shadow-inner">
    <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
      <span className="text-sm">&copy; {new Date().getFullYear()} Employer Management. All rights reserved.</span>
      <span className="text-xs mt-2 sm:mt-0">
        Made with <span className="text-red-400">♥</span> by Sukhankar
      </span>
    </div>
  </footer>
)

export default Footer