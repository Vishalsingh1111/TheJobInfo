import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { baseUrl } from '../../Baseurl';
import Skeleton1 from '../Skeleton';
import Breadcrumb from '../Breadcrumb';

function Content() {
    const [note, setNote] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNote = async () => {
            try {
                const res = await axios.get(`${baseUrl}/note`);
                setNote(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getNote();
    }, []);

    return (
        <>
            <div className=' min-h-screen bg-gradient-to-b from-white via-white to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 '>
                <Breadcrumb />
                <div className="max-w-[1200px] container mx-auto mb-10 px-4 md:px-20">
                    {loading ? (
                        <>
                            <Skeleton1 />
                        </>

                    ) : (
                        <>
                            <div className="my-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {note.map((item) => (
                                    <Card key={item.id} item={item} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Content;

