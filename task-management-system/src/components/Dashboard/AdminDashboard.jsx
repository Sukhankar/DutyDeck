import React from 'react'
import CreateTask from '../others/CreateTask'
import AllTask from '../AllTask/AllTask'
import Header from '../others/Header'
import Footer from '../others/Footer'
import UserInsights from "../others/UserInsights"

const AdminDashboard = () => {

  return (
    <div>
        <Header/>
        <CreateTask />
        <AllTask />
        <UserInsights />
        <Footer />
    </div>
  )
}

export default AdminDashboard