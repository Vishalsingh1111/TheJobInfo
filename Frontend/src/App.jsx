import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from '../src/Home/Home';
import Languages from './Content/Languages';
import About from './components/Common/Whatweoffer';
import Sheet from './Content/Sheet';
import LoginPage from './components/Authentications/Login';
import Forgetpassword from './components/Authentications/Forgetpassword';
import Signup from './components/Authentications/Signup';
import Contact from './Contacts/Contact';
import Pagenotfound from './components/Common/Pagenotfound';
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
import ContestSol from './components/InstaContent/Posts';
import Reels from './components/InstaContent/Reels';
import Contactform from './Contacts/Contactform';
import { useAuth } from './Context/AuthProvider';
import Profile from './components/Common/Profile';
import Ai from './components/Common/Aipage';
import ResultDetailPage from './components/Common/ResultDetailPage';
import NewUpdatedSheet from '../src/Content/Sheet';
import CompanyWiseSheet from './components/CompanyWise/CompanyMain';
import Top50dsaProb from './components/Top50dsaProb/Top50Sheetcard';
import Contributeblog from './components/TechBlogs/UserContribution';
import RoadmapsPage from './components/RoadMaps/RoadmapPage';


const App = () => {
  //auth user function 
  const [authUser, setAuthUser] = useAuth();


  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path='/Contactform' element={authUser ? <Contactform /> : <Navigate to="/Login" />}></Route>
          <Route path='/Languages' element={authUser ? <Languages /> : <Navigate to="/Login" />}></Route>
          <Route path='/Sheet' element={authUser ? <Sheet /> : <Navigate to="/Login" />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/Forgetpassword" element={<Forgetpassword />}></Route>
          <Route path='/Pagenotfound' element={<Pagenotfound />}></Route>
          <Route path='/Technical-Blog' element={authUser ? <Technicalblog /> : <Navigate to="/Login" />}></Route>
          <Route path='/Post' element={authUser ? <ContestSol /> : <Navigate to="/Login" />}></Route>
          <Route path='/CS-Fundamental' element={authUser ? <CSPage /> : <Navigate to="/Login" />}></Route>
          <Route path='/DSA' element={authUser ? <DSA /> : <Navigate to="/Login" />}></Route>
          <Route path='/New-Updated-Sheet' element={authUser ? <NewUpdatedSheet /> : <Navigate to="/Login" />}></Route>
          <Route path='/Company-Wise-Sheet' element={authUser ? <CompanyWiseSheet /> : <Navigate to="/Login" />}></Route>
          <Route path='/Top-50' element={authUser ? <Top50dsaProb /> : <Navigate to="/Login" />}></Route>
          <Route path='/Python' element={<Python />}></Route>
          <Route path='/Dbms' element={authUser ? <Dbms /> : <Navigate to="/Login" />}></Route>
          <Route path='/Java' element={<Java />}></Route>
          <Route path='/Cpp' element={<Cpp />}></Route>
          <Route path='/C' element={<C />}></Route>
          <Route path='/techblog' element={<Techblog />}></Route>
          <Route path='/Contibuteblog' element={authUser ? <Contributeblog /> : <Navigate to="/Login" />}></Route>
          <Route path='/jobdetail/:id' element={authUser ? <BlogDetail /> : <Navigate to="/Login" />}></Route>
          <Route path='/Reels' element={authUser ? <Reels /> : <Navigate to="/Login" />}></Route>
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Ai' element={authUser ? <Ai /> : <Navigate to="/Login" />}></Route>
          <Route path="/results/:id" component={ResultDetailPage} />
          <Route path='/RoadMap' element={authUser ? <RoadmapsPage /> : <Navigate to="/Login" />}></Route>
          {/* <Route path="/RoadMap" element={<RoadmapsPage />} /> */}
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
