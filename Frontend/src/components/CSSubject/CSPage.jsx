import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer'
import CSContentFetch from '../CSSubject/CSContentFetch';

function CSPage() {
    return (
        <>
            <Navbar />
            <CSContentFetch />
            <Footer />
        </>
    )
}

export default CSPage