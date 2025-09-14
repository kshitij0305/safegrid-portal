export default function Modal({ isOpen, onClose, onSave, job }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        <input
          defaultValue={job.title}
          id="title"
          className="w-full border p-2 rounded mb-2"
          placeholder="Title"
        />
        <textarea
          defaultValue={job.description}
          id="description"
          className="w-full border p-2 rounded mb-2"
          placeholder="Description"
        />
        <input
          defaultValue={job.location}
          id="location"
          className="w-full border p-2 rounded mb-2"
          placeholder="Location"
        />
        <input
          defaultValue={job.salary}
          id="salary"
          type="number"
          className="w-full border p-2 rounded mb-2"
          placeholder="Salary"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button
            onClick={() => {
              const updated = {
                ...job,
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                location: document.getElementById("location").value,
                salary: Number(document.getElementById("salary").value),
              };
              onSave(updated);
            }}
            className="px-4 py-2 bg-safeblue text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
