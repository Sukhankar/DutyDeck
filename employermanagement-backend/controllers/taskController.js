import User from "../models/userModel.js";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, date, assignTo, category, description } = req.body;

    if (!title || !date || !assignTo || !category || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newTask = new Task({
      title,
      date,
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
