import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import TaskQueries from './TaskQueries';

const TaskModal = ({ task, onClose, onTaskUpdate }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-2 sm:p-4 overflow-auto">
      <div className="relative w-full max-w-[95vw] sm:max-w-5xl rounded-lg sm:rounded-2xl shadow-xl flex flex-col md:flex-row transition-all duration-300">
        <div className={`w-full ${editMode ? 'md:w-1/2' : 'max-w-[95vw] sm:max-w-xl mx-auto'} p-4 sm:p-6 ${task.color || 'bg-white'}`}>
          <TaskDetails task={task} onEditToggle={() => setEditMode(!editMode)} onClose={onClose} />
          <TaskQueries task={task} onTaskUpdate={onTaskUpdate} />
        </div>
        {editMode && (
          <div className="w-full md:w-1/2 bg-gray-100 p-4 sm:p-6 md:border-l border-gray-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Edit Task</h3>
            <EditTask task={task} onClose={onClose} onTaskUpdate={onTaskUpdate} />
            <DeleteTask taskId={task._id} onClose={onClose} onTaskUpdate={onTaskUpdate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;