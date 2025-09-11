export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchJobs() {
  const res = await fetch(`${API_URL}/api/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}
