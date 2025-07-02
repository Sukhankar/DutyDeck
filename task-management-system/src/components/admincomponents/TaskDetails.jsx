import React, { useState, useEffect } from 'react';
import statusColorMap from '../../utils/statusColors';
import API from '../../api';

const TaskDetails = ({ task, onEditToggle, onClose }) => {
  const isDeadlinePassed = task.deadline && new Date(task.deadline) < new Date();
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await API.get('/users/employees');
        const details = res.data.reduce((acc, user) => {
          acc[user.email] = { name: user.name, organization: user.organization };
          return acc;
        }, {});
        setUserDetails(details);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const filteredUsers = task.assignedUsers?.filter(u => {
    const userDetail = userDetails[u.email];
    const nameMatch = userDetail?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || emailMatch;
  });

  return (
    <>
      <button onClick={onClose} className="absolute top-3 right-4 text-gray-700 text-xl font-bold hover:text-red-600">&times;</button>

      <div className="flex justify-between items-center">
        <h3 className={`text-xs px-3 py-1 rounded text-white font-semibold shadow ${task.statusColor}`}>{task.status}</h3>
        <button
          onClick={onEditToggle}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          ✏️ Edit Task
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-1">{task.title}</h2>
      <p className="text-gray-700 mb-4">{task.description}</p>

      <div className="mb-2">
        <p><strong>Category:</strong> {task.category}</p>
        <p><strong>Start Date:</strong> {new Date(task.date).toLocaleDateString()}</p>
        {task.deadline && (
          <p>
            <strong>Deadline:</strong>{" "}
            <span className={isDeadlinePassed && task.status !== 'Completed' ? "text-red-600 font-semibold" : ""}>
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          </p>
        )}
      </div>

      <div className="mb-4 mt-2">
        <h4 className="font-semibold text-gray-800">Assigned to:</h4>
        <div className="flex justify-center">
          <button
            onClick={() => setShowAssignPopup(true)}
            className="bg-white text-blue-700 font-medium border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-blue-50 transition w-fit"
          >
            View Assigned Users
          </button>
        </div>

        {showAssignPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
               style={{
                 background: 'rgba(255, 255, 255, 0.08)',
                 backdropFilter: 'blur(12px)',
                 WebkitBackdropFilter: 'blur(12px)'
               }}>
            <div className="bg-white rounded-xl w-full max-w-md md:max-w-lg lg:max-w-2xl p-4 sm:p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Assigned Users</h3>
                <button
                  className="text-gray-500 hover:text-red-600 text-2xl font-bold"
                  onClick={() => setShowAssignPopup(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                />
              </div>

              {/* User List */}
              <div className="max-h-[55vh] overflow-y-auto pr-1">
                <ul className="space-y-2">
                  {filteredUsers?.length > 0 ? (
                    filteredUsers.map((u, i) => (
                      <li key={i} className="flex flex-col bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-800 font-medium text-sm md:text-base">
                            {userDetails[u.email]?.name || 'N/A'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs text-white ${statusColorMap[u.status]}`}>
                            {u.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1 break-all">
                          <p>Email: {u.email}</p>
                          <p>Organization: {userDetails[u.email]?.organization || 'N/A'}</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-center text-gray-500 py-2 text-sm md:text-base">No users found</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskDetails;