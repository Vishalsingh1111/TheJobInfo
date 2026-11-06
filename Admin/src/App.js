
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AdminloginPage from './Admin/Admin_authentications/Adminlogin';
import AddAdmin from './Admin/Admin_authentications/Addadmin';
import DashBoard from './Admin/Admin_common/Dashboard';
// import { useadminAuth } from './Context/AuthProvider2';
import { useAdminAuth } from './Context/AuthProvider2';
import BlogForm from "./Admin/Blogs/BlogForm";

function App() {
  const [authAdmin] = useAdminAuth();
  return (
    <Router>

      <div className="admin-theme min-h-screen">
        <Routes>
          <Route path='/' element={authAdmin?.token ? <DashBoard /> : <Navigate to="/login" replace />}></Route>
          <Route path="/login" element={authAdmin?.token ? <Navigate to="/" replace /> : <AdminloginPage />}></Route>
          <Route path="/Adminlogin" element={<Navigate to="/login" replace />}></Route>
          <Route path="/AddAdmin" element={authAdmin?.token ? <AddAdmin /> : <Navigate to="/login" replace />}></Route>
          <Route path="/BlogForm" element={authAdmin?.token ? <BlogForm /> : <Navigate to="/login" replace />}></Route>

        </Routes>

        {/* Music player will be fixed at bottom */}

      </div>
    </Router>
  );
}

export default App;




