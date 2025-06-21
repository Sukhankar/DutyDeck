import React from 'react'
import Header from '../others/Header'
import Tasknumber from '../usercomponents/Tasknumber'
import TaskList from '../usercomponents/TaskList'

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