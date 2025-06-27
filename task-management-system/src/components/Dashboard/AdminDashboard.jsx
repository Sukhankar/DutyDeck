import React from 'react';
import CreateTask from '../admincomponents/CreateTask';
import AllTask from '../admincomponents/AllTask';
import Header from '../others/Header';
import Footer from '../others/Footer';
import UserInsights from "../admincomponents/UserInsights";

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