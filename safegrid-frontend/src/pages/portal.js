import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Portal() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const [editName, setEditName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        const name = decoded.name || "User";
        const email = decoded.email || "";
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=0D8ABC&color=fff`;

        setUser({ name, email, avatar });
        setRole(decoded.role);
        setEditName(name);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const saveProfile = async () => {
    let newAvatar = user.avatar;

    if (avatarFile) {
      newAvatar = URL.createObjectURL(avatarFile);
    }

    setUser({ ...user, name: editName, avatar: newAvatar });
    setActiveTab("dashboard");
  };

  return (
    <div
      className="flex min-h-screen relative"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_NVht_JZiyGLU4VIa-crikzYe8ILxSB0Xg&s')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      <aside className="w-72 bg-blue-900/80 backdrop-blur-md text-white flex flex-col p-6 space-y-6 shadow-xl rounded-r-xl">

        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-white shadow"
          />
          <div>
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-sm text-gray-200 capitalize">{role}</p>
          </div>
        </div>

        <nav className="flex flex-col space-y-3 mt-6">
          {["dashboard", "profile"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-left rounded-lg transition ${
                activeTab === tab
                  ? "bg-yellow-400 text-blue-900 font-semibold shadow"
                  : "hover:bg-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}

          {role === "EMPLOYEE" && (
            <>
              <button
                className={`px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "jobs"
                    ? "bg-yellow-400 text-blue-900 font-semibold shadow"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                Jobs
              </button>
              <button
                className={`px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "applications"
                    ? "bg-yellow-400 text-blue-900 font-semibold shadow"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setActiveTab("applications")}
              >
                Applications
              </button>
            </>
          )}

          {role === "EMPLOYER" && (
            <>
              <button
                className={`px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "jobs"
                    ? "bg-yellow-400 text-blue-900 font-semibold shadow"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                Manage Jobs
              </button>
              <button
                className={`px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "applications"
                    ? "bg-yellow-400 text-blue-900 font-semibold shadow"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setActiveTab("applications")}
              >
                View Applications
              </button>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <button
                className={`px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "users"
                    ? "bg-yellow-400 text-blue-900 font-semibold shadow"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setActiveTab("users")}
              >
                Manage Users
              </button>
              <button
                className={`px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "jobs"
                    ? "bg-yellow-400 text-blue-900 font-semibold shadow"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                Manage Jobs
              </button>
              <button
                className={`px-4 py-2 text-left rounded-lg transition ${
                  activeTab === "reports"
                    ? "bg-yellow-400 text-blue-900 font-semibold shadow"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                Reports
              </button>
            </>
          )}
        </nav>

        <button
          onClick={logout}
          className="mt-auto px-4 py-2 bg-red-600 rounded-lg shadow hover:bg-red-500 transition"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-10 backdrop-blur-sm">
        <div className="relative mb-10 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/header-bg.jpg"
            alt="Header Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative flex justify-between items-center p-6">
            <div>
              <h1 className="text-3xl font-bold text-white capitalize">
                {activeTab}
              </h1>
              <p className="text-gray-200 text-sm mt-1">
                Welcome back, {user.name}! Here’s your overview.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-200 text-sm">{user.email}</span>
              <img
                src={user.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow cursor-pointer hover:scale-105 transition"
              />
            </div>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-blue-800">
                  Applications
                </h3>
                <p className="text-4xl font-bold mt-4 text-gray-800">5</p>
                <p className="text-gray-500 mt-2">Jobs you applied to</p>
              </div>

              <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-blue-800">
                  Jobs Posted
                </h3>
                <p className="text-4xl font-bold mt-4 text-gray-800">3</p>
                <p className="text-gray-500 mt-2">For Employers</p>
              </div>

              <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-blue-800">Users</h3>
                <p className="text-4xl font-bold mt-4 text-gray-800">150</p>
                <p className="text-gray-500 mt-2">Admin overview</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8">
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

        {activeTab === "jobs" && <p>📋 Jobs section (coming soon)</p>}
        {activeTab === "applications" && <p>📩 Applications section</p>}
        {activeTab === "users" && <p>👥 Manage Users</p>}
        {activeTab === "reports" && <p>📊 Reports coming soon</p>}
      </main>
    </div>
  );
}
