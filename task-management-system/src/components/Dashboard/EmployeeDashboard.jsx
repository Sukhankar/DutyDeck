import React from 'react'
import Header from '../others/Header'
import Tasknumber from '../others/Tasknumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = () => {
  return (
    < div className='flex flex-col p-10 bg-gray-100'>
        <Header />
        <Tasknumber />
        <TaskList />
    </div>
  )
}

export default EmployeeDashboard