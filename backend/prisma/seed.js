import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Hash password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@safegrid.com" },
    update: {},
    create: {
      email: "admin@safegrid.com",
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });

  // Create Employer
  const employer = await prisma.user.upsert({
    where: { email: "employer@safegrid.com" },
    update: {},
    create: {
      email: "employer@safegrid.com",
      password: hashedPassword,
      role: "EMPLOYER",
      isVerified: true,
    },
  });

  // Create Employee
  const employee = await prisma.user.upsert({
    where: { email: "employee@safegrid.com" },
    update: {},
    create: {
      email: "employee@safegrid.com",
      password: hashedPassword,
      role: "EMPLOYEE",
      isVerified: true,
    },
  });

  // Create a Job posted by Employer
  const job = await prisma.job.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Construction Worker Needed",
      description: "Looking for 5 skilled construction workers for a 3-month project.",
      employerId: employer.id,
    },
  });

  // Employee applies to job
  await prisma.application.upsert({
    where: { id: 1 },
    update: {},
    create: {
      jobId: job.id,
      employeeId: employee.id,
    },
  });

  console.log("✅ Seed complete!");
  console.log({ admin, employer, employee, job });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
