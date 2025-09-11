// src/routes/requests.js
import express from "express";
import prisma from "../config/prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Create a job request (Employer only)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ error: "Only employers can create jobs" });
    }

    const { title, description, location, budget } = req.body;

    if (!title || !description || !location || !budget) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        budget: Number(budget),
        employer: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

/**
 * Get all jobs (Anyone)
 */
router.get("/", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        employer: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

/**
 * Get a single job by ID (Anyone)
 */
router.get("/:id", async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    if (isNaN(jobId)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        employer: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

/**
 * Update a job
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "EMPLOYER" && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Only employers or admins can update jobs" });
    }

    const jobId = parseInt(req.params.id);
    const { title, description, location, budget } = req.body;

    if (isNaN(jobId)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const existingJob = await prisma.job.findUnique({ where: { id: jobId } });
    if (!existingJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (req.user.role === "EMPLOYER" && existingJob.employerId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to update this job" });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title: title || existingJob.title,
        description: description || existingJob.description,
        location: location || existingJob.location,
        budget: budget !== undefined ? Number(budget) : existingJob.budget,
      },
    });

    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "EMPLOYER" && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Only employers or admins can delete jobs" });
    }

    const jobId = parseInt(req.params.id);

    if (isNaN(jobId)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const existingJob = await prisma.job.findUnique({ where: { id: jobId } });
    if (!existingJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (req.user.role === "EMPLOYER" && existingJob.employerId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this job" });
    }

    await prisma.job.delete({ where: { id: jobId } });

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
