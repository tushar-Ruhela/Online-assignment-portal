// StudentNavbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";

export default function StudentNavbar() {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    // Get student name from localStorage or context
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setStudentName(user.name || "Student");
  }, []);

  return (
    <nav className="bg-emerald-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Brand with Student Name */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/student-dashboard" 
              className="text-white text-xl sm:text-2xl font-bold hover:text-emerald-100 transition-colors duration-200"
            >
              Student Portal
            </Link>
            <span className="hidden md:block text-emerald-100 text-sm">
              Welcome, {studentName}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/student-dashboard" 
              className="text-white hover:text-emerald-100 hover:bg-emerald-600 px-3 py-2 rounded-md transition-all duration-200 font-medium text-sm lg:text-base"
            >
              Dashboard
            </Link>
            <Link 
              to="/my-assignments" 
              className="text-white hover:text-emerald-100 hover:bg-emerald-600 px-3 py-2 rounded-md transition-all duration-200 font-medium text-sm lg:text-base"
            >
              My Assignments
            </Link>
            <Link 
              to="/upload-assignment" 
              className="text-white hover:text-emerald-100 hover:bg-emerald-600 px-3 py-2 rounded-md transition-all duration-200 font-medium text-sm lg:text-base"
            >
              Upload Assignment
            </Link>
            
            <button 
              onClick={logout} 
              className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-md transition-colors duration-200 font-semibold text-sm lg:text-base shadow-md"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-700 p-2 rounded-md"
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="text-emerald-100 text-sm px-3 py-2">
              Welcome, {studentName}
            </div>
            <Link 
              to="/student-dashboard" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-white hover:text-emerald-100 hover:bg-emerald-600 px-3 py-2 rounded-md transition-all duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/my-assignments" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-white hover:text-emerald-100 hover:bg-emerald-600 px-3 py-2 rounded-md transition-all duration-200 font-medium"
            >
              My Assignments
            </Link>
            <Link 
              to="/upload-assignment" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-white hover:text-emerald-100 hover:bg-emerald-600 px-3 py-2 rounded-md transition-all duration-200 font-medium"
            >
              Upload Assignment
            </Link>
            
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="w-full text-left bg-white text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-md transition-colors duration-200 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
