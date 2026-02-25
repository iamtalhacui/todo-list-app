import React from 'react';
import { Trash, Edit } from 'lucide-react';

const Column = ({ color, title, tasks, deleteTask, editTask, updateTaskStatus }) => {
  
 
 const safeTasks = Array.isArray(tasks) ? tasks : [];
  
  const filteredTasks = safeTasks.filter(task => task.status === title);

  const handleEdit = (task) => {
   
    const newText = prompt("Edit task:", task.task);
    if (newText !== null && newText.trim() !== "") {
      editTask(task._id, newText);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    updateTaskStatus(taskId, title);
  };

  return (
    <div 
      className='rounded-2xl bg-gray-100 w-72 shadow-md flex flex-col' 
      onDragOver={(e) => e.preventDefault()} 
      onDrop={handleDrop}
    >
        
      <h1 className={`${color} rounded-t-2xl text-center text-lg font-bold text-white py-3 shadow-sm`}>
        {title}
      </h1>
          
      <div className='p-3 flex flex-col gap-3 min-h-[200px]'> 
       
        
        {filteredTasks.length === 0 && (
          <p className='text-gray-400 text-sm italic text-center mt-5'>No tasks</p>
        )}

        {filteredTasks.map(task => (
          <div 
            key={task._id} 
            className='bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex justify-between items-center cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow'
            draggable={true}                     
            onDragStart={(e) => e.dataTransfer.setData("taskId", task._id)} 
          >
            
          
            <span className="text-gray-700 font-medium break-all">{task.task}</span>

            <div className='flex gap-2 ml-2'>
              <Edit 
                size={20} 
                className='text-green-500 hover:text-green-600 hover:scale-110 transition-transform cursor-pointer' 
                onClick={() => handleEdit(task)}
              />
              <Trash 
                size={20} 
                className='text-red-500 hover:text-red-600 hover:scale-110 transition-transform cursor-pointer' 
                onClick={() => deleteTask(task._id)} // CRITICAL: Use _id
              />
            </div>
           
          </div>
        ))}
      </div>
    </div>
  )
}

export default Column;