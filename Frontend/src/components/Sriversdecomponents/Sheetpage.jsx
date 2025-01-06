import React, { useEffect, useState } from 'react';
import Sheetcard from './Sheetcard';
import axios from "axios";
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Skeleton';
import Searchbar from '../Searchbar';


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


            <div className='flex flex-col sm:flex-row lg:flex-row justify-between  text-2xl font-semibold dark:bg-slate-900 dark:text-white text-gray-700 mb-5 pt-5 pb-5 pl-5 lg:pl-20 dark:from-slate-800 bg-gradient-to-l to-[#F6F7FC] via-green-100 from-green-200 '>
                <div className='flex flex-col space-y-4'>
                    <span className="bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">SDE SHEET MOST ASKED IN INTERVIEW</span>
                    <span className='text-sm text-gray-700 dark:text-gray-300 '><span className="text-red-500">Last Updated : </span> August 28, 2024</span>
                </div>
                <div className='lg:w-[580px] mr-2'>
                    <Searchbar />
                </div>
                <div className='mt-4 sm:mt-0 lg:mt-4 sm:mr-20 lg:mr-20'>
                    <a href="/AllDSA">
                        <button className='bg-green-500  text-lg font-300 text-white border dark:bg-slate-900 hover:bg-green-600 border-green-600 px-3 py-1.5 rounded-md'>Explore More</button>
                    </a>
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
