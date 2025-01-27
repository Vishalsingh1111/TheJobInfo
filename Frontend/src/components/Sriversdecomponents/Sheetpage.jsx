import React, { useEffect, useState } from 'react';
import Sheetcard from './Sheetcard';
import axios from "axios";
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Skeleton';
import Searchbar from '../Searchbar';
import Breadcrumb from "../Breadcrumb";



function Sheetpage() {
    const [sheet, setSheet] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSheet = async () => {
            try {
                const res = await axios.get(`${baseUrl}/sheet`);
                const sortedData = res.data.sort((a, b) => a.id - b.id);
                setSheet(sortedData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getSheet();
    }, []);

    const handleNoteClick = (key) => {
        setCurrentNoteKey(key);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="dark:to-bg-slate-900 dark:from-slate-800 bg-gradient-to-l dark:bg-gradient-to-t to-[#F6F7FC] via-blue-100 from-[#F6F7FC] ">
                <Breadcrumb />
                <div className='flex flex-col sm:flex-row lg:flex-row justify-left text-2xl font-semibold dark:text-white text-gray-700 mb-5 pt-5 pb-5 pl-5 lg:pl-20 '>
                    <div className='flex flex-col space-y-2'>
                        <span className="bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">Sde Sheet Most Asked In Interview</span>
                        <span className='text-sm text-gray-700 dark:text-gray-300'><span className="text-red-500">Last Updated : </span> August 28, 2024</span>
                    </div>
                    <div className='lg:w-[680px] md:ml-32 mr-2'>
                        <Searchbar />
                    </div>
                </div>
            </div>

            <div className='max-w-screen-2xl container my-10 md:pl-20 px-2 mb-10 lg:mb-10 sm:mb-3 dark:bg-slate-900 dark:text-white'>
                <div className='flex justify-left space-between'>
                    <div className="w-full max-w-full md:w-[1060px] dark:bg-slate-900 dark:border-none rounded-lg">
                        {loading ? (
                            <Skeleton1 />
                        ) : (
                            <div className='space-y-3'>
                                {sheet.map((item) => (
                                    <Sheetcard key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='w-[250px] h-full pt-5 pl-10 hidden md:inline sticky top-[70px]'>
                        <a href='/Signup'><img src='./poster.png'></img></a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sheetpage;
