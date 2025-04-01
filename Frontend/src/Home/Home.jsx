import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Homepromo from '../components/Homepromo';
import Homecontentcard from '../components/Homecontentcard';
import HomeVideo from '../components/HomeVideo';
import CheatsheetPage from '../components/CheetsheetCard';


function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <Homecontentcard />
            <HomeVideo />
            <CheatsheetPage />
            <Homepromo />
            <Footer />
        </>
    );
}

export default Home;
