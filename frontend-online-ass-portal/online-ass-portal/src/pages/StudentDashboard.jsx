import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../components/ StudentNavbar";

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
      <>
        <StudentNavbar />
        <div className="min-h-screen flex items-center justify-center bg-emerald-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-emerald-600 font-semibold">Loading Dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  const statusConfig = {
    Draft: {
      bgColor: "bg-gray-500",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      lightBg: "bg-gray-50",
      darkText: "text-gray-700"
    },
    Submitted: {
      bgColor: "bg-yellow-500",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      lightBg: "bg-yellow-50",
      darkText: "text-yellow-700"
    },
    Approved: {
      bgColor: "bg-emerald-600",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      lightBg: "bg-emerald-50",
      darkText: "text-emerald-700"
    },
    Rejected: {
      bgColor: "bg-red-600",
      icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      lightBg: "bg-red-50",
      darkText: "text-red-700"
    }
  };

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-emerald-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-2">
              My Dashboard
            </h1>
            <p className="text-sm sm:text-base text-emerald-600">
              Track your assignment progress and submissions
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {["Draft", "Submitted", "Approved", "Rejected"].map((status) => (
              <div
                key={status}
                className="bg-white rounded-2xl shadow-md border-2 border-emerald-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${statusConfig[status].bgColor}`}>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={statusConfig[status].icon} />
                      </svg>
                    </div>

                    <div className={`px-2 sm:px-3 py-1 rounded-full ${statusConfig[status].lightBg} ${statusConfig[status].darkText} text-xs font-semibold`}>
                      {status}
                    </div>
                  </div>

                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {counts[status] || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Total {status}
                  </p>
                </div>

                <div className={`h-1 ${statusConfig[status].bgColor}`}></div>
              </div>
            ))}
          </div>

          {/* Recent Submissions */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-700 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-800">
                  Recent Submissions
                </h2>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">
                Last 5 assignments
              </span>
            </div>

            {recent.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-emerald-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-base sm:text-lg mb-2">
                  No assignments yet
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-4">
                  Upload your first assignment to get started
                </p>
                <button
                  onClick={() => navigate("/upload-assignment")}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
                >
                  Upload Assignment
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map((a) => (
                  <div
                    key={a._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-emerald-50 rounded-xl border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all gap-3"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0 w-full sm:w-auto">
                      <div className={`p-2 rounded-lg ${statusConfig[a.status]?.bgColor || statusConfig.Draft.bgColor} flex-shrink-0`}>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={statusConfig[a.status]?.icon || statusConfig.Draft.icon} />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                          {a.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(a.createdAt).toLocaleDateString("en-US")}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap self-start sm:self-center ${
                        a.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
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
    </>
  );
}
