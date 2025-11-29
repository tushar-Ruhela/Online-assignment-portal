import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import StudentNavbar from "../components/ StudentNavbar";

export default function MyAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axiosInstance.get("/student/assignments");
      setAssignments(res.data.assignments);
      setFiltered(res.data.assignments);
    } catch (err) {
      console.error("Error loading assignments:", err);
    }
  };

  // Apply both filter and sort together
  const applyFilterAndSort = (status, order) => {
    // Step 1: Filter
    let result = status === "All" 
      ? [...assignments] 
      : assignments.filter(a => a.status === status);

    // Step 2: Sort
    result.sort((a, b) => {
      if (order === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    setFiltered(result);
  };

  const handleFilter = (status) => {
    setStatusFilter(status);
    applyFilterAndSort(status, sortOrder);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    applyFilterAndSort(statusFilter, order);
  };

  const badgeColor = {
    Draft: "bg-gray-200 text-gray-700",
    Submitted: "bg-yellow-200 text-yellow-800",
    Approved: "bg-emerald-200 text-emerald-800",
    Rejected: "bg-red-200 text-red-800"
  };

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-emerald-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border-2 border-emerald-100 p-6 sm:p-8">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
              My Assignments
            </h1>
            <button
              onClick={() => navigate("/upload-assignment")}
              className="w-full sm:w-auto px-5 py-2 bg-emerald-700 text-white rounded-lg shadow-md hover:bg-emerald-800 transition font-semibold text-sm sm:text-base"
            >
              Upload New
            </button>
          </div>

          {/* FILTER + SORT */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Filter */}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => handleFilter(e.target.value)}
                className="w-full px-3 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm"
              >
                <option>All</option>
                <option>Draft</option>
                <option>Submitted</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Sort by Date
              </label>
              <select
                value={sortOrder}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full px-3 py-2 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* TABLE - Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-2 border-emerald-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-emerald-700 text-white text-left">
                  <th className="p-3 text-xs font-bold uppercase">Title</th>
                  <th className="p-3 text-xs font-bold uppercase">Category</th>
                  <th className="p-3 text-xs font-bold uppercase">Status</th>
                  <th className="p-3 text-xs font-bold uppercase">Submitted</th>
                  <th className="p-3 text-xs font-bold uppercase">Reviewer</th>
                  <th className="p-3 text-xs font-bold uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map(a => (
                    <tr key={a._id} className="hover:bg-emerald-50 transition-colors">
                      <td className="p-3 border-b border-emerald-100 text-sm font-medium text-gray-900">
                        {a.title}
                      </td>

                      <td className="p-3 border-b border-emerald-100 text-sm text-gray-600">
                        {a.category || "N/A"}
                      </td>

                      <td className="p-3 border-b border-emerald-100">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            badgeColor[a.status] || "bg-emerald-200 text-emerald-800"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>

                      <td className="p-3 border-b border-emerald-100 text-sm text-gray-600">
                        {new Date(a.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-3 border-b border-emerald-100 text-sm text-gray-600">
                        {a.reviewer ? a.reviewer.name : "Pending"}
                      </td>

                      <td className="p-3 border-b border-emerald-100">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigate(`/assignment/${a._id}`)}
                            className="text-emerald-700 font-semibold hover:underline text-sm"
                          >
                            View
                          </button>

                          {a.status === "Rejected" && (
                            <button
                              onClick={() => navigate(`/assignment/${a._id}/resubmit`)}
                              className="text-yellow-600 font-semibold hover:underline text-sm"
                            >
                              Resubmit
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500 text-sm">
                      No assignments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* CARDS - Mobile View */}
          <div className="md:hidden space-y-4">
            {filtered.length > 0 ? (
              filtered.map(a => (
                <div
                  key={a._id}
                  className="bg-emerald-50 border-2 border-emerald-100 rounded-lg p-4 hover:border-emerald-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-base flex-1">
                      {a.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ml-2 ${
                        badgeColor[a.status] || "bg-emerald-200 text-emerald-800"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-3">
                    <p><span className="font-semibold">Category:</span> {a.category || "N/A"}</p>
                    <p><span className="font-semibold">Submitted:</span> {new Date(a.createdAt).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Reviewer:</span> {a.reviewer ? a.reviewer.name : "Pending"}</p>
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-emerald-200">
                    <button
                      onClick={() => navigate(`/assignment/${a._id}`)}
                      className="flex-1 bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-800 transition text-sm"
                    >
                      View
                    </button>

                    {a.status === "Rejected" && (
                      <button
                        onClick={() => navigate(`/assignment/${a._id}/resubmit`)}
                        className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition text-sm"
                      >
                        Resubmit
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No assignments found
              </div>
            )}
          </div>

          {/* Total Count */}
          <div className="mt-6 text-center">
            <p className="text-sm text-emerald-600">
              Showing <span className="font-bold text-emerald-800">{filtered.length}</span> of{" "}
              <span className="font-bold text-emerald-800">{assignments.length}</span> assignments
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
