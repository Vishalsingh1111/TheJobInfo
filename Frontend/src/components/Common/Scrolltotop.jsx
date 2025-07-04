import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when at the bottom of the page
    useEffect(() => {
        const handleScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
            setIsVisible(bottom);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 shadow-lg shadow-black/30 right-6 bg-blue-500 text-white px-3.5 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            >
                ↑
            </button>
        )
    );
};

export default ScrollToTopButton;
