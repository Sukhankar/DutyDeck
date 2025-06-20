import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// CORS Configuration to allow both Vercel frontend and local development
const corsOptions = {
  origin: ['https://duty-deck.vercel.app', 'http://localhost:5173'], // allow both production and development domains
  methods: ['GET', 'POST', 'PUT', 'PATCH' ,'DELETE', 'OPTIONS'],
  credentials: true, // allow cookies or Authorization headers
};

app.use(cors(corsOptions));

// Optional: Manually set headers (for extra safety with some platforms)
app.use((req, res, next) => {
  const allowedOrigins = ['https://duty-deck.vercel.app', 'http://localhost:5173'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// JSON parsing middleware
app.use(express.json());

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

//Start server after DB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));
