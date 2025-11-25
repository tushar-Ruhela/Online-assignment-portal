import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [counts, setCounts] = useState({});
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosInstance.get("/student/dashboard");
        setCounts(res.data.counts);
        setRecent(res.data.recentAssignments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-600 font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const statusConfig = {
    Draft: {
      bgGradient: "from-gray-400 to-gray-600",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      lightBg: "bg-gray-50",
      darkText: "text-gray-700"
    },
    Submitted: {
      bgGradient: "from-yellow-400 to-orange-500",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      lightBg: "bg-yellow-50",
      darkText: "text-yellow-700"
    },
    Approved: {
      bgGradient: "from-green-400 to-emerald-600",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      lightBg: "bg-green-50",
      darkText: "text-green-700"
    },
    Rejected: {
      bgGradient: "from-red-400 to-red-600",
      icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      lightBg: "bg-red-50",
      darkText: "text-red-700"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">My Dashboard</h1>
              <p className="text-gray-600">Track your assignment progress and submissions</p>
            </div>

            {/* Upload Assignment Button */}
            <button
              onClick={() => navigate("/upload-assignment")}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Upload Assignment</span>
            </button>
          </div>
        </div>

        {/* 🔥 My Assignments Button */}
        <div className="flex justify-end mb-6 -mt-2">
          <button
            onClick={() => navigate("/my-assignments")}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition font-semibold"
          >
            📄 My Assignments
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {["Draft", "Submitted", "Approved", "Rejected"].map((status) => (
            <div
              key={status}
              className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig[status].bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${statusConfig[status].bgGradient}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={statusConfig[status].icon} />
                    </svg>
                  </div>

                  <div className={`px-3 py-1 rounded-full ${statusConfig[status].lightBg} ${statusConfig[status].darkText} text-xs font-semibold`}>
                    {status}
                  </div>
                </div>

                <p className="text-3xl font-bold text-gray-800">{counts[status] || 0}</p>
                <p className="text-sm text-gray-500">Total {status}</p>
              </div>

              <div className={`h-1 bg-gradient-to-r ${statusConfig[status].bgGradient}`}></div>
            </div>
          ))}
        </div>

        {/* Recent Submissions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Recent Submissions</h2>
            </div>
            <span className="text-sm text-gray-500">Last 5 assignments</span>
          </div>

          {recent.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No assignments yet</p>
              <p className="text-gray-400 text-sm">Upload your first assignment to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((a) => (
                <div
                  key={a._id}
                  className="group flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${statusConfig[a.status]?.bgGradient || statusConfig.Draft.bgGradient}`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={statusConfig[a.status]?.icon || statusConfig.Draft.icon} />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition">
                        {a.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(a.createdAt).toLocaleDateString("en-US")}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      a.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : a.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : a.status === "Submitted"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
