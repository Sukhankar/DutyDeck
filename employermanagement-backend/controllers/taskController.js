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

    // Use $in operator to match email in assignTo array
    const tasks = await Task.find({ assignTo: { $in: [email] } }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
