import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;