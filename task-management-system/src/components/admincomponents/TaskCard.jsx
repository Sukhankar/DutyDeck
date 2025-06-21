import React, { useState, useEffect } from 'react';
import cardColors from '../../utils/taskColors';
import statusColorMap from '../../utils/statusColors';
import API from '../../api';

const TaskCard = ({ tasks, onSelect }) => {
  const user = JSON.parse(localStorage.getItem("user"));
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-10">No tasks found.</div>
      ) : tasks.map((task, idx) => {
        const color = cardColors[idx % cardColors.length];
        const statusColor = statusColorMap[task.status] || 'bg-gray-400';
        const isDeadlinePassed = task.deadline && new Date(task.deadline) < new Date();
        const isAssignedToUser = task.assignedUsers.some(u => u.email === user?.email);

        return (
          <div
            key={task._id}
            onClick={() => onSelect({ ...task, color, statusColor })}
            className={`cursor-pointer rounded-xl p-5 shadow-lg transition transform hover:scale-105 ${color}`}
          >
            <div className="flex justify-between items-center">
              <h3 className={`text-xs px-3 py-1 rounded text-white font-semibold shadow ${statusColor}`}>
                {task.status}
              </h3>
              {isAssignedToUser && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Your Task
                </span>
              )}
              <span className="text-sm text-gray-700">{new Date(task.date).toLocaleDateString()}</span>
            </div>
            <h2 className="mt-3 text-xl font-bold text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-700 mt-2">{task.description}</p>

            {task.deadline && (
              <div className="mt-2">
                <p className="text-sm text-gray-700">
                  <strong>Deadline:</strong> {' '}
                  <span className={isDeadlinePassed && task.status !== 'Completed' ? "text-red-600 font-semibold" : ""}>
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskCard;