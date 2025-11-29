import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import StudentNavbar from "../components/ StudentNavbar";

export default function AssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/student/assignments/${id}`)
      .then(res => {
        setAssignment(res.data.assignment);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const downloadFile = () => {
    window.location.href = `http://localhost:5000/api/student/assignments/${id}/download`;
  };

  if (loading) {
    return (
      <>
        <StudentNavbar />
        <div className="min-h-screen flex items-center justify-center bg-emerald-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-emerald-600 font-semibold">Loading Assignment...</p>
          </div>
        </div>
      </>
    );
  }

  if (!assignment) {
    return (
      <>
        <StudentNavbar />
        <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Assignment not found</p>
            <button
              onClick={() => navigate("/my-assignments")}
              className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition font-semibold"
            >
              Back to Assignments
            </button>
          </div>
        </div>
      </>
    );
  }

  const statusConfig = {
    Draft: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" },
    Submitted: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300" },
    Approved: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" },
    Rejected: { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" }
  };

  const currentStatus = statusConfig[assignment.status] || statusConfig.Draft;

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-emerald-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/my-assignments")}
            className="mb-4 flex items-center text-emerald-700 hover:text-emerald-800 font-semibold transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Assignments
          </button>

          {/* Assignment Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 p-6 sm:p-8 mb-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">
                  {assignment.title}
                </h1>
                <p className="text-sm text-gray-500">
                  Submitted on {new Date(assignment.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${currentStatus.bg} ${currentStatus.text} border-2 ${currentStatus.border}`}>
                {assignment.status}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {assignment.description || "No description provided"}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-emerald-50 rounded-lg border-2 border-emerald-100">
              <div>
                <p className="text-sm font-semibold text-gray-600">Category</p>
                <p className="text-gray-900">{assignment.category || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Reviewer</p>
                <p className="text-gray-900">{assignment.reviewer?.name || "Pending"}</p>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadFile}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition font-semibold shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download File</span>
            </button>
          </div>

          {/* Approval History */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Approval History
            </h2>

            {!assignment.history || assignment.history.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-emerald-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">No history available yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {assignment.history.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative pl-8 pb-6 border-l-4 border-emerald-300 last:border-l-0 last:pb-0"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[13px] top-1 w-6 h-6 bg-emerald-600 rounded-full border-4 border-white shadow-md"></div>

                    {/* Content */}
                    <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-100">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-bold text-emerald-800 text-lg uppercase">
                          {item.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleString()}
                        </p>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Reviewer:</span> {item.reviewer?.name || "N/A"}
                      </p>

                      {item.remark && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-200">
                          <p className="text-sm font-semibold text-gray-700 mb-1">Remark:</p>
                          <p className="text-gray-800">{item.remark}</p>
                        </div>
                      )}

                      {item.signature && (
                        <div className="mt-3">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Signature:</p>
                          <img
                            src={item.signature}
                            alt="Reviewer signature"
                            className="h-12 sm:h-16 border border-gray-300 rounded bg-white p-2"
                          />
                        </div>
                      )}
                    </div>
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
