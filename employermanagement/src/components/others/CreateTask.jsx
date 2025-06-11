import React from 'react'
import Header from './Header'

const CreateTask = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Dashboard Info */}
      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600 mb-8">Welcome to the admin dashboard. Here you can manage users, view reports, and perform administrative tasks.</p>
        
        {/* Task Creation Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Create Task</h2>
          <form className="flex flex-col gap-6 md:flex-row">
            {/* Left Side: Main Fields */}
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  className="w-full text-black outline-none border-2 border-gray-200 focus:border-blue-400 text-base py-2 px-4 rounded-md transition"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full text-black outline-none border-2 border-gray-200 focus:border-blue-400 text-base py-2 px-4 rounded-md transition"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">Assign to</label>
                  <input
                    type="text"
                    placeholder="Enter employee name"
                    className="w-full text-black outline-none border-2 border-gray-200 focus:border-blue-400 text-base py-2 px-4 rounded-md transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Category</label>
                <input
                  type="text"
                  placeholder="Enter task category"
                  className="w-full text-black outline-none border-2 border-gray-200 focus:border-blue-400 text-base py-2 px-4 rounded-md transition"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-600 transition text-white text-lg font-semibold px-6 py-2 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Create Task
              </button>
            </div>
            {/* Right Side: Description */}
            <div className="flex-1 flex flex-col gap-2 md:pl-6 mt-6 md:mt-0">
              <label className="block text-gray-700 font-medium mb-1">Task Description</label>
              <textarea
                placeholder="Enter task description"
                className="w-full h-40 md:h-full text-black outline-none border-2 border-gray-200 focus:border-blue-400 text-base py-2 px-4 rounded-md transition resize-none"
                rows="8"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTask