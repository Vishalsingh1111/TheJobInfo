import React from 'react';
import Navbar from '../components/Navbar';
import Banner from './Banner';
import Footer from '../components/Footer';
import Homepromo from './Homepromo';
import Homecontentcard from './Homecontentcard';
import PostCard from './PostCard';
import CheatsheetPage from './CheetsheetCard';
import ReelCard from './ReelCard';


function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <Homecontentcard />
            <ReelCard />
            <PostCard />
            <CheatsheetPage />
            <Homepromo />
            <Footer />
        </>
    );
}

export default Home;
