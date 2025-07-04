import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import API from '../api'

const TaskModal = ({ task, user, setTask }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = e.target.query.value.trim()
    if (!message) return
    try {
      const res = await API.post(`/tasks/${task._id}/queries`, {
        user: user.email,
        message
      })
      setTask({ ...task, queries: res.data })
      e.target.reset()
    } catch (err) {
      console.error("Failed to add query:", err.message)
    }
  }

  const handleDelete = async (queryId) => {
    try {
      const res = await API.delete(`/tasks/${task._id}/queries/${queryId}`)
      setTask({ ...task, queries: res.data })
    } catch (err) {
      console.error("Failed to delete query:", err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`relative w-full max-w-md mx-auto rounded-2xl shadow-2xl ${task.color} p-8 animate-pop`}>
        <button onClick={() => setTask(null)} className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-red-600">&times;</button>

        <div className="flex items-center gap-3 mb-4">
          <h3 className={`${task.statusColor} text-xs px-3 py-1 rounded text-white font-semibold shadow`}>
            {task.userStatus}
          </h3>
          <h4 className="text-xs text-gray-600">{new Date(task.date).toLocaleDateString()}</h4>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">{task.title}</h2>
        <p className="text-base text-gray-700">{task.description}</p>

        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Task Queries</h4>
          <form onSubmit={handleSubmit}>
            <textarea name="query" placeholder="Type your query..." className="w-full p-2 border rounded text-sm mb-2" rows={2} />
            <button type="submit" className="bg-blue-600 text-white text-sm px-3 py-1 rounded">Add Query</button>
          </form>

          <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {task.queries?.map(q => (
              <li key={q.id} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-800">{q.message}</p>
                    <small className="text-xs text-gray-500">
                      {q.user} • {formatDistanceToNow(new Date(q.createdAt), { addSuffix: true })}
                    </small>
                  </div>
                  {q.user === user.email && (
                    <button onClick={() => handleDelete(q.id)} className="text-xs text-red-600 hover:text-red-700 ml-2">✕</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
