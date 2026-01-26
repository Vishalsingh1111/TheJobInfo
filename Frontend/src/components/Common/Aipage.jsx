// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import Navbar from '../Navbar';
// import { baseUrl } from '../../Baseurl';

// const formatResponse = (response) => {
//     let formattedResponse = response
//         .replace(/\*\*/g, '') // Remove bold markers
//         .replace(/^\*\s+/gm, '<ul><li>') // Start unordered list
//         .replace(/^\d+\.\s+/gm, '<ol><li>') // Start ordered list
//         .replace(/<\/li>\n<li>/g, '</li><li>') // Fix list item breaks
//         .replace(/<\/ol>\n<ol>/g, '') // Fix ordered list breaks
//         .replace(/<\/ul>\n<ul>/g, '') // Fix unordered list breaks
//         .replace(/<\/li>\n?$/g, '</li>') // Close last list item
//         .replace(/\n/g, '<br/>') // Replace new lines with <br/>
//         + '</ul>'; // Close any open lists

//     formattedResponse = formattedResponse
//         .replace(/<ul><\/ul>/g, '')
//         .replace(/<ol><\/ol>/g, '');

//     return formattedResponse;
// };

// const Chat = () => {
//     const [query, setQuery] = useState('');
//     const [response, setResponse] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [authUser, setAuthUser] = useState(null);
//     const responseRef = useRef(null); // Ref for the response container

//     useEffect(() => {
//         // Retrieve user data from localStorage
//         const userData = localStorage.getItem('Users');
//         if (userData) {
//             setAuthUser(JSON.parse(userData));
//         }
//     }, []);

//     useEffect(() => {
//         if (responseRef.current) {
//             responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
//         }
//     }, [response]);

//     const handleQuery = async (prompt) => {
//         setLoading(true);
//         try {
//             const res = await axios.post(`${baseUrl}/chat`, { prompt });
//             setResponse(formatResponse(res.data.text));
//             setQuery('');
//         } catch (error) {
//             console.error('Error sending query:', error);
//             setResponse('Failed to get a response from the server.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleQuery(query);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen py-20 dark:bg-none dark:text-white"> {/* Adjusted padding */}
//                 <div className='w-full sm:w-[100px] md:w-full mb-5'>
//                     <img src="/assistant.png" alt="AI Illustration" className="w-[100px] mx-auto" />
//                 </div>
//                 <div className="mb-10 max-w-4xl text-center mx-auto space-y-3 ">
//                     <h1 className="md:text-5xl text-xl font-semibold mb-2">
//                         Hello, <span className="text-red-500">{authUser?.firstName || 'Guest'}</span>
//                     </h1>
//                     <h2 className="md:text-5xl text-xl font-semibold text-gray-500 mb-20">
//                         How can I help you today?
//                     </h2>
//                 </div>
//                 {/* <div className=" w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols gap-4">
//                     <button
//                         className="p-4 border rounded-2xl border-gray-300 justify-start flex text-left dark:bg-slate-900 dark-text-white"
//                         onClick={() => handleQuery('Outline a weekly coding practice routine for mastering Data Structures and Algorithms (DSA)')}
//                     >
//                         Outline a weekly coding practice routine for mastering Data Structures and Algorithms (DSA)
//                     </button>
//                     <button
//                         className="p-4 border rounded-2xl border-gray-300 justify-start flex text-left dark:bg-slate-900 dark-text-white"
//                         onClick={() => handleQuery('Help me incorporate more real-world coding projects into my learning path')}
//                     >
//                         Help me incorporate more real-world coding projects into my learning path
//                     </button>
//                     <button
//                         className="p-4 border rounded-2xl border-gray-300 justify-start flex text-left dark:bg-slate-900 dark-text-white"
//                         onClick={() => handleQuery('Come up with a roadmap for building a portfolio project like a weather app or blog platform')}
//                     >
//                         Come up with a roadmap for building a portfolio project like a weather app or blog platform
//                     </button>
//                     <button
//                         className="p-4 border rounded-2xl border-gray-300 justify-start flex text-left dark:bg-slate-900 dark-text-white"
//                         onClick={() => handleQuery('Create a 12-week study plan for learning a new programming language like Python or JavaScript')}
//                     >
//                         Create a 12-week study plan for learning a new programming language like Python or JavaScript
//                     </button>
//                 </div> */}

