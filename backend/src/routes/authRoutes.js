// backend/src/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaClient.js";

const router = express.Router();

// Helper: generate token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// === REGISTER ===
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, aadhaarNumber, companyName, gstNumber } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Extra validations based on role
    if (role === "EMPLOYEE" && !aadhaarNumber) {
      return res.status(400).json({ error: "Aadhaar number is required for employees" });
    }
    if (role === "EMPLOYER" && (!companyName || !gstNumber)) {
      return res.status(400).json({ error: "Company name and GST number are required for employers" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role,
        aadhaarNumber: role === "EMPLOYEE" ? aadhaarNumber : null,
        companyName: role === "EMPLOYER" ? companyName : null,
        gstNumber: role === "EMPLOYER" ? gstNumber : null,
      },
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// === LOGIN ===
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    return res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
