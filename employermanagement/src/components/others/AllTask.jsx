import React, { useState } from 'react'

const tasks = [
  { name: "Suk", task: "Make UI Design", status: "Pending", statusColor: "bg-red-100 text-red-600" },
  { name: "Aman", task: "Review Code", status: "Completed", statusColor: "bg-green-100 text-green-600" },
  { name: "Priya", task: "Write Docs", status: "In Progress", statusColor: "bg-yellow-100 text-yellow-700" },
  { name: "Ravi", task: "Deploy App", status: "Pending", statusColor: "bg-red-100 text-red-600" },
  { name: "Sam", task: "Test Feature", status: "Failed", statusColor: "bg-gray-200 text-red-700" },
  // Add more tasks for demo
  ...Array.from({ length: 20 }, (_, i) => {
    const statusArr = ["Pending", "Completed", "In Progress", "Failed"];
    const colorArr = [
      "bg-red-100 text-red-600",
      "bg-green-100 text-green-600",
      "bg-yellow-100 text-yellow-700",
      "bg-gray-200 text-red-700"
    ];
    const statusIdx = i % 4;
    return {
      name: `User${i + 5}`,
      task: `Task ${i + 5}`,
      status: statusArr[statusIdx],
      statusColor: colorArr[statusIdx]
    }
  })
]

const statusOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
  { label: "In Progress", value: "In Progress" },
  { label: "Failed", value: "Failed" }
];

const AllTask = () => {
  const [viewType, setViewType] = useState('card') // 'card' or 'table'
  const [showAllCards, setShowAllCards] = useState(false)
  const [filterStatus, setFilterStatus] = useState('')
  const [search, setSearch] = useState('')

  // Filter and search tasks
  const filteredTasks = tasks.filter(t => {
    const matchesStatus = filterStatus ? t.status === filterStatus : true;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.task.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Card view: show 12 initially, then all on "View More"
  const cardTasks = showAllCards ? filteredTasks : filteredTasks.slice(0, 12)
  // Table view: show all, but scrollable with max 10 visible
  const tableTasks = filteredTasks

  return (
    <div className="flex flex-col min-h-screen p-5 bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold mb-2">All Tasks</h1>
        <p className="text-gray-600 mb-6">This section will display all tasks assigned to employees.</p>
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold shadow transition ${viewType === 'card' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'}`}
            onClick={() => setViewType('card')}
          >
            Card View
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold shadow transition ${viewType === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'}`}
            onClick={() => setViewType('table')}
          >
            Table View
          </button>
        </div>
        {/* Search and Filter Row */}
        <div className="flex w-full max-w-3xl justify-between items-center mb-6">
          <div className="relative w-2/3 sm:w-1/2">
            <span className="absolute inset-y-0 left-2 flex items-center pointer-events-none text-blue-400">
              {/* Search Icon SVG */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              type="text"
              className="pl-9 pr-3 py-2 w-full rounded-md border border-blue-300 text-blue-700 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              placeholder="Search by name or task..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setShowAllCards(false);
              }}
            />
          </div>
          <div className="flex flex-col items-end ml-2">
            <label htmlFor="statusFilter" className="text-xs text-blue-700 mb-1 mr-1">
              Filter by status
            </label>
            <select
              id="statusFilter"
              className="w-28 px-2 py-2 rounded-md border border-blue-400 text-blue-700 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              value={filterStatus}
              onChange={e => {
                setFilterStatus(e.target.value);
                setShowAllCards(false); // Reset card view on filter change
              }}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {viewType === 'card' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardTasks.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">
                No tasks found for selected status or search.
              </div>
            )}
            {cardTasks.map((t, idx) => (
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
          {!showAllCards && filteredTasks.length > 12 && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                onClick={() => setShowAllCards(true)}
              >
                View More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="overflow-x-auto">
          <div className="max-h-[480px] overflow-y-auto rounded-xl shadow-lg bg-white border border-gray-200 mt-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableTasks.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-500 py-10">No tasks found for selected status or search.</td>
                  </tr>
                )}
                {tableTasks.map((t, idx) => (
                  <tr key={idx} className={idx < 10 ? "" : "hidden sm:table-row"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{t.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{t.task}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-4 py-1 rounded-full font-semibold text-sm shadow ${t.statusColor}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllTask