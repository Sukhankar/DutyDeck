import React from 'react'

const tasks = [
  { name: "Suk", task: "Make UI Design", status: "Pending", statusColor: "bg-red-100 text-red-600" },
  { name: "Aman", task: "Review Code", status: "Completed", statusColor: "bg-green-100 text-green-600" },
  { name: "Priya", task: "Write Docs", status: "In Progress", statusColor: "bg-yellow-100 text-yellow-700" },
  { name: "Ravi", task: "Deploy App", status: "Pending", statusColor: "bg-red-100 text-red-600" }
]

const AllTask = () => {
  return (
    <div className="flex flex-col min-h-screen p-5 bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-2">All Tasks</h1>
        <p className="text-gray-600 mb-6">This section will display all tasks assigned to employees.</p>
      </div>
      {/* Grid of task cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 border border-gray-200 transition hover:shadow-xl"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{t.name}</h2>
              <h3 className="text-base text-gray-600">{t.task}</h3>
            </div>
            <span className={`self-end px-4 py-1 rounded-full font-semibold text-sm shadow ${t.statusColor}`}>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTask