import { v4 as uuidv4 } from 'uuid';
import User from "../models/userModel.js";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, date, deadline, assignTo, category, description } = req.body;

    if (!title || !date || !deadline || !assignTo || !category || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newTask = new Task({
      title,
      date,
      deadline,
      assignTo,
      category,
      description,
      status: "Pending"
    });

    const savedTask = await newTask.save();
    res.status(201).json({ message: "Task created", task: savedTask });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasksForUser = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const tasks = await Task.find({ assignTo: { $in: [email] } }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { assignTo: email } : {};
    const tasks = await Task.find(query);

    const stats = [
      {
        label: "New task",
        count: tasks.filter(t => t.status === "Pending").length,
        bg: "bg-red-500",
        text: "text-white"
      },
      {
        label: "Completed task",
        count: tasks.filter(t => t.status === "Completed").length,
        bg: "bg-green-300",
        text: "text-gray-900"
      },
      {
        label: "In Progress",
        count: tasks.filter(t => t.status === "In Progress").length,
        bg: "bg-blue-500",
        text: "text-white"
      },
      {
        label: "Pending",
        count: tasks.filter(t => t.status === "Pending").length,
        bg: "bg-yellow-500",
        text: "text-gray-900"
      }
    ];

    res.status(200).json(stats);
  } catch (err) {
    console.error("Error getting task stats:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserInsights = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("name email");

    const insights = await Promise.all(users.map(async (user) => {
      const tasks = await Task.find({ assignTo: user.email });

      const completed = tasks.filter(t => t.status === "Completed").length;
      const inProgress = tasks.filter(t => t.status === "In Progress").length;
      const seen = tasks.filter(t => t.seenBy?.includes(user.email)).length;

      return {
        name: user.name,
        email: user.email,
        total: tasks.length,
        completed,
        inProgress,
        seen,
      };
    }));

    res.status(200).json(insights);
  } catch (err) {
    console.error("Error fetching user insights:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updated = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task status" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updateData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export const addQueryToTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { user, message } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const newQuery = { id: uuidv4(), user, message };
    task.queries.push(newQuery);
    await task.save();

    res.status(201).json(task.queries);
  } catch (err) {
    res.status(500).json({ message: "Failed to add query" });
  }
};

export const deleteQuery = async (req, res) => {
  try {
    const { taskId, queryId } = req.params;

    const task = await Task.findById(taskId);
    task.queries = task.queries.filter(q => q.id !== queryId);
    await task.save();

    res.status(200).json(task.queries);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete query" });
  }
};