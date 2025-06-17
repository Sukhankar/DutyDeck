import React, { useState, useEffect } from 'react';
import API from '../../api';

const statusOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
  { label: "In Progress", value: "In Progress" }
];

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [viewType, setViewType] = useState('card');
  const [showAllCards, setShowAllCards] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data.map(task => ({
        ...task,
        statusColor: task.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-600'
      })));
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Set up interval to refresh tasks every second
    const interval = setInterval(() => {
      fetchTasks();
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleShowAssignees = (task) => {
    setSelectedTask(task);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(t => {
    const matchesStatus = filterStatus ? t.status === filterStatus : true;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.assignTo.join(', ').toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const cardTasks = showAllCards ? filteredTasks : filteredTasks.slice(0, 12);
  const tableTasks = filteredTasks;

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading tasks...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-5 bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold mb-2">All Tasks</h1>
        <p className="text-gray-600 mb-6">This section will display all tasks assigned to employees.</p>
        {/* View switch */}
        <div className="flex gap-4 mb-6">
          {['card', 'table'].map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg font-semibold shadow transition ${viewType === type ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'}`}
              onClick={() => setViewType(type)}
            >
              {type === 'card' ? 'Card View' : 'Table View'}
            </button>
          ))}
        </div>

        <div className="flex w-full max-w-3xl justify-between items-center mb-6">
          <div className="relative w-2/3 sm:w-1/2">
            <span className="absolute inset-y-0 left-2 flex items-center pointer-events-none text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
                setShowAllCards(false);
              }}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ===== CARD VIEW ===== */}
      {viewType === 'card' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardTasks.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">
                No tasks found for selected status or search.
              </div>
            )}
            {cardTasks.map((t, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">{t.title}</h2>
                <p className="text-sm text-gray-600">{t.description}</p>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>{t.date}</span>
                  <span>{t.category}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    onClick={() => handleShowAssignees(t)}
                  >
                    View Assignees ({t.assignTo.length})
                  </button>
                  <span className={`px-4 py-1 rounded-full font-semibold text-sm shadow ${t.statusColor}`}>
                    {t.status}
                  </span>
                </div>
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
        // ===== TABLE VIEW =====
        <div className="overflow-x-auto mt-4">
          <div className="max-h-[480px] overflow-y-auto rounded-xl shadow-lg bg-white border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px 6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Assignees</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableTasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-10">No tasks found.</td>
                  </tr>
                ) : (
                  tableTasks.map((t, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">{t.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{t.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{t.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{t.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          onClick={() => handleShowAssignees(t)}
                        >
                          View Assignees ({t.assignTo.length})
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-4 py-1 rounded-full font-semibold text-sm shadow ${t.statusColor}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== ASSIGNED USERS POPUP ===== */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Assigned Users for: <span className="text-blue-600">{selectedTask.title}</span>
            </h3>
            <ul className="max-h-60 overflow-y-auto space-y-2">
              {selectedTask.assignTo.map((user, i) => (
                <li key={i} className="text-sm text-gray-700 border-b py-1">{user}</li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleClosePopup}
                className="text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTask;
