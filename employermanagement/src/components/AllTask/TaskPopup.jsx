import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const TaskPopup = ({ task, user, onClose, onDeleteQuery, onAddQuery }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-pop">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-red-600"
        >
          &times;
        </button>
        <div className="mb-3">
          <h3 className="text-xl font-bold text-blue-600">{task.title}</h3>
          <p className="text-sm text-gray-700">{task.description}</p>
          <p className="text-xs text-gray-500 mt-1">{new Date(task.date).toLocaleDateString()}</p>
        </div>
        <div className="mb-3">
          <h4 className="font-semibold text-gray-800">Assignees</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {task.assignTo.map((email, idx) => (
              <li key={idx}>{email}</li>
            ))}
          </ul>
        </div>

        {/* Query section */}
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Queries</h4>
          <form
            onSubmit={onAddQuery}
            className="mb-2"
          >
            <textarea
              name="query"
              className="w-full p-2 border rounded text-sm mb-2"
              placeholder="Add your query..."
            />
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
              Add Query
            </button>
          </form>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {task.queries?.map(q => (
              <li key={q.id} className="bg-gray-100 p-2 rounded text-sm">
                <div className="flex justify-between">
                  <div>
                    <p>{q.message}</p>
                    <small className="text-gray-500">
                      {q.user} • {formatDistanceToNow(new Date(q.createdAt), { addSuffix: true })}
                    </small>
                  </div>
                  {q.user === user.email && (
                    <button onClick={() => onDeleteQuery(q.id)} className="text-red-600 text-xs">✕</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
