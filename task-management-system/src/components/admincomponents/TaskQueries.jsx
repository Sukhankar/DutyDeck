import React, { useState } from 'react';
import API from '../../api';
import { formatDistanceToNow } from 'date-fns';

const TaskQueries = ({ task, onTaskUpdate }) => {
  const [queries, setQueries] = useState(task.queries || []);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddQuery = async (e) => {
    e.preventDefault();
    const message = e.target.query.value.trim();
    if (!message) {
      setError('Query cannot be empty');
      return;
    }
    
    try {
      const res = await API.post(`/tasks/${task._id}/queries`, {
        user: user.email,
        message
      });
      if (res.status === 201) {
        setQueries(res.data);
        e.target.reset();
        setError(null);
        onTaskUpdate();
      } else {
        throw new Error('Failed to add query');
      }
    } catch (err) {
      console.error("Add query failed:", err);
      setError(err.response?.data?.message || 'Failed to add query. Please try again.');
    }
  };

  const handleDeleteQuery = async (queryId) => {
    try {
      const res = await API.delete(`/tasks/${task._id}/queries/${queryId}`);
      if (res.status === 200) {
        setQueries(res.data);
        onTaskUpdate();
      } else {
        throw new Error('Failed to delete query');
      }
    } catch (err) {
      console.error("Delete query failed:", err);
      setError(err.response?.data?.message || 'Failed to delete query. Please try again.');
    }
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="text-lg font-bold text-gray-800 mb-2">Task Queries</h4>
      <form onSubmit={handleAddQuery}>
        <textarea 
          name="query" 
          className="w-full p-2 border rounded text-sm mb-2" 
          placeholder="Type a query..."
          aria-label="Query input"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button 
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Add Query
        </button>
      </form>

      <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto">
        {queries.map(q => (
          <li key={q.id} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-800">{q.message}</p>
                <small className="text-xs text-gray-500">
                  {q.user} • {formatDistanceToNow(new Date(q.createdAt), { addSuffix: true })}
                </small>
              </div>
              {q.user === user.email && (
                <button
                  onClick={() => handleDeleteQuery(q.id)}
                  className="text-xs text-red-600 hover:text-red-700 ml-2"
                  aria-label="Delete query"
                >
                  ✕
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskQueries;