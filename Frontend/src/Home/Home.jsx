import React from 'react';
import Navbar from '../components/Navbar';
import Banner from './Banner';
import Footer from '../components/Footer';
import Homepromo from './Homepromo';
import ReelCard from './ReelCard';


function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            {/* <Homecontentcard /> */}
            <ReelCard />
            <Homepromo />
            <Footer />
        </>
    );
}

export default Home;
