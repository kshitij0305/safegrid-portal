"use client"; // if using App Router

import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs") // 👈 hit backend
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Listings</h1>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> - {job.location} (${job.salary})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
