import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Blogcard from './Blogscard';
import Breadcrumb from '../Common/Breadcrumb';
import { baseUrl } from "../../Baseurl";
import Skeleton1 from "../Common/Skeleton";

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
            <div className="bg-gradient-to-b p-4 from-white via-white to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 ">
                <Breadcrumb />
                {loading ? (
                    <Skeleton1 />
                ) : (
                    <div className="max-w-[1300px] container mx-auto my-10 px-0 md:px-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map(item => (
                            <Blogcard key={item.id} item={item} onClick={() => handleCardClick(item.id.toString())} />
                        ))}
                    </div>)}
            </div>
        </>
    );
};

export default Techblog;
