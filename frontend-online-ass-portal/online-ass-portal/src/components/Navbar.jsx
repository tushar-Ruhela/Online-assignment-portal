import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-700 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link 
            to="/dashboard" 
            className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
          >
            Dashboard
          </Link>
          <Link 
            to="/create-department" 
            className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
          >
            Create Department
          </Link>
        </div>
        
        <button 
          onClick={logout} 
          className="bg-white-600 hover:bg-bl-700 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
