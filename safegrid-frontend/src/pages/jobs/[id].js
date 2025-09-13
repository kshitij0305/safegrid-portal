import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch(() => setMessage("⚠️ Could not fetch job details"));
  }, [id]);

  if (message) return <p className="text-red-500">{message}</p>;
  if (!job) return <p className="p-6">Loading job details...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <p className="text-gray-500 mb-2">
          📍 {job.location} • 💰 {job.salary ? `₹${job.salary}` : "Not specified"}
        </p>
        <p className="text-gray-500 mb-2">Posted by: {job.employer?.name}</p>
        <p className="text-sm text-gray-400">
          Posted on: {new Date(job.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
