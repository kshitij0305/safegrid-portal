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
  return request("/jobs", "GET", token);
}

export async function createJob(token, job) {
  return request("/jobs", "POST", token, job);
}

export async function deleteJob(token, jobId) {
  return request(`/jobs/${jobId}`, "DELETE", token);
}

export async function applyJob(token, jobId, coverLetter) {
  return request(`/jobs/${jobId}/apply`, "POST", token, { coverLetter });
}

export async function getApplications(token) {
  return request("/jobs/applications/me", "GET", token);
}

// ------------------- USERS (Admin only) -------------------
export async function getUsers(token) {
  return request("/users", "GET", token);
}
// ------------------- PROFILE -------------------
export async function updateProfile(token, data) {
  return request("/users/me", "PUT", token, data);
}
