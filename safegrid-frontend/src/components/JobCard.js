function JobCard({ job }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>📍 {job.location}</p>
      <p>💰 {job.salary}</p>
    </div>
  );
}

export default JobCard;
