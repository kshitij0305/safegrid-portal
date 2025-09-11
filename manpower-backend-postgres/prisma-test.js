import { prisma } from "../config/prismaClient.js";


const prisma = new PrismaClient();

async function main() {
  // Create a test employer
  const employer = await prisma.user.create({
    data: {
      name: "Test Employer",
      email: "employer@test.com",
      password: "hashedpassword123", // use bcrypt hash in real app
      role: "EMPLOYER",
      gstNumber: "22AAAAA0000A1Z5",
      companyName: "Safe Grid Pvt Ltd",
    },
  });

  console.log("✅ Employer Created:", employer);

  // Create a test employee
  const employee = await prisma.user.create({
    data: {
      name: "Test Employee",
      email: "employee@test.com",
      password: "hashedpassword456",
      role: "EMPLOYEE",
      aadharNumber: "1234-5678-9012",
      skills: "Electrician, Plumber",
    },
  });

  console.log("✅ Employee Created:", employee);

  // Fetch all users
  const users = await prisma.user.findMany();
  console.log("👀 All Users:", users);
}

main()
  .catch((e) => console.error("❌ Error:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
