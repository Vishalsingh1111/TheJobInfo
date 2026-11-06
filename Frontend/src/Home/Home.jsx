import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobHomeCard from './JobHomeCards';
import { useSeo } from '../hooks/useSeo';
import { siteConfig } from '../siteConfig';
import { jobListFaqs } from '../Content/faqs';

function Home() {
    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            founder: siteConfig.founder,
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: jobListFaqs.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
            })),
        },
    ];
    useSeo({ title: "Jobs and career guides", description: "Explore fresher jobs, experienced roles, internships, and practical career guides.", jsonLd: schema });
    return (
        <>
            <Navbar />
            <JobHomeCard />
            <Footer />
        </>
    );
}

export default Home;
