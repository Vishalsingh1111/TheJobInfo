import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from '../src/Home/Home';
import Languages from './Content/Languages';
import Project from './Content/Project';
import About from './components/Whatweoffer';
import Sheet from './Content/Sheet';
import LoginPage from './components/Login';
import Forgetpassword from './components/Forgetpassword';
import Signup from './components/Signup';
import AdminloginPage from './components/Adminlogin';
import AddAdmin from './components/Addadmin';
import Contact from './Contacts/Contact';
import Pagenotfound from './components/Pagenotfound';
import Technicalblog from './Content/Technicalblog';
import DSA from './components/Language/DSA/DSA';
import Python from './components/Language/Python/Python';
import Java from './components/Language/Java/Java';
import Dbms from './components/Language/DBMS/Dbms';
import Cpp from './components/Language/C++/Cpp';
import C from './components/Language/C/C';
import Techblog from './components/TechBlogs/Techblog';
import CSPage from './components/CSSubject/CSPage';
import BlogDetail from './components/TechBlogs/Blogdetail';
import ContestSol from './components/ContestSolution/ContestSolPage';
import ContestSoldetail from './components/ContestSolution/Contestdetail';
import Projectdetail from './components/Projects/Projectdetail';
import Projectpage from './components/Projects/Projectpage';
import DashBoard from './components/Admin/Dashboard';
import Contactform from './Contacts/Contactform';
import { useAuth } from './Context/AuthProvider';
import { useadminAuth } from './Context/AuthProvider2';
import Profile from './components/Profile';
import Ai from './components/Aipage';
import ResultDetailPage from './components/ResultDetailPage';
import NewUpdatedSheet from '../src/Content/Sheet';
import CompanyWiseSheet from './components/CompanyWise/CompanyMain';
import Top50dsaProb from './components/Top50dsaProb/Top50Sheetcard';
import Contributeblog from './components/TechBlogs/UserContribution';


const App = () => {
  //auth user function 
  const [authUser, setAuthUser] = useAuth();
  const [authAdmin, setAuthAdmin] = useadminAuth();



  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path='/Contactform' element={authUser ? <Contactform /> : <Navigate to="/Signup" />}></Route>
          <Route path="/Languages" element={<Languages />}></Route>
          <Route path="/Project" element={<Project />}></Route>
          <Route path="/Sheet" element={<Sheet />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/Adminlogin" element={<AdminloginPage />}></Route>
          <Route path="/AddAdmin" element={<AddAdmin />}></Route>
          <Route path="/Forgetpassword" element={<Forgetpassword />}></Route>
          <Route path='/Pagenotfound' element={<Pagenotfound />}></Route>
          <Route path='/Technical-Blog' element={<Technicalblog />}></Route>
          <Route path='/Contest-Solution' element={authUser ? <ContestSol /> : <Navigate to="/Signup" />}></Route>
          <Route path='/CS-Fundamental' element={<CSPage />}></Route>
          <Route path='/DSA' element={authUser ? <DSA /> : <Navigate to="/Signup" />}></Route>
          <Route path='/New-Updated-Sheet' element={<NewUpdatedSheet />}></Route>
          <Route path='/Company-Wise-Sheet' element={<CompanyWiseSheet />}></Route>
          <Route path='/Top-50' element={<Top50dsaProb />}></Route>
          <Route path='/Python' element={<Python />}></Route>
          <Route path='/Dbms' element={authUser ? <Dbms /> : <Navigate to="/Signup" />}></Route>
          <Route path='/Java' element={<Java />}></Route>
          <Route path='/Cpp' element={<Cpp />}></Route>
          <Route path='/C' element={<C />}></Route>
          <Route path='/techblog' element={<Techblog />}></Route>
          <Route path='/Contibuteblog' element={authUser ? <Contributeblog /> : <Navigate to="/Signup" />}></Route>
          <Route path='/detail/:id' element={<BlogDetail />}></Route>
          <Route path='/Projectpage' element={<Projectpage />}></Route>
          <Route path='/projectdetail/:id' element={<Projectdetail />}></Route>
          <Route path='/contestdetail/:id' element={<ContestSoldetail />}></Route>
          <Route path='/Dashboard' element={authAdmin ? <DashBoard /> : <Navigate to="/Adminlogin" />}></Route>
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Ai' element={<Ai />} />
          <Route path="/results/:id" component={ResultDetailPage} />


        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
