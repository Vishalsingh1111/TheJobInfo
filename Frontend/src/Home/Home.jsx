import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Homepromo from '../components/Homepromo';
import Homecontentcard from '../components/Homecontentcard';
import HomeVideo from '../components/HomeVideo';
import CheatsheetPage from '../components/CheetsheetCard';
import HomeUpcomingContest from '../components/HomeUpcomingContest';


function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <Homecontentcard />
            <HomeUpcomingContest />
            <HomeVideo />
            <CheatsheetPage />
            <Homepromo />
            <Footer />
        </>
    );
}

export default Home;
