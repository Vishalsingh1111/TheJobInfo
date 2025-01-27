import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import Homecontentcard from '../components/Homecontentcard';
import Homepromo from '../components/Homepromo';
import HomeVideo from '../components/HomeVideo';


function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <Homecontentcard />
            <HomeVideo />
            <FAQ />
            <Homepromo />
            <Footer />
        </>
    );
}

export default Home;
