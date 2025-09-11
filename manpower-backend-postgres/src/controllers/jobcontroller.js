// controllers/jobController.js
import prisma from "../prismaClient.js";

// -------------------- CREATE --------------------
export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "EMPLOYER") {
      return res.status(403).json({ error: "Only employers can create jobs" });
    }

    const { title, description, location, salary } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        salary,
        employerId: req.user.id,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------- READ --------------------
export const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { employer: true, applications: true },
    });
    res.json(jobs);
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------- UPDATE --------------------
export const updateJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const { title, description, location, salary } = req.body;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (req.user.role !== "EMPLOYER" || req.user.id !== job.employerId) {
      return res.status(403).json({ error: "Not authorized to edit this job" });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: { title, description, location, salary },
    });

    res.json(updatedJob);
  } catch (error) {
    console.error("Update job error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------- DELETE --------------------
export const deleteJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (req.user.role !== "EMPLOYER" || req.user.id !== job.employerId) {
      return res.status(403).json({ error: "Not authorized to delete this job" });
    }

    await prisma.job.delete({ where: { id: jobId } });

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------- APPLY --------------------
export const applyForJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = parseInt(req.params.id);

    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).json({ error: "Only employees can apply for jobs" });
    }

    // Check duplicate application
    const existing = await prisma.application.findFirst({
      where: { jobId, employeeId: userId },
    });

    if (existing) {
      return res.status(400).json({ error: "You already applied for this job" });
    }

    const application = await prisma.application.create({
      data: {
        coverLetter: req.body.coverLetter || "N/A",
        jobId,
        employeeId: userId,
      },
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
