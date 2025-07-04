import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../Baseurl';

const ResultDetailPage = () => {
    const { id } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axios.get(`${baseUrl}/search/results/${id}`);
                setResult(response.data);
            } catch (error) {
                console.error('Error fetching result details:', error);
            }
        };

        fetchResult();
    }, [id]);

    if (!result) return <div>Loading...</div>;

    return (
        <div>
            <h1>{result.header}</h1>
            <p>{result.text}</p>
            {/* Additional content related to the result */}
        </div>
    );
};

export default ResultDetailPage;
