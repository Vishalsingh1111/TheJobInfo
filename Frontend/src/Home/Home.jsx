import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobHomeCard from './JobHomeCards';



function Home() {
    return (
        <>
            <Navbar />
            <JobHomeCard />
            <Footer />
        </>
    );
}

export default Home;
