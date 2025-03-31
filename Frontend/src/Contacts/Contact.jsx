import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import FAQ from '../components/FAQ'
import ContactForm from './Contactform'

function Contact() {
    return (
        <>
            <Navbar />
            <FAQ />
            <ContactForm />
            <Footer />
        </>
    )
}

export default Contact