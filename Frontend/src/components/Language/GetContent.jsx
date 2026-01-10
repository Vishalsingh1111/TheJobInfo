

import React, { useState, useEffect } from "react";
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import { Volume2, VolumeX, Code2, Eye, EyeOff, BookOpen, Lightbulb, Image as ImageIcon, Copy, Check } from 'lucide-react';

const GetContent = ({ item }) => {
    const [isCodeVisible, setIsCodeVisible] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [synth] = useState(window.speechSynthesis);
    const [utterance, setUtterance] = useState(null);
    const [copied, setCopied] = useState(false);

    const toggleCodeVisibility = () => {
        setIsCodeVisible(!isCodeVisible);
    };

    useEffect(() => {
        const stopSpeech = () => {
            if (synth.speaking) {
                synth.cancel();
                setIsSpeaking(false);
            }
        };

        return () => {
            stopSpeech();
        };
    }, [synth]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (synth.speaking) {
                synth.cancel();
                setIsSpeaking(false);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [synth]);

    const speakContent = () => {
        if (isSpeaking) {
            synth.cancel();
            setIsSpeaking(false);
            return;
        }

        let textToSpeak = '';
        const visibleTextElements = [
            'header', 'text', 'statement', 'substatement1', 'statement2', 'substatement2',
            'statement3', 'substatement3', 'statement4', 'substatement4', 'statement5', 'substatement5'
        ];
        visibleTextElements.forEach((key) => {
            if (item[key]) {
                const plainText = item[key].replace(/<\/?[^>]+(>|$)/g, "");
                textToSpeak += plainText + " ";
            }
        });
        if (item.example) {
            textToSpeak += "Example: " + item.example.replace(/<\/?[^>]+(>|$)/g, "") + " ";
        }

        if (item.explanation) {
            textToSpeak += "Explanation: " + item.explanation.replace(/<\/?[^>]+(>|$)/g, "") + " ";
        }

        const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
        newUtterance.rate = 1.2;

        const availableVoices = synth.getVoices();
        const indianVoice = availableVoices.find(voice => voice.lang.includes("en-IN"));
        if (indianVoice) {
            newUtterance.voice = indianVoice;
        }

        newUtterance.onstart = () => setIsSpeaking(true);
        newUtterance.onend = () => setIsSpeaking(false);

        synth.cancel();
        synth.speak(newUtterance);
        setUtterance(newUtterance);
    };

    const copyToClipboard = () => {
        if (item.code) {
            navigator.clipboard.writeText(item.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const renderText = (text) => {
        const parts = text
            .split(/(<h1>|<\/h1>|<h2>|<\/h2>|<br\s*\/?>|<bg>|<\/bg>|<li>|<\/li>|<b>|<\/b>|<m>|<\/m>)/g)
            .filter(Boolean);

        let isH1 = false;
        let isH2 = false;
        let isBg = false;
        let isLi = false;
        let isBold = false;
        let isM = false;
        let bgContent = [];
        let liContent = [];

        return parts.map((part, index) => {
            if (part === '<h1>') {
                isH1 = true;
                return null;
            } else if (part === '</h1>') {
                isH1 = false;
                return null;
            } else if (part === '<h2>') {
                isH2 = true;
                return null;
            } else if (part === '</h2>') {
                isH2 = false;
                return null;
            } else if (part === '<bg>') {
                isBg = true;
                bgContent = [];
                return null;
            } else if (part === '</bg>') {
                isBg = false;
                return (
                    <span key={index} className="inline-block text-blue-600 dark:text-cyan-400 font-medium bg-blue-50 dark:bg-gray-950/50 px-2 py-0.5 rounded">
                        {bgContent}
                    </span>
                );
            } else if (part === '<li>') {
                isLi = true;
                liContent = [];
                return null;
            } else if (part === '</li>') {
                isLi = false;
                return <li key={index} className="list-disc ml-6 py-1.5 text-gray-700 dark:text-gray-300">{liContent}</li>;
            } else if (part === '<b>') {
                isBold = true;
                return null;
            } else if (part === '</b>') {
                isBold = false;
                return null;
            } else if (part === '<m>') {
                isM = true;
                return null;
            } else if (part === '</m>') {
                isM = false;
                return null;
            } else if (part.match(/<br\s*\/?>/)) {
                return <br key={index} />;
            } else {
                const content = (
                    <span key={index} className={`${isH1 ? "text-gray-800 dark:text-white text-2xl font-bold" : isH2 ? "text-gray-700 dark:text-white text-xl font-semibold" : ""} ${isBold ? "font-semibold dark:text-white text-gray-900 mr-1" : ""} ${isM ? "mt-8" : ""}`}>
                        {part.trim()}
                    </span>
                );
                if (isBg) {
                    bgContent.push(content);
                    return null;
                }
                if (isLi) {
                    liContent.push(content);
                    return null;
                }
                return content;
            }
        }).filter(Boolean);
    };

    return (
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:to-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 my-6 transition-all duration-300 hover:shadow-xl">
            {/* Header Section with Speak Button */}
            <div className="flex justify-between items-start gap-4 mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-bold text-xl md:text-2xl text-gray-800 dark:text-white leading-relaxed">
                        {renderText(item.header)}
                    </div>
                </div>
                <button
                    onClick={speakContent}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 shadow-lg ${isSpeaking
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-500 animate-pulse'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-blue-500 hover:shadow-blue-500/50'
                        }`}
                    title={isSpeaking ? "Stop Reading" : "Read Aloud"}
                >
                    {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
            </div>

            {/* Content Section */}
            <div className="text-base md:text-lg leading-relaxed text-justify text-gray-700 dark:text-gray-300 space-y-4">
                {['text', 'statement', 'substatement1', 'statement2', 'substatement2', 'statement3', 'substatement3', 'statement4', 'substatement4'].map((key, index) => (
                    item[key] && (
                        <p key={index} className="py-2">
                            {renderText(item[key])}
                        </p>
                    )
                ))}
            </div>

            {/* Image Section */}
            {item.image && (
                <div className="my-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-gray-950/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <ImageIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Visual Representation</span>
                    </div>
                    <div className="text-center">
                        <img
                            src={item.image}
                            alt="description of image"
                            className="mx-auto rounded-lg shadow-lg max-w-full h-auto border border-gray-200 dark:border-gray-600"
                        />
                        <div className="mt-4 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 inline-block px-4 py-2 rounded-lg">
                            Fig. {item.figtitle}
                        </div>
                    </div>
                </div>
            )}

            {/* Example Section */}
            {item.example && (
                <div className="my-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-xl border-l-4 border-green-500 dark:border-green-400">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg text-gray-800 dark:text-white">Example:</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {renderText(item.example)}
                    </div>
                </div>
            )}

            {/* Code Section */}
            {item.code && (
                <div className="my-6">
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <button
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                            onClick={toggleCodeVisibility}
                        >
                            {isCodeVisible ? (
                                <>
                                    <EyeOff className="w-5 h-5" />
                                    Hide Code
                                </>
                            ) : (
                                <>
                                    <Eye className="w-5 h-5" />
                                    Show Code
                                </>
                            )}
                        </button>
                        {isCodeVisible && (
                            <button
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                                onClick={copyToClipboard}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-5 h-5" />
                                        Copy Code
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    {isCodeVisible && (
                        <div className="mt-4 bg-gray-900 dark:bg-black rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                            <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                                <Code2 className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-semibold text-gray-300">Code Implementation</span>
                            </div>
                            <div className="p-4">
                                <CodeSnippet codeString={item.code} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Explanation Section */}
            {item.explanation && (
                <div className="mt-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 p-6 rounded-xl border-l-4 border-orange-500 dark:border-orange-400">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg flex items-center justify-center">
                            <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-800 dark:text-white">Explanation:</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {renderText(item.explanation)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetContent;