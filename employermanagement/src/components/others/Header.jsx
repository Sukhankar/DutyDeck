import React from 'react'

const Header = ({ userName = "Employee", onLogout }) => {
  // Handle logout and redirect to login page
  const handleLogoutClick = () => {
    // Remove logged in user data from localStorage
    localStorage.removeItem('loggedInUser');
    
    // Call the parent logout handler if provided
    if (onLogout) {
      onLogout();
    }
    
    // Force page refresh to clear any state
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between bg-gray-900 text-white px-6 py-4 shadow-md rounded-b-xl">
      <div>
        <h1 className="text-lg sm:text-2xl font-medium leading-tight">
          Hello,
          <br />
          <span className="text-2xl sm:text-3xl font-bold text-blue-300 flex items-center gap-2">
            {userName} <span role="img" aria-label="wave">👋</span>
          </span>
        </h1>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 transition text-white text-base sm:text-lg font-semibold px-4 sm:px-6 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-300"
        onClick={handleLogoutClick}
      >
        Log out
      </button>
    </header>
  )
}

export default Header