import React, { useState, useEffect } from 'react';
import Column from './Column';

const MainBoard = () => {
  const [taskText, setTaskText] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [tasks, setTasks] = useState([]);

 
  useEffect(() => {
    const storedTasks = localStorage.getItem("kanbanTasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      _id: Date.now().toString(), 
      task: taskText,
      status: taskStatus,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskText("");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter(task => task._id !== id));
  };

  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map(task =>
        task._id === id ? { ...task, task: newText } : task
      )
    );
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map(task =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className='mt-10 container mx-auto px-4'>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <h1 className='text-4xl font-bold text-center mt-10'>
          Welcome, to <span className='text-green-600'>Grantify Kanban Board</span>
        </h1>

        <div className='flex flex-col sm:flex-row gap-2 bg-gray-200 p-2 rounded-md mt-3 mb-10 shadow-sm'>
          <input
            type="text"
            className='p-2 px-3 text-md outline-none rounded-sm w-full sm:w-64'
            placeholder='Write task here...'
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />

          <select
            className='h-10 px-2 outline-none rounded-sm bg-white cursor-pointer'
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button
            className='bg-green-500 hover:bg-green-600 transition-colors font-semibold p-2 rounded-sm outline-none text-white px-6'
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-5 w-full justify-center md:items-start items-center'>
        <Column 
          title='To Do' 
          color='bg-red-500' 
          tasks={tasks} 
          deleteTask={deleteTask} 
          editTask={editTask} 
          updateTaskStatus={updateTaskStatus} 
        />
        <Column 
          title='In Progress' 
          color='bg-yellow-500' 
          tasks={tasks} 
          deleteTask={deleteTask} 
          editTask={editTask} 
          updateTaskStatus={updateTaskStatus} 
        />
        <Column 
          title='Done' 
          color='bg-green-500' 
          tasks={tasks} 
          deleteTask={deleteTask} 
          editTask={editTask} 
          updateTaskStatus={updateTaskStatus} 
        />
      </div>
    </div>
  )
}

export default MainBoard;