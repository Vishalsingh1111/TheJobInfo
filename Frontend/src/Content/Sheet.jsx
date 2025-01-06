import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sheetpage from '../components/Sriversdecomponents/Sheetpage';
import Breadcrumb from '../components/Breadcrumb';

function Sheet() {
    const [view, setView] = useState('Sheetpage');

    const handleButtonClick = (viewName) => {
        setView(viewName);
    };

    return (
        <>
            <Navbar />
            <Sheetpage />
            <Footer />
        </>
    );
}

export default Sheet;
