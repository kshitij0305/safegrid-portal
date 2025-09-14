import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

const app = express();

// ✅ Allow requests from your Next.js frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://safegrid-frontend.vercel.app", // ✅ Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);

export default app;
