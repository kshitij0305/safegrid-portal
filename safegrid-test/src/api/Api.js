// src/api/Api.js

// ✅ Use NEXT_PUBLIC_API_URL (set in Vercel) or fallback to localhost for dev
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper for requests
async function request(endpoint, method = "GET", token = null, body = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }

  return res.json();
}

// ------------------- AUTH -------------------
export async function registerUser(data) {
  return request("/auth/register", "POST", null, data);
}

export async function loginUser(data) {
  return request("/auth/login", "POST", null, data);
}

// ------------------- JOBS -------------------
export async function getJobs(token) {
  return request("/api/jobs", "GET", token);
}

export async function createJob(token, job) {
  return request("/api/jobs", "POST", token, job);
}

export async function deleteJob(token, jobId) {
  return request(`/api/jobs/${jobId}`, "DELETE", token);
}

export async function applyJob(token, jobId, coverLetter) {
  return request(`/api/jobs/${jobId}/apply`, "POST", token, { coverLetter });
}

export async function getApplications(token) {
  return request("/api/jobs/applications/me", "GET", token);
}

// ------------------- USERS (Admin only) -------------------
export async function getUsers(token) {
  return request("/users", "GET", token);
}
