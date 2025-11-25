import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function AssignmentDetails() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/student/assignments/${id}`)
      .then(res => setAssignment(res.data.assignment))
      .catch(err => console.error(err));
  }, [id]);

  const downloadFile = () => {
    window.location.href = `http://localhost:5000/api/student/assignments/${id}/download`;
  };

  if (!assignment) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{assignment.title}</h1>

      <p className="mt-2 text-gray-700">{assignment.description}</p>

      <div className="mt-4">
        <p><strong>Status:</strong> {assignment.status}</p>
        <p><strong>Reviewer:</strong> {assignment.reviewer?.name || "Pending"}</p>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadFile}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download File
      </button>

      {/* Timeline Section */}
      <h2 className="mt-8 text-xl font-semibold">Approval History</h2>

      {assignment.history.length === 0 ? (
        <p>No history available</p>
      ) : (
        <div className="mt-4 border-l-4 border-blue-500 pl-4 space-y-6">

          {assignment.history.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-3 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>

              <p className="font-bold">{item.action.toUpperCase()}</p>

              <p className="text-sm text-gray-600">
                Reviewer: {item.reviewer?.name || "N/A"}
              </p>

              {item.remark && (
                <p className="text-gray-700">Remark: {item.remark}</p>
              )}

              <p className="text-sm text-gray-500">
                Date: {new Date(item.date).toLocaleString()}
              </p>

              {item.signature && (
                <img
                  src={item.signature}
                  alt="signature"
                  className="h-12 mt-2"
                />
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
