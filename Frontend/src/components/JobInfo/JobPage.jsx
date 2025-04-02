import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JobCard from "./JobCard";
import Breadcrumb from '../Breadcrumb';
import { baseUrl } from "../../Baseurl";
import Skeleton1 from "../Skeleton";
import Navbar from "../Navbar";
import Footer from "../Footer";

const JobPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await axios.get(`${baseUrl}/jobinfo`);
                // const filteredData = res.data.filter(item => item.category === "Frontend");
                setData(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/jobdetail/${id}`);
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-b from-white via-white to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 ">
                <Breadcrumb />
                {loading ? (
                    <Skeleton1 />
                ) : (
                    <div className="my-20 mx-auto max-w-full lg:max-w-screen-xl  grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-[120px]">
                        {data.map(item => (
                            <JobCard key={item.id} item={item} onClick={() => handleCardClick(item.id)} />
                        ))}
                    </div>

                )}
                <Footer />
            </div>
        </>
    );
};

export default JobPage;
