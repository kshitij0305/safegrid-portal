import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/config/prismaClient.js";

let employeeToken, employerToken, adminToken, createdJobId;

beforeAll(async () => {
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();
});

describe("Auth & Jobs API", () => {
  // --- AUTH TESTS ---
  test("Register an EMPLOYEE", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test Employee",
      email: "employee@example.com",
      password: "password123",
      role: "EMPLOYEE",
    });
    expect(res.statusCode).toBe(201);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "employee@example.com",
      password: "password123",
    });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
    employeeToken = loginRes.body.token;
  });

  test("Register an EMPLOYER", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test Employer",
      email: "employer@example.com",
      password: "password123",
      role: "EMPLOYER",
    });
    expect(res.statusCode).toBe(201);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "employer@example.com",
      password: "password123",
    });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
    employerToken = loginRes.body.token;
  });

  test("Register an ADMIN", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "ADMIN",
    });
    expect(res.statusCode).toBe(201);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "password123",
    });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
    adminToken = loginRes.body.token;
  });

  test("Login with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "employee@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Login with wrong password should fail", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "employee@example.com",
      password: "wrongpass",
    });
    expect(res.statusCode).toBe(401);
  });

  // --- JOB TESTS ---
  test("EMPLOYER can create a job", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${employerToken}`)
      .send({
        title: "Software Developer",
        description: "Build cool stuff",
        location: "Remote",
        salary: 50000,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("title", "Software Developer");
    createdJobId = res.body.id;
  });

  test("EMPLOYEE cannot create a job", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${employeeToken}`)
      .send({ title: "Illegal Job", description: "Should fail" });
    expect(res.statusCode).toBe(403);
  });

  test("Job creation should fail with missing fields", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${employerToken}`)
      .send({ title: "Broken Job" });
    expect(res.statusCode).toBe(400);
  });

  test("Anyone can get all jobs", async () => {
    const res = await request(app).get("/api/jobs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("EMPLOYER can edit their job", async () => {
    const res = await request(app)
      .put(`/api/jobs/${createdJobId}`)
      .set("Authorization", `Bearer ${employerToken}`)
      .send({ title: "Updated Title" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Updated Title");
  });

  test("EMPLOYEE cannot edit jobs", async () => {
    const res = await request(app)
      .put(`/api/jobs/${createdJobId}`)
      .set("Authorization", `Bearer ${employeeToken}`)
      .send({ title: "Hack Attempt" });
    expect(res.statusCode).toBe(403);
  });

  // --- APPLICATION TESTS ---
  test("EMPLOYEE can apply for a job", async () => {
    const res = await request(app)
      .post(`/api/jobs/${createdJobId}/apply`)
      .set("Authorization", `Bearer ${employeeToken}`)
      .send({ coverLetter: "Excited to apply!" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("jobId", createdJobId);
  });

  test("EMPLOYER cannot apply for a job", async () => {
    const res = await request(app)
      .post(`/api/jobs/${createdJobId}/apply`)
      .set("Authorization", `Bearer ${employerToken}`)
      .send({ coverLetter: "Should fail" });
    expect(res.statusCode).toBe(403);
  });

  test("EMPLOYEE cannot apply twice to same job", async () => {
    const res = await request(app)
      .post(`/api/jobs/${createdJobId}/apply`)
      .set("Authorization", `Bearer ${employeeToken}`)
      .send({ coverLetter: "Second attempt" });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  // --- ADMIN TESTS ---
  test("ADMIN can list all users", async () => {
    const res = await request(app)
      .get("/api/jobs/users")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("EMPLOYEE cannot list users", async () => {
    const res = await request(app)
      .get("/api/jobs/users")
      .set("Authorization", `Bearer ${employeeToken}`);
    expect(res.statusCode).toBe(403);
  });

  // --- CLEANUP TESTS ---
  test("EMPLOYER can delete a job", async () => {
    const res = await request(app)
      .delete(`/api/jobs/${createdJobId}`)
      .set("Authorization", `Bearer ${employerToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("EMPLOYEE cannot delete jobs", async () => {
    const res = await request(app)
      .delete(`/api/jobs/${createdJobId}`)
      .set("Authorization", `Bearer ${employeeToken}`);
    expect(res.statusCode).toBe(403);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
