
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from '../src/Home/Home';
import About from './components/Common/Whatweoffer';
// import LoginPage from './components/Authentications/Login';
import Forgetpassword from './components/Authentications/Forgetpassword';
import Signup from './components/Authentications/Signup';
import Contact from './Contacts/Contact';
import Pagenotfound from './components/Common/Pagenotfound';
import Technicalblog from './Content/Technicalblog';
import Techblog from './components/Jobs/Jobblog';
import BlogDetail from './components/Jobs/Jobsdetail';
import Fresherjobs from './components/Jobs/Fresherjob';
import Experiencedjobs from './components/Jobs/Experiencedjob';
import Internships from './components/Jobs/Internship';
import Contactform from './Contacts/Contactform';
import Profile from './components/Common/Profile';
import PrivacyPolicy from './components/Common/Privacy&Policy';
import TermsAndConditions from './components/Common/TermsCondition';



const App = () => {
  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path='/Contactform' element={<Contactform />} />
          <Route path="/Signup" element={<Signup />} />
          {/* <Route path="/Login" element={<LoginPage />} /> */}
          <Route path="/Forgetpassword" element={<Forgetpassword />} />
          <Route path='/Pagenotfound' element={<Pagenotfound />} />
          <Route path='/Job-Portal' element={<Technicalblog />} />
          <Route path='/techblog' element={<Techblog />} />
          <Route path='/Fresher-Jobs' element={<Fresherjobs />} />
          <Route path='/Experienced-Jobs' element={<Experiencedjobs />} />
          <Route path='/Internships' element={<Internships />} />
          <Route path='/jobdetail/:id' element={<BlogDetail />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsAndConditions />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;