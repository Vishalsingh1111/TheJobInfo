import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Homepromo from '../components/Homepromo';
// import FAQ from '../components/FAQ';
import Homecontentcard from '../components/Homecontentcard';
import HomeVideo from '../components/HomeVideo';


function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <Homecontentcard />
            <HomeVideo />
            {/* <FAQ /> */}
            <Homepromo />
            <Footer />
        </>
    );
}

export default Home;
