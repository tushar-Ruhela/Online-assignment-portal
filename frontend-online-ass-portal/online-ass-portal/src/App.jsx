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
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-department" element={<CreateDepartment />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/user-list" element={<UserList />}/>
        <Route path="/departments-list" element={<DepartmentsList />} /> 
 <Route path="/student-dashboard" element={<StudentDashboard />} />
 <Route path="admin/departments/edit/:id"element={<EditDepartment/>}/>
      </Routes>
    
  );
}

export default App;
