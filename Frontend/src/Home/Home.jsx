import React from 'react';
import Navbar from '../components/Navbar';
import Banner from './Banner';
import Footer from '../components/Footer';
import Homepromo from './Homepromo';
import Homecontentcard from './Homecontentcard';
import HomeVideo from './HomeVideo';
import CheatsheetPage from './CheetsheetCard';
import HomeUpcomingContest from './HomeUpcomingContest';


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
