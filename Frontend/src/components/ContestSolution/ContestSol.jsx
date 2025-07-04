import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContestCard from './ContestCard';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from "../../Baseurl";
import Skeleton1 from "../Common/Skeleton";

const Contest = () => {
    const [data, setData] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getContest = async () => {
            try {
                const res = await axios.get(`${baseUrl}/contestsol`);
                const responseData = Array.isArray(res.data) ? res.data : [];
                setData(responseData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Ensure loading stops regardless of success or error
            }
        };
        getContest();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/contestdetail/${id}`);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 px-5">
                <Breadcrumb />
                {loading ? (
                    <Skeleton1 />
                ) : (
                    <div className="max-w-[1340px] container mx-auto my-10 px-0 md:px-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <ContestCard key={item.id} item={item} onClick={() => handleCardClick(item.id.toString())} />
                            ))
                        ) : (
                            <p>No contests found.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Contest;
