import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

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

  const handleFilter = (status) => {
    setStatusFilter(status);
    if (status === "All") {
      setFiltered(assignments);
    } else {
      setFiltered(assignments.filter(a => a.status === status));
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);

    const sorted = [...filtered].sort((a, b) => {
      if (order === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      else return new Date(a.createdAt) - new Date(b.createdAt);
    });

    setFiltered(sorted);
  };

  const badgeColor = {
    Draft: "bg-gray-200 text-gray-700",
    Submitted: "bg-yellow-200 text-yellow-800",
    Approved: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800"
  };
return (
  <div className="min-h-screen bg-purple-100 p-6">
    <div className="max-w-5xl mx-auto bg-white bg-opacity-80 p-8 rounded-xl shadow-lg border-2 border-purple-200">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-purple-700">My Assignments</h1>
        <button
          onClick={() => navigate("/upload-assignment")}
          className="px-5 py-2 bg-purple-700 text-white rounded-lg drop-shadow hover:bg-purple-800 transition"
        >
          Upload New
        </button>
      </div>

      {/* FILTER + SORT */}
      <div className="flex items-center space-x-4 mb-8">
        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => handleFilter(e.target.value)}
          className="px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
        >
          <option>All</option>
          <option>Draft</option>
          <option>Submitted</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full border-2 border-purple-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-purple-200 text-left">
            <th className="p-3 border-b border-purple-300">Title</th>
            <th className="p-3 border-b border-purple-300">Category</th>
            <th className="p-3 border-b border-purple-300">Status</th>
            <th className="p-3 border-b border-purple-300">Submitted</th>
            <th className="p-3 border-b border-purple-300">Reviewer</th>
            <th className="p-3 border-b border-purple-300">Action</th>
          </tr>
        </thead>
        <tbody>
  {filtered.map(a => (
    <tr key={a._id} className="hover:bg-purple-100">
      <td className="p-3 border-b border-purple-100">{a.title}</td>

      <td className="p-3 border-b border-purple-100">
        {a.category || "N/A"}
      </td>

      <td className="p-3 border-b border-purple-100">
        <span
          className={`px-3 py-1 rounded-lg text-sm font-semibold ${
            badgeColor[a.status] || "bg-purple-200 text-purple-800"
          }`}
        >
          {a.status}
        </span>
      </td>

      <td className="p-3 border-b border-purple-100">
        {new Date(a.createdAt).toLocaleDateString()}
      </td>

      <td className="p-3 border-b border-purple-100">
        {a.reviewer ? a.reviewer.name : "Pending"}
      </td>

      {/* ACTION COLUMN */}
      <td className="p-3 border-b border-purple-100 space-x-3">

        {/* 👉 View Details */}
        <button
          onClick={() => navigate(`/assignment/${a._id}`)}
          className="text-purple-700 font-semibold hover:underline"
        >
          View
        </button>

        {/* 👉 RESUBMIT BUTTON (Only for rejected assignments) */}
        {a.status === "Rejected" && (
          <button
            onClick={() => navigate(`/assignment/${a._id}/resubmit`)}
            className="text-yellow-700 font-semibold hover:underline ml-2"
          >
            Resubmit
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  </div>
);

}
