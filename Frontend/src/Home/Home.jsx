import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobHomeCard from './JobHomeCards';
// import HeroBlog from './HeroBlog';


function Home() {
    return (
        <>
            <Navbar />
            {/* <HeroBlog /> */}
            <JobHomeCard />
            <Footer />
        </>
    );
}

export default Home;
