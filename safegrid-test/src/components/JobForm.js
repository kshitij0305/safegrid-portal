import { useState } from "react";
import { createJob } from "@/api/Api";

export default function JobForm({ onJobCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = await createJob({ title, description, location, salary });
      onJobCreated(newJob);
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
    } catch (err) {
      console.error("Failed to create job:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-lg"
    >
      <h2 className="text-xl font-bold text-blue-800">Create a Job</h2>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-3 rounded"
        rows={4}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full border p-3 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
      >
        Create Job
      </button>
    </form>
  );
}
