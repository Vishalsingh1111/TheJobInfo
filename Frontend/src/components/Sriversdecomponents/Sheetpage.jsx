import React, { useEffect, useState } from 'react';
import Sheetcard from './Sheetcard';
import axios from "axios";
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Skeleton';
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
            <div className="dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-900 bg-gradient-to-b to-blue-100 from-[#fff]">

                <Breadcrumb />
                <div className='text-center justify-center mx-auto font-semibold dark:text-white text-gray-700 pb-5 mb-0 '>
                    <div className='flex flex-col'>
                        <span className="bg-gradient-to-r px-3 text-3xl pb-3 from-red-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">Sde Sheet Most Asked In Interview</span>
                        <span className=" text-lg pb-2 text-gray-600 ">"A comprehensive SDE sheet featuring the most frequently asked interview questions to help you prepare effectively."</span>
                    </div>
                </div>
            </div>

            <div className='max-w-screen-2xl container my-10 md:px-[130px] px-2 mb-10 lg:mb-10 sm:mb-3 dark:bg-slate-900 dark:text-white'>
                <div className='flex justify-center'>
                    <div className="w-full dark:bg-slate-900 dark:border-none rounded-lg">
                        {loading ? (
                            <Skeleton1 />
                        ) : (
                            <div className='space-y-5'>
                                {sheet.map((item) => (
                                    <Sheetcard key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sheetpage;
