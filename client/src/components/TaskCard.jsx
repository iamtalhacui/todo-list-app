import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onDragStart, deleteTask }) => {
  // Guard clause to prevent crashes if task data is missing or undefined
  if (!task) return null;

  return (
    <div
      draggable="true"
      onDragStart={(e) => onDragStart(e, task.id)}
      className="group relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 cursor-grab active:cursor-grabbing transition-all animate-in fade-in duration-300"
    >
      <div className="flex justify-between items-start gap-2">
        <p className="text-gray-800 text-sm leading-relaxed font-medium">
          {task.title}
        </p>
        
        <button 
          onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-1 -mt-1 -mr-1 rounded-full hover:bg-red-50"
          title="Delete task"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
         <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 uppercase tracking-wider">
           <span>ID: {task.id ? task.id.slice(-4) : '####'}</span>
         </div>
         <GripVertical size={14} className="text-gray-300 opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default TaskCard;