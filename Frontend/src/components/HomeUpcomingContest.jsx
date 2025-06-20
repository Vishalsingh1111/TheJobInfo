import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Baseurl';
import Contestcard from './ContestSolution/ContestCard';

const HomeUpcomingContest = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await axios.get(`${baseUrl}/contestsol`);

                // ✅ Sort by createdAt descending (latest first)
                const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setContests(sorted);

            } catch (error) {
                console.error('Failed to fetch contests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

    return (
        <section className="px-4 py-8 bg-white dark:bg-slate-900 mb-20 mx-4 md:mx-32">
            <div className="pb-5 text-center">
                <h1 className="titillium-web-semibold text-gray-600 text-3xl md:text-4xl pb-2 dark:text-white" id='homecontentcard'>
                    Upcoming <span className='text-red-500'>Contests</span>
                </h1>
            </div>

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-300">Loading contests...</p>
            ) : contests.length === 0 ? (
                <p className="text-center text-red-500">No contests available</p>
            ) : (
                <div className="overflow-x-auto scrollbar-hide py-5">
                    <div className="flex space-x-4 w-max">
                        {contests.map((contest) => (
                            <Contestcard
                                key={contest.id || contest._id}
                                item={contest}
                                onClick={() => navigate(`/contestdetail/${contest.id || contest._id}`)}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className="mx-auto text-center">
                <a href='/Contest-Solution'>
                    <button className="border border-red-500 py-2 rounded-md text-white mb-10 px-4 mt-6 group bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30">
                        Explore Contests
                    </button>
                </a>
            </div>
        </section>
    );
};

export default HomeUpcomingContest;
