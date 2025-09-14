import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

const app = express();

// ✅ Allow requests from your Next.js frontend
app.use(cors({
  origin: "http://localhost:3000", // frontend dev server
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);

export default app;
