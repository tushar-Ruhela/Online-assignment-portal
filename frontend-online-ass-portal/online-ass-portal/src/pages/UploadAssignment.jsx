import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function UploadAssignment() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Assignment"
  });

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFiles = (selectedFiles) => {
    if (selectedFiles.length > 5) {
      setMessage("⚠️ You can upload a maximum of 5 files.");
      return false;
    }

    for (let file of selectedFiles) {
      if (file.type !== "application/pdf") {
        setMessage("⚠️ Only PDF files are allowed.");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setMessage("⚠️ Each file must be less than 10MB.");
        return false;
      }
    }

    setMessage("");
    return true;
  };

  const handleFiles = (e) => {
    let selectedFiles = [...e.target.files];
    if (validateFiles(selectedFiles)) {
      setFiles(selectedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    let selectedFiles = [...e.dataTransfer.files];
    if (validateFiles(selectedFiles)) {
      setFiles(selectedFiles);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      return setMessage("⚠️ Please select at least 1 PDF file.");
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);

    files.forEach((file) => {
      data.append("files", file);
    });

    try {
      setIsUploading(true);
      const res = await axiosInstance.post(
        "/student/assignments/upload",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("✅ " + res.data.message);

      setTimeout(() => {
        navigate("/student-dashboard");
      }, 1500);

    } catch (err) {
      console.log(err);
      setMessage("❌ Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/student-dashboard")}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Upload Assignment</h1>
              <p className="text-gray-600 mt-1">Submit your work in PDF format (max 5 files)</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>Assignment Title</span>
              </label>
              <input
                name="title"
                placeholder="e.g., Data Structures Assignment 3"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 hover:border-purple-300"
                onChange={handleChange}
                required
              />
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span>Description (Optional)</span>
              </label>
              <textarea
                name="description"
                placeholder="Brief description of your assignment..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 hover:border-purple-300 resize-none"
                rows="4"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Category</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 hover:border-purple-300 appearance-none bg-white cursor-pointer"
                  onChange={handleChange}
                >
                  <option value="Assignment">Assignment</option>
                  <option value="Thesis">Thesis</option>
                  <option value="Report">Report</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* File Upload Drag & Drop Area */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Upload Files (PDF only, max 10MB each)</span>
              </label>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                  isDragging
                    ? "border-purple-500 bg-purple-50 scale-105"
                    : "border-gray-300 hover:border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-50"
                }`}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  multiple
                  onChange={handleFiles}
                  id="file-input"
                />
                
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    {isDragging ? "Drop files here" : "Drag & drop files here"}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <label
                    htmlFor="file-input"
                    className="inline-block px-6 py-2 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-200"
                  >
                    Browse Files
                  </label>
                  <p className="text-xs text-gray-400 mt-4">PDF files only • Max 5 files • 10MB per file</p>
                </div>
              </div>
            </div>

            {/* Selected Files List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Selected Files ({files.length}/5)</span>
                </p>
                
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                      >
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div
                className={`p-4 rounded-xl ${
                  message.includes("✅")
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <p className="font-medium">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-4 rounded-xl font-semibold shadow-lg transform transition-all duration-200 flex items-center justify-center space-x-2 ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl hover:-translate-y-0.5"
              }`}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Upload Assignment</span>
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
