import express from "express";
import cors from "cors";
import Task from "./models/taskModel.js";
import connectDB from "./config/dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());


app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({
      success: true,
      tasks: tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


app.post("/tasks", async (req, res) => {
  const { task, status } = req.body;

  try {
    const newTask = new Task({ task, status });
    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task Added",
      task: newTask,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});


app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body; 

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task updated",
      task: updatedTask,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
      console.log(deletedTask)
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task Deleted",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
const PORT = process.env.PORT || 8000
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
