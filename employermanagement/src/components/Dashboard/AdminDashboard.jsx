import React from 'react'
import CreateTask from '../others/CreateTask'
import AllTask from '../others/AllTask'
import Header from '../others/Header'
import Footer from '../others/Footer'

const AdminDashboard = () => {
  const userName = "John Doe"; // This should come from your auth logic
  const handleLogout = () => {
    // Your logout logic here
  }

  return (
    <div>
        <Header userName={userName} onLogout={handleLogout} />
        <CreateTask />
        <AllTask />
        <Footer />
    </div>
  )
}

export default AdminDashboard