import express from "express";
import { prisma } from "../config/prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ EMPLOYER creates a job
router.post("/", authMiddleware(["EMPLOYER"]), async (req, res) => {
  try {
    const { title, description, location, salary } = req.body;

    if (!title || !description || !location || !salary) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        salary: Number(salary),
        employerId: req.user.id,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Job create error:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

// ✅ Anyone can view all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        employer: true,
        applications: true,
      },
    });
    res.json(jobs);
  } catch (err) {
    console.error("Fetch jobs error:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ✅ EMPLOYER edits their job
router.put("/:id", authMiddleware(["EMPLOYER"]), async (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);
    const { title, description, location, salary } = req.body;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (job.employerId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to edit this job" });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        description,
        location,
        salary: salary !== undefined ? Number(salary) : job.salary,
      },
    });

    res.json(updatedJob);
  } catch (error) {
    console.error("Job update error:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// ✅ EMPLOYEE applies for a job
router.post("/:id/apply", authMiddleware(["EMPLOYEE"]), async (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);
    const employeeId = req.user.id;
    const { coverLetter = "" } = req.body;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    const existing = await prisma.application.findFirst({
      where: { employeeId, jobId },
    });
    if (existing) {
      return res.status(400).json({ error: "Already applied to this job" });
    }

    const application = await prisma.application.create({
      data: {
        employeeId,
        jobId,
        coverLetter,
      },
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ EMPLOYEE fetches their own applications
// ✅ EMPLOYEE or ADMIN fetches applications
router.get(
  "/applications/me",
  authMiddleware(["EMPLOYEE", "ADMIN"]),
  async (req, res) => {
    try {
      let apps;

      if (req.user.role === "EMPLOYEE") {
        // Employee sees only their applications
        apps = await prisma.application.findMany({
          where: { employeeId: req.user.id },
          include: { job: true },
        });
      } else if (req.user.role === "ADMIN") {
        // Admin sees all applications
        apps = await prisma.application.findMany({
          include: { job: true, employee: true },
        });
      }

      res.json(apps);
    } catch (err) {
      console.error("Get applications error:", err);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  }
);


// ✅ EMPLOYER deletes their job
router.delete("/:id", authMiddleware(["EMPLOYER"]), async (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (job.employerId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this job" });
    }

    await prisma.application.deleteMany({ where: { jobId } });
    await prisma.job.delete({ where: { id: jobId } });

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// ✅ ADMIN can see all users
router.get("/users", authMiddleware(["ADMIN"]), async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
