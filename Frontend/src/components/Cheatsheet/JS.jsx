import { useState, useEffect } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Skeleton1 from '../Skeleton';

export default function PDFViewer() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pdfUrl = "/JSCheat.pdf";

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Navbar />

            <div className="bg-gray-50 pt-20 text-gray-800 dark:bg-slate-900">
                {/* PDF Content */}
                <div className="container mx-auto px-4 pb-12">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Skeleton1 />
                        </div>
                    ) : (
                        <div className="px-4">
                            <div className="bg-white  rounded-lg shadow-lg overflow-hidden w-[300px] md:w-[850px] h-[670px] mx-auto">
                                <iframe
                                    src={`${pdfUrl}#page=${currentPage}`}
                                    className="w-[300px] md:w-[850px] h-[670px]"
                                    title="JavaScript Cheatsheet"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}


