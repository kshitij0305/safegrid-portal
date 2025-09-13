import { useEffect, useState } from "react";
import useClient from "../hooks/useClient";

export default function Jobs() {
  const isClient = useClient();
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isClient) return;
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(Array.isArray(data) ? data : data.jobs || []))
      .catch(() => setMessage("⚠️ Could not fetch jobs"));
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="bg-white shadow rounded-lg p-4 border hover:shadow-md transition">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                {job.location} • {job.salary ? `₹${job.salary}` : "Not specified"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No jobs available right now.</p>
        )}
      </div>
    </div>
  );
}
