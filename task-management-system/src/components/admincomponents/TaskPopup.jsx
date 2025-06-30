import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const TaskPopup = ({ task, user, onClose, onDeleteQuery, onAddQuery }) => {
  const hasManyAssignees = task.assignedUsers.length > 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 py-4 sm:px-4">
      <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-sm sm:max-w-md md:max-w-lg relative animate-pop max-h-[90vh] overflow-y-auto scroll-smooth text-xs sm:text-sm">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-lg font-bold text-gray-700 hover:text-red-600"
          aria-label="Close popup"
        >
          &times;
        </button>

        {/* Title & Description */}
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-bold text-blue-700">{task.title}</h3>
          <p className="text-gray-700 mt-1">{task.description}</p>
          <p className="text-gray-500 mt-1 text-[10px] sm:text-xs">
            {new Date(task.date).toLocaleDateString()}
          </p>
        </div>

        {/* Assignees */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">Assignees</h4>
          <ul
            className={`list-disc list-inside text-gray-700 text-xs space-y-1 ${
              hasManyAssignees ? 'max-h-24 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100' : ''
            }`}
          >
            {task.assignedUsers.map((user, idx) => (
              <li key={idx} className="break-words">
                {user.email}
                <span className="ml-2 inline-block px-1.5 py-0.5 rounded bg-gray-200 text-gray-800 text-[10px] font-medium">
                  {user.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Queries Section */}
        <div className="border-t pt-3">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Queries</h4>

          <form onSubmit={onAddQuery} className="mb-3">
            <textarea
              name="query"
              className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Add your query..."
              rows="2"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm w-full sm:w-auto"
            >
              Add Query
            </button>
          </form>

          <ul className="space-y-2 max-h-32 overflow-y-auto pr-1 text-xs sm:text-sm scroll-smooth">
            {task.queries?.map((q) => (
              <li key={q.id} className="bg-gray-100 p-2 rounded-md flex justify-between items-start text-gray-800">
                <div className="flex-1">
                  <p className="break-words">{q.message}</p>
                  <small className="text-gray-500 text-[10px] block mt-1">
                    {q.user} • {formatDistanceToNow(new Date(q.createdAt), { addSuffix: true })}
                  </small>
                </div>
                {q.user === user.email && (
                  <button
                    onClick={() => onDeleteQuery(q.id)}
                    className="text-red-600 text-sm ml-2"
                    title="Delete"
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
