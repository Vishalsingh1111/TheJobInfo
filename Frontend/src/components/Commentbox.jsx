import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../Baseurl';

function Commentbox() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');
    const [visibleComments, setVisibleComments] = useState(0);
    const [showMore, setShowMore] = useState(true);

    // Fetch comments from the API
    const fetchComments = async () => {
        try {
            const response = await axios.get(`${baseUrl}/comment`);
            setComments(response.data.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Post a new comment to the API
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() && name.trim()) {
            try {
                const commentData = { name, comment: newComment };
                await axios.post(`${baseUrl}/comment`, commentData);
                setNewComment('');
                setName('');
                fetchComments(); // Refresh comments after posting
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    // Handle input change
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // Fetch comments on component mount
    useEffect(() => {
        fetchComments();
    }, []);

    // Toggle between showing more and fewer comments
    const toggleShowMore = () => {
        setShowMore(!showMore);
        setVisibleComments(showMore ? comments.length : 0);
    };

    return (
        <>
            <div className='flex flex-col w-full mx-auto items-center pb-20 '>
                <div className="bg-[#ffffff] w-full md:w-9/12 lg:w-9/12 md:py-10 py-5 px-10 md:px-32 my-10 dark:bg-slate-800 border rounded-md dark:border border-gray-300">
                    <form onSubmit={handleCommentSubmit}>
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-5 mt-10 text-2xl">Write Comment</label>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="name"
                                className="w-full p-2 border rounded bg-transparent border border-gray-300 dark:bg-slate-900 dark:text-white"
                                placeholder="Enter your name here"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                id="comment"
                                className="w-full p-2 border rounded bg-transparent border border-gray-300 dark:bg-slate-900 dark:text-white"
                                rows="4"
                                placeholder="Enter your comment here"
                                value={newComment}
                                onChange={handleCommentChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-gray-500 shadow-lg hover:shadow-gray-500/30 shadow-black/30 py-2 px-4 rounded-lg text-white py-2 px-4 mb-8 rounded-md">Comment</button>
                    </form>
                </div>

                <div className="w-full md:w-7/12 lg:w-7/12 px-10 rounded-xl my-3 dark:bg-none">
                    {comments.slice(0, visibleComments).map((comment) => (
                        <div key={comment._id} className="flex items-start space-x-4 mb-9">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
                                {comment.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="flex flex-col items-start space-y-1 ">
                                <p className="font-semibold dark:text-white dark:bg-transparent bg-gray-300 px-2 rounded">{comment.name}</p>
                                <p className="text-gray-500 text-sm">{new Date(comment.time).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                                <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full md:w-7/12 lg:w-7/12 px-10 text-center">
                    <button
                        onClick={toggleShowMore}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:shadow-gray-500/30 shadow-black/30 py-2 px-4 rounded-lg0"
                    >
                        {showMore ? 'Show Comment' : 'Hide'}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Commentbox;
