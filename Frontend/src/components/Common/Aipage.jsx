

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { baseUrl } from '../../Baseurl';
import {
    Sparkles, Send, Loader2, Copy, Check, Trash2, MessageSquare,
    Download, RefreshCw, Mic, MicOff, Volume2, VolumeX, Paperclip,
    Settings, Moon, Sun, ChevronDown, BookOpen, Code, Lightbulb,
    Zap, Star, ThumbsUp, ThumbsDown, Share2, Search, Filter,
    X, Plus, ArrowUp
} from 'lucide-react';

const formatResponse = (response) => {
    let formattedResponse = response
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic text
        .replace(/`(.+?)`/g, '<code class="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded text-sm">$1</code>') // Inline code
        .replace(/```(.+?)```/gs, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl overflow-x-auto my-4"><code>$1</code></pre>') // Code blocks
        .replace(/^\*\s+/gm, '<ul><li>') // Unordered list
        .replace(/^\d+\.\s+/gm, '<ol><li>') // Ordered list
        .replace(/<\/li>\n<li>/g, '</li><li>')
        .replace(/<\/ol>\n<ol>/g, '')
        .replace(/<\/ul>\n<ul>/g, '')
        .replace(/<\/li>\n?$/g, '</li>')
        .replace(/\n/g, '<br/>')
        + '</ul>';

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
    const [copied, setCopied] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [chatSessions, setChatSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [typing, setTyping] = useState(false);
    const chatContainerRef = useRef(null);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Mouse parallax
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

    // Load user and chat history
    useEffect(() => {
        const userData = localStorage.getItem('Users');
        if (userData) {
            setAuthUser(JSON.parse(userData));
        }

        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            setChatHistory(JSON.parse(savedHistory));
        }

        const sessions = localStorage.getItem('chatSessions');
        if (sessions) {
            setChatSessions(JSON.parse(sessions));
        } else {
            const newSession = { id: Date.now(), name: 'New Chat', messages: [], timestamp: new Date().toISOString() };
            setChatSessions([newSession]);
            setCurrentSessionId(newSession.id);
        }
    }, []);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, loading]);

    // Save chat history
    useEffect(() => {
        if (chatHistory.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }
    }, [chatHistory]);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (chatContainerRef.current) {
                setShowScrollTop(chatContainerRef.current.scrollTop > 300);
            }
        };

        const container = chatContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleQuery = async (prompt) => {
        if (!prompt.trim()) return;

        const userMessage = {
            type: 'user',
            text: prompt,
            timestamp: new Date().toISOString(),
            liked: null
        };
        setChatHistory(prev => [...prev, userMessage]);
        setQuery('');
        setLoading(true);
        setTyping(true);

        try {
            const res = await axios.post(`${baseUrl}/chat`, { prompt });

            // Simulate typing effect
            setTimeout(() => {
                const aiMessage = {
                    type: 'ai',
                    text: formatResponse(res.data.text),
                    timestamp: new Date().toISOString(),
                    liked: null
                };
                setChatHistory(prev => [...prev, aiMessage]);
                setTyping(false);
            }, 500);
        } catch (error) {
            console.error('Error sending query:', error);
            const errorMessage = {
                type: 'ai',
                text: '❌ Failed to get a response from the server. Please try again.',
                timestamp: new Date().toISOString(),
                isError: true
            };
            setChatHistory(prev => [...prev, errorMessage]);
            setTyping(false);
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

    const copyToClipboard = (text, index) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent || tempDiv.innerText;
        navigator.clipboard.writeText(plainText);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadChat = () => {
        const chatContent = chatHistory.map(msg =>
            `[${msg.type.toUpperCase()}] ${new Date(msg.timestamp).toLocaleString()}\n${msg.text}\n\n`
        ).join('');

        const blob = new Blob([chatContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const clearChat = () => {
        if (window.confirm('Are you sure you want to clear this chat?')) {
            setChatHistory([]);
            localStorage.removeItem('chatHistory');
        }
    };

    const regenerateResponse = (index) => {
        if (index > 0 && chatHistory[index - 1].type === 'user') {
            const userPrompt = chatHistory[index - 1].text;
            setChatHistory(prev => prev.slice(0, index));
            handleQuery(userPrompt);
        }
    };

    const likeMessage = (index, isLike) => {
        setChatHistory(prev => prev.map((msg, i) =>
            i === index ? { ...msg, liked: msg.liked === isLike ? null : isLike } : msg
        ));
    };

    const shareMessage = async (text) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent || tempDiv.innerText;

        if (navigator.share) {
            try {
                await navigator.share({ text: plainText });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            copyToClipboard(text, -1);
        }
    };

    // Voice Recognition
    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onstart = () => setIsListening(true);
            recognitionRef.current.onend = () => setIsListening(false);
            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setQuery(transcript);
            };

            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    // Text to Speech
    const speakText = (text) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent || tempDiv.innerText;

        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                const utterance = new SpeechSynthesisUtterance(plainText);
                utterance.onend = () => setIsSpeaking(false);
                window.speechSynthesis.speak(utterance);
                setIsSpeaking(true);
            }
        }
    };

    const scrollToTop = () => {
        chatContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const categories = [
        { id: 'all', name: 'All', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'code', name: 'Coding', icon: <Code className="w-4 h-4" /> },
        { id: 'learn', name: 'Learning', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'idea', name: 'Ideas', icon: <Lightbulb className="w-4 h-4" /> }
    ];

    const suggestedPrompts = [
        { icon: '📚', text: 'Weekly DSA practice plan', prompt: 'Outline a weekly coding practice routine for mastering Data Structures and Algorithms (DSA)', category: 'code' },
        { icon: '🚀', text: 'Real-world coding projects', prompt: 'Help me incorporate more real-world coding projects into my learning path', category: 'learn' },
        { icon: '🎯', text: 'Portfolio project roadmap', prompt: 'Come up with a roadmap for building a portfolio project like a weather app or blog platform', category: 'idea' },
        { icon: '💡', text: '12-week coding language plan', prompt: 'Create a 12-week study plan for learning a new programming language like Python or JavaScript', category: 'learn' },
        { icon: '🔥', text: 'System design basics', prompt: 'Explain system design fundamentals for interview preparation', category: 'code' },
        { icon: '⚡', text: 'API development guide', prompt: 'Guide me through building a RESTful API from scratch', category: 'code' },
        { icon: '🎨', text: 'UI/UX best practices', prompt: 'What are the essential UI/UX principles for web development?', category: 'learn' },
        { icon: '🌟', text: 'Career advice', prompt: 'What skills should I focus on to advance my tech career?', category: 'idea' }
    ];

    const filteredPrompts = selectedCategory === 'all'
        ? suggestedPrompts
        : suggestedPrompts.filter(p => p.category === selectedCategory);

    const filteredHistory = searchQuery
        ? chatHistory.filter(msg =>
            msg.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : chatHistory;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">


                <div className="relative max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen py-20">
                    {/* TOP ACTION BAR */}
                    {chatHistory.length > 0 && (
                        <div className="fixed top-20 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b-2 border-gray-200 dark:border-gray-700 z-40 shadow-lg">
                            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">TechAI Assistant</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{chatHistory.length} messages</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowSearch(!showSearch)}
                                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        title="Search"
                                    >
                                        <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </button>
                                    <button
                                        onClick={downloadChat}
                                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        title="Download Chat"
                                    >
                                        <Download className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </button>
                                    <button
                                        onClick={clearChat}
                                        className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                        title="Clear Chat"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Search Bar */}
                            {showSearch && (
                                <div className="max-w-7xl mx-auto px-4 pb-3 animate-fade-in">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search in conversation..."
                                            className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-400 dark:focus:border-purple-600 outline-none text-gray-800 dark:text-gray-100"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                            >
                                                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* HEADER SECTION */}
                    {chatHistory.length === 0 && (
                        <div className="animate-fade-in">
                            {/* AI Icon */}
                            <div className="flex justify-center mb-8">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full blur-2xl opacity-50 animate-pulse-glow"></div>
                                    <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-gentle ring-4 ring-white/50 dark:ring-gray-800/50">
                                        <img src="/assistant.png" alt="AI" className="w-20 h-20" />
                                    </div>
                                    {/* Floating badges */}
                                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                                        <Star className="w-6 h-6 text-white" fill="currentColor" />
                                    </div>
                                    <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                                        <Zap className="w-5 h-5 text-white" />
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
                                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                                    🚀 Your AI-powered coding assistant for learning, building, and growing
                                </p>
                            </div>

                            {/* CATEGORY FILTERS */}
                            <div className="flex gap-3 justify-center mb-8 flex-wrap">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${selectedCategory === cat.id
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600'
                                            }`}
                                    >
                                        {cat.icon}
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* SUGGESTED PROMPTS */}
                            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                                {filteredPrompts.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuery(item.prompt)}
                                        className="group relative p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-left hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
                                        <div className="relative">
                                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {item.text}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CHAT HISTORY */}
                    {chatHistory.length > 0 && (
                        <div
                            ref={chatContainerRef}
                            className="w-full max-w-5xl mx-auto mb-32 mt-32 max-h-[calc(100vh-300px)] overflow-y-auto px-4"
                        >
                            <div className="space-y-6">
                                {filteredHistory.map((message, index) => (
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
                                            <div className={`group relative p-5 rounded-2xl ${message.type === 'user'
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                                                : message.isError
                                                    ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
                                                    : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 shadow-xl'
                                                }`}>
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

                                                {/* AI Message Actions */}
                                                {message.type === 'ai' && !message.isError && (
                                                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                        <button
                                                            onClick={() => copyToClipboard(message.text, index)}
                                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            title="Copy"
                                                        >
                                                            {copied === index ? (
                                                                <Check className="w-4 h-4 text-green-600" />
                                                            ) : (
                                                                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => regenerateResponse(index)}
                                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            title="Regenerate"
                                                        >
                                                            <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                                        </button>
                                                        <button
                                                            onClick={() => speakText(message.text)}
                                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            title="Read Aloud"
                                                        >
                                                            {isSpeaking ? (
                                                                <VolumeX className="w-4 h-4 text-purple-600" />
                                                            ) : (
                                                                <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => shareMessage(message.text)}
                                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            title="Share"
                                                        >
                                                            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                                        </button>
                                                        <div className="flex-1"></div>
                                                        <button
                                                            onClick={() => likeMessage(index, true)}
                                                            className={`p-2 rounded-lg transition-colors ${message.liked === true
                                                                ? 'bg-green-100 dark:bg-green-900/30'
                                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                                }`}
                                                            title="Like"
                                                        >
                                                            <ThumbsUp className={`w-4 h-4 ${message.liked === true ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'}`} />
                                                        </button>
                                                        <button
                                                            onClick={() => likeMessage(index, false)}
                                                            className={`p-2 rounded-lg transition-colors ${message.liked === false
                                                                ? 'bg-red-100 dark:bg-red-900/30'
                                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                                }`}
                                                            title="Dislike"
                                                        >
                                                            <ThumbsDown className={`w-4 h-4 ${message.liked === false ? 'text-red-600' : 'text-gray-600 dark:text-gray-300'}`} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Timestamp */}
                                            <p className={`text-xs text-gray-500 dark:text-gray-400 mt-2 ${message.type === 'user' ? 'text-right' : ''}`}>
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

                                {/* Typing Indicator */}
                                {typing && (
                                    <div className="flex items-center gap-3 animate-fade-in">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                            <Sparkles className="w-5 h-5 text-white animate-pulse" />
                                        </div>
                                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-xl">
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce animation-delay-200"></div>
                                                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce animation-delay-400"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                    )}

                    {/* SCROLL TO TOP BUTTON */}
                    {showScrollTop && (
                        <button
                            onClick={scrollToTop}
                            className="fixed right-8 bottom-32 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 z-50 animate-bounce-gentle"
                        >
                            <ArrowUp className="w-6 h-6" />
                        </button>
                    )}

                    {/* INPUT BOX - FIXED AT BOTTOM */}
                    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent dark:from-gray-900 dark:via-gray-900/95 dark:to-transparent pb-6 pt-4 z-40">
                        <div className="max-w-5xl mx-auto px-4">
                            <div className="relative group">
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full blur-lg opacity-0 group-focus-within:opacity-40 transition-opacity"></div>

                                {/* Input Container */}
                                <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 rounded-3xl flex items-end gap-2 p-3 group-focus-within:border-purple-400 dark:group-focus-within:border-purple-600 transition-colors">
                                    <MessageSquare className="w-6 h-6 text-gray-400 mb-3 flex-shrink-0" />

                                    <textarea
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask with TechAI... (Enter to send, Shift+Enter for new line)"
                                        className="flex-1 px-2 py-3 bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-500 font-medium resize-none max-h-32 min-h-[24px]"
                                        disabled={loading}
                                        rows="1"
                                        style={{
                                            height: 'auto',
                                            minHeight: '24px'
                                        }}
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
                                        }}
                                    />

                                    <div className="flex items-center gap-2 mb-1">
                                        {/* Voice Input */}
                                        <button
                                            onClick={isListening ? stopListening : startListening}
                                            className={`p-3 rounded-full transition-all ${isListening
                                                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                                                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                                                }`}
                                            title={isListening ? 'Stop Recording' : 'Voice Input'}
                                        >
                                            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                        </button>

                                        {/* Send Button */}
                                        {query.trim() && (
                                            <button
                                                onClick={() => handleQuery(query)}
                                                disabled={loading}
                                                className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                                            >
                                                <Send className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Helper Text */}
                            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                                💡 Powered by advanced AI • Press Enter to send • Voice input available
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

                    .animation-delay-200 { animation-delay: 0.2s; }
                    .animation-delay-400 { animation-delay: 0.4s; }
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

                    /* Prose styles */
                    .prose ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
                    .prose ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
                    .prose li { margin: 0.25rem 0; line-height: 1.6; }
                    .prose strong { font-weight: 700; color: inherit; }
                    .prose em { font-style: italic; }
                    .prose code { 
                        background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
                        padding: 0.2rem 0.4rem;
                        border-radius: 0.25rem;
                        font-size: 0.875rem;
                        font-family: 'Courier New', monospace;
                    }
                    .prose pre { 
                        background: rgba(0, 0, 0, 0.05);
                        padding: 1rem;
                        border-radius: 0.75rem;
                        overflow-x: auto;
                        margin: 1rem 0;
                    }
                    .dark .prose pre {
                        background: rgba(255, 255, 255, 0.05);
                    }
                `}</style>
            </div>
        </>
    );
};

export default Chat;