// pages/ProfessorDashboard.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ProfessorDashboard() {
  const [data, setData] = useState({ pendingCount: 0, assignments: [] });

  useEffect(() => {
    axiosInstance.get("/professor/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-purple-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">
          Professor Dashboard
        </h1>

        <div className="mb-4 text-red-600 font-semibold">
          Pending Reviews: {data.pendingCount}
        </div>

        <table className="w-full border">
          <thead className="bg-purple-200">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Title</th>
              <th className="p-3">Submitted</th>
              <th className="p-3">Days Pending</th>
            </tr>
          </thead>

          <tbody>
            {data.assignments.map(a => (
              <tr key={a._id}>
                <td className="p-3">{a.student.name}</td>
                <td className="p-3">{a.title}</td>
                <td className="p-3">
                  {new Date(a.submittedAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-red-600">
                  {Math.floor((Date.now() - new Date(a.submittedAt)) / 86400000)} days
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