//                 <div className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
//                     <button
//                         className="p-4 border rounded-2xl border-gray-300 justify-start flex text-left dark:bg-slate-900 dark:text-white"
//                         onClick={() => handleQuery('Weekly DSA practice plan')}
//                     >
//                         Weekly DSA practice plan
//                     </button>
//                     <button
//                         className="p-4 border rounded-2xl border-gray-300 justify-start flex text-left dark:bg-slate-900 dark:text-white"
//                         onClick={() => handleQuery('Add real-world coding projects to my learning')}
//                     >
//                         Real-world coding projects
//                     </button>
//                     <button
//                         className="p-4 border rounded-2xl border-gray-300 justify-start flex text-left dark:bg-slate-900 dark:text-white"
//                         onClick={() => handleQuery('Roadmap for a portfolio project')}
//                     >
//                         Portfolio project roadmap
//                     </button>
//                     <button
//                         className="p-4 border rounded-2xl border-gray-300 justify-start flex text-left dark:bg-slate-900 dark:text-white"
//                         onClick={() => handleQuery('12-week plan for learning a new language')}
//                     >
//                         12-week coding language plan
//                     </button>
//                 </div>


//                 <div className='w-full max-w-3xl mx-auto mb-12 text-justify justify-start md:mt-10 mt-12 rounded  dark-text-white rounded-xl'>
//                     {loading ? (
//                         <div className="text-center text-2xl text-red-500">
//                             Getting Your Response Ready ...
//                         </div>
//                     ) : (
//                         <div ref={responseRef} dangerouslySetInnerHTML={{ __html: response }} />

//                     )}

//                 </div>

//                 <div className="w-full max-w-3xl p-4 mx-auto bg-white shadow-md border-t rounded-full flex items-center dark:bg-slate-800 dark-text-white">
//                     <input
//                         type="text"
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                         placeholder="Ask with TechAI"
//                         className="w-full px-5 p-1 border-none outline-none dark:bg-slate-800 dark-text-white "
//                     />
//                     {query && (
//                         <button onClick={() => handleQuery(query)}>
//                             <img className='w-[40%] h-[40%] mx-5' src='/icons8-send-button-60.png' alt="Send" />
//                         </button>
//                     )}
//                 </div>

//             </div>

//         </>
//     );
// };

// export default Chat;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { baseUrl } from '../../Baseurl';
import { Sparkles, Send, Loader2, Copy, Check, Trash2, MessageSquare } from 'lucide-react';

const formatResponse = (response) => {
    let formattedResponse = response
        .replace(/\*\*/g, '') // Remove bold markers
        .replace(/^\*\s+/gm, '<ul><li>') // Start unordered list
        .replace(/^\d+\.\s+/gm, '<ol><li>') // Start ordered list
        .replace(/<\/li>\n<li>/g, '</li><li>') // Fix list item breaks
        .replace(/<\/ol>\n<ol>/g, '') // Fix ordered list breaks
        .replace(/<\/ul>\n<ul>/g, '') // Fix unordered list breaks
        .replace(/<\/li>\n?$/g, '</li>') // Close last list item
        .replace(/\n/g, '<br/>') // Replace new lines with <br/>
        + '</ul>'; // Close any open lists

    formattedResponse = formattedResponse
        .replace(/<ul><\/ul>/g, '')
        .replace(/<ol><\/ol>/g, '');

    return formattedResponse;
};

