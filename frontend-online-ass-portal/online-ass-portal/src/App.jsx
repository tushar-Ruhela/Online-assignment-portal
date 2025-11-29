import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/Createuser";
import CreateDepartment from "./pages/CreateDepartment";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ViewUsers from "./pages/ViewUsers";
import EditUser from "./pages/EditUser";
import UserList from "./pages/UserList";
import StudentDashboard from "./pages/StudentDashboard";
import DepartmentsList from "./pages/DepartmentsList";
import EditDepartment from "./pages/EditDepartment"
import ForgotPassword from "./pages/ForgotPassword";
import UploadAssignment from "./pages/UploadAssignment";
import MyAssignments from "./pages/MyAssignments";
import AssignmentDetails from "./pages/AssignmentDetails";
import ProfessorDashboard from "./pages/ProfessorDashboard";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/create-department" element={<CreateDepartment />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/user-list" element={<UserList />}/>
        <Route path="/departments-list" element={<DepartmentsList />} /> 
 <Route path="/student-dashboard" element={<StudentDashboard />} />
 <Route path="admin/departments/edit/:id"element={<EditDepartment/>}/>
 <Route path="/forgot-password" element={<ForgotPassword/>} />
  
<Route path="/upload-assignment" element={<UploadAssignment />} />
<Route path="/my-assignments" element={<MyAssignments />} />
<Route path="/assignment/:id" element={<AssignmentDetails />} />
<Route path="/professor-dashboard" element={<ProfessorDashboard/>}/>
      </Routes>
    
  );
}

export default App;
