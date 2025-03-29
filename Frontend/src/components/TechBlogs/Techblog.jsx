import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Blogcard from './Blogscard';
import Breadcrumb from '../Breadcrumb';
import { baseUrl } from "../../Baseurl";
import Skeleton1 from "../Skeleton";

const Techblog = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/blog`);
                const filteredData = res.data.filter(item => item.category === "dsa");
                setData(filteredData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/detail/${id}`);
    };



    return (
        <>
            <div className="bg-gradient-to-l from-white via-red-50 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ">
                <Breadcrumb />
                {loading ? (
                    <Skeleton1 />
                ) : (
                    <div className="flex flex-wrap justify-center max-w-screen-2xl mx-auto md:px-20 px-4 py-5 pt-10">
                        {data.map(item => (
                            <Blogcard key={item.id} item={item} onClick={() => handleCardClick(item.id.toString())} />
                        ))}
                    </div>)}
            </div>
        </>
    );
};

export default Techblog;
