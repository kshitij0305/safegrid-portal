// frontend/src/components/JobModal.jsx
import React from "react";

export default function JobModal({ job, role, onClose, onApply, onDelete }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg max-w-lg w-full p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-900">{job.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-lg"
          >
            ✖
          </button>
        </div>

        {/* Job Info */}
        <p className="text-gray-700 mb-2">{job.description}</p>
        <p className="text-gray-600">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-gray-600">
          <strong>Salary:</strong> ₹{job.salary}
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          {role === "EMPLOYEE" && (
            <button
              onClick={() => onApply(Number(job.id))} // ✅ force Int
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition"
            >
              Apply
            </button>
          )}
          {(role === "EMPLOYER" || role === "ADMIN") && (
            <button
              onClick={() => onDelete(Number(job.id))} // ✅ force Int
              className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-500 transition"
            >
              Delete
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
