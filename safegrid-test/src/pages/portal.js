import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getJobs,
  applyJob,
  deleteJob,
  getUsers,
  getApplications,
  createJob,
} from "@/api/Api";
import JobModal from "@/components/JobModal";

export default function Portal() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const [editName, setEditName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return (window.location.href = "/login");
    setToken(storedToken);

    try {
      const decoded = jwtDecode(storedToken);
      const name = decoded.name || "User";
      const email = decoded.email || "unknown@example.com";
      const role = decoded.role || "EMPLOYEE";

      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=0D8ABC&color=fff`;

      setUser({ name, email, avatar });
      setRole(role);
      setEditName(name);

      fetchData(role, storedToken);
    } catch (err) {
      console.error("Invalid token:", err);
      setError("Session expired, please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }, []);

  const fetchData = async (role, token) => {
    setLoading(true);
    setError("");
    try {
      const jobsData = await getJobs(token);
      setJobs(jobsData || []);

      if (role === "EMPLOYEE") {
        const apps = await getApplications(token);
        setApplications(apps || []);
      }
      if (role === "ADMIN") {
        const allUsers = await getUsers(token);
        setUsers(allUsers || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const saveProfile = () => {
    let newAvatar = user.avatar;
    if (avatarFile) newAvatar = URL.createObjectURL(avatarFile);
    setUser({ ...user, name: editName, avatar: newAvatar });
    setActiveTab("dashboard");
  };

  const handleApplyJob = async (jobId) => {
    try {
      await applyJob(token, jobId, "Excited to apply!");
      alert("Application submitted!");
    } catch (err) {
      console.error("Failed to apply:", err);
      alert("Failed to apply. Please try again.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(token, jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      setSelectedJob(null);
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete job.");
    }
  };

  const handleCreateJob = async (job) => {
    try {
      const newJob = await createJob(token, job);
      setJobs((prev) => [...prev, newJob]);
    } catch (err) {
      console.error("Failed to create job:", err);
      alert("Failed to create job.");
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm -z-10"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-blue-900/80 text-white shadow-lg flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-orange-400">Manpower Portal</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user.email}</span>
          <img
            src={user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-orange-400"
          />
          <button
            onClick={logout}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-72 h-[calc(100vh-5rem)] sticky top-20 bg-white/70 backdrop-blur-md border-r shadow-lg p-6 space-y-4">
          {["dashboard", "profile"].map((tab) => (
            <button
              key={tab}
              className={`w-full px-4 py-2 text-left rounded-lg transition ${
                activeTab === tab
                  ? "bg-orange-500 text-white font-semibold"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}

          {role === "EMPLOYEE" && (
            <>
              <button
                className={`w-full px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "jobs"
                    ? "bg-orange-500 text-white font-semibold"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                Jobs
              </button>
              <button
                className={`w-full px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "applications"
                    ? "bg-orange-500 text-white font-semibold"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setActiveTab("applications")}
              >
                Applications
              </button>
            </>
          )}

          {role === "EMPLOYER" && (
            <button
              className={`w-full px-4 py-2 text-left rounded-lg transition ${
                activeTab === "jobs"
                  ? "bg-orange-500 text-white font-semibold"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab("jobs")}
            >
              Manage Jobs
            </button>
          )}

          {role === "ADMIN" && (
            <>
              <button
                className={`w-full px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "users"
                    ? "bg-orange-500 text-white font-semibold"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setActiveTab("users")}
              >
                Manage Users
              </button>
              <button
                className={`w-full px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "reports"
                    ? "bg-orange-500 text-white font-semibold"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                Reports
              </button>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 text-white">
          {loading && <p className="text-blue-200">Loading...</p>}
          {error && <p className="text-red-400 mb-4">{error}</p>}

          {activeTab === "dashboard" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/80 p-6 rounded-xl shadow-lg border-t-4 border-blue-500 hover:scale-105 transition text-gray-900">
                <h3 className="text-lg font-semibold">Applications</h3>
                <p className="text-4xl font-bold text-blue-700 mt-2">
                  {applications.length}
                </p>
              </div>
              <div className="bg-white/80 p-6 rounded-xl shadow-lg border-t-4 border-orange-500 hover:scale-105 transition text-gray-900">
                <h3 className="text-lg font-semibold">Jobs Posted</h3>
                <p className="text-4xl font-bold text-orange-600 mt-2">
                  {jobs.length}
                </p>
              </div>
              <div className="bg-white/80 p-6 rounded-xl shadow-lg border-t-4 border-green-500 hover:scale-105 transition text-gray-900">
                <h3 className="text-lg font-semibold">Users</h3>
                <p className="text-4xl font-bold text-green-600 mt-2">
                  {users.length}
                </p>
              </div>
            </div>
          )}

          {/* ✅ Profile Tab */}
          {activeTab === "profile" && (
            <div className="max-w-lg mx-auto bg-white/90 shadow-lg rounded-xl p-8 text-gray-900">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Edit Profile
              </h2>
              <div className="flex flex-col items-center space-y-6">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-4 border-blue-800 shadow-lg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                  className="text-sm text-gray-600"
                />
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
                <button
                  onClick={saveProfile}
                  className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "applications" && (
  <div className="space-y-4">
    {applications.length === 0 ? (
      <p className="text-gray-200">❌ You haven’t applied to any jobs yet.</p>
    ) : (
      applications.map((app) => (
        <div
          key={app.id}
          className="p-4 bg-white/80 shadow rounded-lg text-gray-900 hover:bg-orange-50 transition"
        >
          <h3 className="font-bold text-blue-800">
            {app.job?.title || "Unknown Job"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{app.coverLetter}</p>
          <p className="text-xs text-gray-500 mt-2">
            Applied on {new Date(app.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))
    )}
  </div>
)}

{activeTab === "jobs" && (
  <div className="space-y-6">
    {(role === "EMPLOYER" || role === "ADMIN") && (
      <button
        onClick={() =>
          handleCreateJob({
            title: "New Job",
            description: "Job description here",
            location: "Remote",
            salary: 50000,
          })
        }
        className="mb-4 px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-500"
      >
        + Create Job
      </button>
    )}

    {jobs.length === 0 ? (
      <p className="text-gray-200">📭 No jobs available yet.</p>
    ) : (
      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white/80 p-6 rounded shadow hover:shadow-lg cursor-pointer text-gray-900"
            onClick={() => setSelectedJob(job)}
          >
            <h3 className="font-bold text-blue-800">{job.title}</h3>
            <p className="text-gray-600 mt-2">{job.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {job.location} • 💰 {job.salary || "N/A"}
            </p>
            <p className="text-xs text-gray-400">
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
)}

          {activeTab === "users" && (
            <ul className="space-y-3">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="p-4 bg-white/80 shadow rounded-lg text-gray-900 hover:bg-blue-50 transition"
                >
                  {u.name} - {u.email}
                </li>
              ))}
            </ul>
          )}

          {activeTab === "jobs" && (
            <div className="space-y-6">
              {(role === "EMPLOYER" || role === "ADMIN") && (
                <button
                  onClick={() =>
                    handleCreateJob({
                      title: "New Job",
                      description: "Job description here",
                      location: "Remote",
                      salary: 50000,
                    })
                  }
                  className="mb-4 px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-500"
                >
                  + Create Job
                </button>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white/80 p-6 rounded shadow hover:shadow-lg cursor-pointer text-gray-900"
                    onClick={() => setSelectedJob(job)}
                  >
                    <h3 className="font-bold text-blue-800">{job.title}</h3>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="bg-white/80 p-6 rounded-lg shadow text-center text-gray-900">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                📊 Reports
              </h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
        </main>
      </div>

      {/* Job Modal */}
      <JobModal
        job={selectedJob}
        role={role}
        onClose={() => setSelectedJob(null)}
        onApply={handleApplyJob}
        onDelete={handleDeleteJob}
      />
    </div>
  );
}