const Chat = () => {
    const [query, setQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [copied, setCopied] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const chatContainerRef = useRef(null);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = localStorage.getItem('Users');
        if (userData) {
            setAuthUser(JSON.parse(userData));
        }

        // Load chat history from localStorage
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            setChatHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [chatHistory]);

    // Save chat history to localStorage
    useEffect(() => {
        if (chatHistory.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }
    }, [chatHistory]);

    const handleQuery = async (prompt) => {
        if (!prompt.trim()) return;

        const userMessage = { type: 'user', text: prompt, timestamp: new Date().toISOString() };
        setChatHistory(prev => [...prev, userMessage]);
        setQuery('');
        setLoading(true);

        try {
            const res = await axios.post(`${baseUrl}/chat`, { prompt });
            const aiMessage = {
                type: 'ai',
                text: formatResponse(res.data.text),
                timestamp: new Date().toISOString()
            };
            setChatHistory(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending query:', error);
            const errorMessage = {
                type: 'ai',
                text: '❌ Failed to get a response from the server. Please try again.',
                timestamp: new Date().toISOString(),
                isError: true
            };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleQuery(query);
        }
    };

    const copyToClipboard = (text) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent || tempDiv.innerText;
        navigator.clipboard.writeText(plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearChat = () => {
        setChatHistory([]);
        localStorage.removeItem('chatHistory');
    };

    const suggestedPrompts = [
        { icon: '📚', text: 'Weekly DSA practice plan', prompt: 'Outline a weekly coding practice routine for mastering Data Structures and Algorithms (DSA)' },
        { icon: '🚀', text: 'Real-world coding projects', prompt: 'Help me incorporate more real-world coding projects into my learning path' },
        { icon: '🎯', text: 'Portfolio project roadmap', prompt: 'Come up with a roadmap for building a portfolio project like a weather app or blog platform' },
        { icon: '💡', text: '12-week coding language plan', prompt: 'Create a 12-week study plan for learning a new programming language like Python or JavaScript' }
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
                {/* ANIMATED BACKGROUND */}
                <div
                    className="fixed top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob pointer-events-none"
                    style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
                ></div>
                <div
                    className="fixed top-40 right-10 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"
                    style={{ transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)` }}
                ></div>
                <div className="fixed bottom-20 left-1/2 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal dark:opacity-10 filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

                {/* Floating Sparkles */}
                <div className="fixed inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${10 + Math.random() * 10}s`
                            }}
                        >
                            <Sparkles className="text-purple-400 dark:text-purple-500" size={8 + Math.random() * 12} style={{ opacity: 0.3 }} />
                        </div>
                    ))}
                </div>

                <div className="relative max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen py-20">
                    {/* HEADER SECTION */}
                    {chatHistory.length === 0 && (
                        <div className="animate-fade-in">
                            {/* AI Icon */}
                            <div className="flex justify-center mb-8">
                                <div className="relative">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full blur-xl opacity-50 animate-pulse-glow"></div>
                                    <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-gentle">
                                        <img src="/assistant.png" alt="AI" className="w-16 h-16" />
                                    </div>
                                </div>
                            </div>

                            {/* Welcome Message */}
                            <div className="text-center mb-12 space-y-4 max-w-4xl mx-auto">
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
                                    Hello, <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">{authUser?.firstName || 'Guest'}</span>
                                </h1>
                                <h2 className="text-2xl md:text-4xl font-semibold text-gray-500 dark:text-gray-400">
                                    How can I help you today?
                                </h2>
                            </div>

                            {/* SUGGESTED PROMPTS */}
                            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                {suggestedPrompts.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuery(item.prompt)}
                                        className="group relative p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-left hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                        <div className="relative flex items-start gap-3">
                                            <span className="text-3xl">{item.icon}</span>
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CHAT HISTORY */}
                    {chatHistory.length > 0 && (
                        <div className="w-full max-w-4xl mx-auto mb-32">
                            {/* Clear Chat Button */}
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={clearChat}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors font-semibold"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear Chat
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="space-y-6">
                                {chatHistory.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                    >
                                        {message.type === 'ai' && (
                                            <div className="flex-shrink-0 mr-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <Sparkles className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        )}

                                        <div className={`max-w-[80%] ${message.type === 'user' ? 'ml-auto' : ''}`}>
                                            <div className={`group relative p-4 rounded-2xl ${message.type === 'user'
                                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                                    : message.isError
                                                        ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
                                                        : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700'
                                                } shadow-lg`}>
                                                {message.type === 'user' ? (
                                                    <p className="text-white font-medium">{message.text}</p>
                                                ) : (
                                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                                        <div
                                                            className="text-gray-800 dark:text-gray-100"
                                                            dangerouslySetInnerHTML={{ __html: message.text }}
                                                        />
                                                    </div>
                                                )}

                                                {/* Copy Button for AI messages */}
                                                {message.type === 'ai' && !message.isError && (
                                                    <button
                                                        onClick={() => copyToClipboard(message.text)}
                                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                                        title="Copy to clipboard"
                                                    >
                                                        {copied ? (
                                                            <Check className="w-4 h-4 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Timestamp */}
                                            <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>

                                        {message.type === 'user' && (
                                            <div className="flex-shrink-0 ml-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg text-white font-bold">
                                                    {authUser?.firstName?.charAt(0).toUpperCase() || 'G'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={chatContainerRef} />
                            </div>
                        </div>
                    )}

                    {/* LOADING INDICATOR */}
                    {loading && (
                        <div className="w-full max-w-4xl mx-auto mb-8 flex items-center gap-3 animate-fade-in">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                            </div>
                            <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <Loader2 className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-spin" />
                                    <span className="text-gray-600 dark:text-gray-300 font-medium">Getting Your Response Ready...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INPUT BOX - FIXED AT BOTTOM */}
                    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent pb-6 pt-4">
                        <div className="max-w-4xl mx-auto px-4">
                            <div className="relative group">
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full blur-lg opacity-0 group-focus-within:opacity-30 transition-opacity"></div>

                                {/* Input Container */}
                                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 rounded-full flex items-center p-2 group-focus-within:border-purple-400 dark:group-focus-within:border-purple-600 transition-colors">
                                    <MessageSquare className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask with TechAI..."
                                        className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-500 font-medium"
                                        disabled={loading}
                                    />
                                    {query.trim() && (
                                        <button
                                            onClick={() => handleQuery(query)}
                                            disabled={loading}
                                            className="flex-shrink-0 ml-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Helper Text */}
                            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Press Enter to send • Shift + Enter for new line
                            </p>
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes blob {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        25% { transform: translate(20px, -50px) scale(1.1); }
                        50% { transform: translate(-20px, 20px) scale(0.9); }
                        75% { transform: translate(50px, 50px) scale(1.05); }
                    }

                    @keyframes float-particle {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
                        50% { transform: translate(20px, -30px) rotate(180deg); opacity: 0.7; }
                    }

                    @keyframes bounce-gentle {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }

                    @keyframes pulse-glow {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 0.8; }
                    }

                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @keyframes gradient-x {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }

                    .animate-blob { animation: blob 7s infinite; }
                    .animate-float-particle { animation: float-particle 15s ease-in-out infinite; }
                    .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
                    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                    .animate-fade-in { animation: fade-in 0.5s ease-out forwards; opacity: 0; }
                    .animate-gradient-x { animation: gradient-x 3s ease infinite; }

                    .animation-delay-2000 { animation-delay: 2s; }
                    .animation-delay-4000 { animation-delay: 4s; }

                    /* Custom scrollbar */
                    ::-webkit-scrollbar { width: 10px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { 
                        background: linear-gradient(to bottom, #a855f7, #ec4899); 
                        border-radius: 5px; 
                    }
                    ::-webkit-scrollbar-thumb:hover { 
                        background: linear-gradient(to bottom, #9333ea, #db2777); 
                    }

                    /* Prose styles for formatted content */
                    .prose ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
                    .prose ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
                    .prose li { margin: 0.25rem 0; }
                    .prose br { display: block; margin: 0.25rem 0; content: ""; }
                `}</style>
            </div>
        </>
    );
};

export default Chat;