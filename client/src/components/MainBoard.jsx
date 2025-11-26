import React, { useState, useEffect } from 'react';
import Column from './Column';
import axios from 'axios';

const API_URL = 'https://grantify-kanban-production.up.railway.app/tasks';

const MainBoard = () => {
  const [taskText, setTaskText] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      const fetchedTasks = response.data.tasks || response.data;
      setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    }
  };

  const addTask = async () => {
    if (!taskText.trim()) return;

    try {
      const newTaskPayload = {
        task: taskText,
        status: taskStatus,
      };

      const response = await axios.post(API_URL, newTaskPayload);
      
      
      const newTask = response.data.task || response.data;
      
      setTasks((prev) => [...prev, newTask]);
      setTaskText("");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  const editTask = async (id, newText) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      if (!taskToUpdate) return;

      const updatedTask = { ...taskToUpdate, task: newText };
      
      await axios.put(`${API_URL}/${id}`, updatedTask);

      setTasks((prev) => prev.map(task =>
        task._id === id ? { ...task, task: newText } : task
      ));
    } catch (err) {
      console.error("Error updating task text:", err);
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      if (!taskToUpdate) return;

      const updatedTask = { ...taskToUpdate, status: newStatus };

      await axios.put(`${API_URL}/${id}`, updatedTask);

      setTasks((prev) => prev.map(task =>
        task._id === id ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      console.error("Error moving task:", err);
    }
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