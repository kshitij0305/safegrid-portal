import React, { useEffect, useState } from "react";
import api from "./api";

function Portal() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await api.get("/api/jobs"); // ✅ no localhost here
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.location} - ₹{job.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portal;
