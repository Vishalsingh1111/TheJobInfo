
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AdminloginPage from './Admin/Admin_authentications/Adminlogin';
import AddAdmin from './Admin/Admin_authentications/Addadmin';
import DashBoard from './Admin/Admin_common/Dashboard';
// import { useadminAuth } from './Context/AuthProvider2';
import { useAdminAuth } from './Context/AuthProvider2';


function App() {
  const [authAdmin, setAuthAdmin] = useAdminAuth();
  return (
    <Router>

      <div className="min-h-screen bg-black text-white pb-20">
        <Routes>
          <Route path='/' element={authAdmin ? <DashBoard /> : <Navigate to="/Adminlogin" />}></Route>
          <Route path="/Adminlogin" element={<AdminloginPage />}></Route>
          <Route path="/AddAdmin" element={<AddAdmin />}></Route>

        </Routes>

        {/* Music player will be fixed at bottom */}

      </div>
    </Router>
  );
}

export default App;





