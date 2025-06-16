import React, { useState, useEffect } from 'react'
import API from '../../api'

// Utility to generate a random color class for cards
const cardColors = [
  "bg-yellow-300",
  "bg-blue-200",
  "bg-green-200",
  "bg-pink-200",
  "bg-purple-200",
  "bg-orange-200",
  "bg-teal-200",
  "bg-indigo-200"
]
const statusColorMap = {
  "Pending": "bg-red-600",
  "To Do": "bg-yellow-600",
  "Completed": "bg-green-600",
  "In Progress": "bg-blue-600",
  "Failed": "bg-gray-600"
}

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const user = JSON.parse(localStorage.getItem("user"))

  // Validate user email before fetching tasks
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Validate user email before making API call
        if (!isValidEmail(user?.email)) {
          console.error("Invalid email format in localStorage")
          return
        }

        const res = await API.get(`/tasks/user?email=${user.email}`)
        const coloredTasks = res.data.map(task => ({
          ...task,
          color: cardColors[Math.floor(Math.random() * cardColors.length)],
          statusColor: statusColorMap[task.status] || "bg-gray-400",
          // Ensure assignTo contains only valid emails
          assignTo: task.assignTo.filter(email => isValidEmail(email))
        }))
        setTasks(coloredTasks)
      } catch (err) {
        console.error("Failed to fetch tasks:", err.message)
        setTasks([])
      }
    }

    if (user?.email && isValidEmail(user.email)) {
      fetchTasks()
    }
  }, [user])

  return (
    <>
      {/* Responsive layout: stacked cards on mobile, grid on desktop */}
      <div
        className={`
          w-full mx-auto py-10 mt-10
          flex flex-col items-center max-w-xs
          sm:max-w-2xl sm:grid sm:grid-cols-2 sm:gap-8 sm:items-stretch
          lg:max-w-4xl lg:grid-cols-3
        `}
        style={{ minHeight: 500 }}
      >
        {tasks.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No tasks found.
          </div>
        )}
        {tasks.map((task, idx) => (
          <div
            key={task._id || idx}
            className={`
              relative w-full cursor-pointer shadow-xl rounded-2xl transition-all duration-300 ${task.color}
              ${idx !== 0 ? '-mt-16' : ''}
              hover:scale-105
              sm:mt-0 sm:-mb-0 sm:w-full
            `}
            style={{
              zIndex: tasks.length - idx,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 1.5px 4px rgba(0,0,0,0.08)'
            }}
            onClick={() => setSelectedTask(task)}
          >
            <div className='flex items-center justify-between px-6 pt-6'>
              <h3 className={`${task.statusColor} text-xs px-3 py-1 rounded text-white font-semibold shadow`}>
                {task.status}
              </h3>
              <h4 className="text-xs text-gray-600">{new Date(task.date).toLocaleDateString()}</h4>
            </div>
            <div className="px-6 pb-6">
              <h2 className="mt-4 text-xl font-bold text-gray-800">{task.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{task.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className={`relative w-full max-w-md mx-auto rounded-2xl shadow-2xl ${selectedTask.color} p-8 animate-pop`}>
            <button
              className="absolute top-3 right-3 text-gray-700 text-xl font-bold hover:text-red-600"
              onClick={() => setSelectedTask(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-3 mb-4">
              <h3 className={`${selectedTask.statusColor} text-xs px-3 py-1 rounded text-white font-semibold shadow`}>
                {selectedTask.status}
              </h3>
              <h4 className="text-xs text-gray-600">{new Date(selectedTask.date).toLocaleDateString()}</h4>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedTask.title}</h2>
            <p className="text-base text-gray-700">{selectedTask.description}</p>
          </div>
          <style>
            {`
              .animate-pop {
                animation: popIn 0.25s cubic-bezier(.4,2,.6,1) both;
              }
              @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
            `}
          </style>
        </div>
      )}
    </>
  )
}

export default TaskList