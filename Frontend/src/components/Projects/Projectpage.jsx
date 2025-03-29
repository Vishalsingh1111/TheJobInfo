import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Projectcard from './Projectcard';
import Breadcrumb from '../Breadcrumb';
import { baseUrl } from "../../Baseurl";
import Skeleton1 from "../Skeleton";

const Projectpage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await axios.get(`${baseUrl}/project`);
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
        navigate(`/projectdetail/${id}`);
    };

    return (
        <>
            <div className="bg-gradient-to-l from-white via-red-50 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ">
                <Breadcrumb />
                {loading ? (
                    <Skeleton1 />
                ) : (

                    <div className="py-10 mx-auto max-w-[1250px]  grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-[120px]">
                        {data.map(item => (
                            <Projectcard key={item.id} item={item} onClick={() => handleCardClick(item.id)} />
                        ))}
                    </div>

                )}
            </div>
        </>
    );
};

export default Projectpage;
