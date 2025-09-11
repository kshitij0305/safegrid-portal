import React, { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <strong>{job.title}</strong> — {job.location} (${job.salary})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
