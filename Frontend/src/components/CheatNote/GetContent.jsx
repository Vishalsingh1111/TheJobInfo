import React, { useState, useEffect, useMemo } from "react";
import CodeSnippet from "../CodeSnippet/CodeSnippet";
import { FaMicrophone, FaStop } from 'react-icons/fa';

const GetContent = ({ item }) => {
    const [isCodeVisible, setIsCodeVisible] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const synth = useMemo(() => window.speechSynthesis, []);

    const toggleCodeVisibility = () => {
        setIsCodeVisible(!isCodeVisible);
    };

    useEffect(() => {
        return () => {
            if (synth.speaking) {
                synth.cancel();
                setIsSpeaking(false);
            }
        };
    }, [synth]);

    useEffect(() => {
        const handleBeforeUnload = () => {
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
            'id', 'header', 'text', 'statement', 'substatement1', 'substatement3', 'statement2', 'feature',
            'substatement2', 'explain', 'note', 'image1', 'category', 'figtitle', 'link1', 'link2'
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

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.2;

        const voices = synth.getVoices();
        const indianVoice = voices.find(voice => voice.lang.includes("en-IN"));
        if (indianVoice) {
            utterance.voice = indianVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        synth.cancel(); // Cancel previous speech
        synth.speak(utterance);
    };

    const renderText = (text) => {
        if (!text) return null;

        const parts = text
            .split(/(<h1>|<\/h1>|<h2>|<\/h2>|<br\s*\/?>|<bg>|<\/bg>|<li>|<\/li>|<b>|<\/b>|<m>|<\/m>)/g)
            .filter(Boolean);

        let isH1 = false, isH2 = false, isBg = false, isLi = false, isBold = false, isM = false;
        let bgContent = [], liContent = [];

        return parts.map((part, index) => {
            if (part === '<h1>') return (isH1 = true, null);
            if (part === '</h1>') return (isH1 = false, null);
            if (part === '<h2>') return (isH2 = true, null);
            if (part === '</h2>') return (isH2 = false, null);
            if (part === '<bg>') return (isBg = true, bgContent = [], null);
            if (part === '</bg>') {
                isBg = false;
                return <span key={index} className="inline-block text-blue-600 dark:text-white">{bgContent}</span>;
            }
            if (part === '<li>') return (isLi = true, liContent = [], null);
            if (part === '</li>') {
                isLi = false;
                return <li key={index} className="list-disc ml-4 py-1">{liContent}</li>;
            }
            if (part === '<b>') return (isBold = true, null);
            if (part === '</b>') return (isBold = false, null);
            if (part === '<m>') return (isM = true, null);
            if (part === '</m>') return (isM = false, null);
            if (part.match(/<br\s*\/?>/)) return <br key={index} />;

            const content = (
                <span
                    key={index}
                    className={`${isH1 ? "text-gray-800 dark:text-white text-xl" : isH2 ? "text-gray-700 dark:text-white text-xl" : ""} ${isBold ? "font-semibold dark:text-white text-gray-900 mr-1" : ""} ${isM ? "mt-8" : ""}`}
                >
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
        }).filter(Boolean);
    };

    return (
        <div className="dark:bg-slate-900 dark:text-white text-gray-700 my-8">
            <div className="flex justify-between items-center mb-4">
                <div className="font-[500]">
                    {renderText(item?.header)}
                </div>
                <button
                    onClick={speakContent}
                    className={`p-1 ${isSpeaking ? 'text-red-500' : 'text-blue-500'} border rounded-full`}
                >
                    {isSpeaking ? <FaStop /> : <FaMicrophone />}
                </button>
            </div>

            <div className="text-[17px] leading-relaxed text-justify font-[400]">
                {['text', 'statement', 'substatement1', 'statement2', 'substatement2', 'statement3', 'substatement3', 'statement4', 'substatement4'].map((key, index) => (
                    item[key] && (
                        <p key={index} className="py-2">
                            {renderText(item[key])}
                        </p>
                    )
                ))}
            </div>

            {item?.image && (
                <div className="py-5 text-center">
                    <img src={item.image} alt="description of image" />
                    <div className="mt-2 text-sm text-red-600">
                        Fig. {item.figtitle}
                    </div>
                </div>
            )}

            {item?.example && (
                <div className="my-5">
                    <div className="font-bold dark:text-white text-gray-500 mb-2">Example:</div>
                    <div>{renderText(item.example)}</div>
                </div>
            )}

            {item?.code && (
                <div className="my-5">
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/30 shadow-black/30"
                        onClick={toggleCodeVisibility}
                    >
                        {isCodeVisible ? 'Hide Code' : 'Show Code'}
                    </button>
                    {isCodeVisible && (
                        <div className="mt-4">
                            <CodeSnippet codeString={item.code} />
                        </div>
                    )}
                </div>
            )}

            {item?.explanation && (
                <div className="mt-4">
                    <div className="font-bold text-xl dark:text-white text-gray-600">Explanation:</div>
                    <div className="py-2">{renderText(item.explanation)}</div>
                </div>
            )}
        </div>
    );
};

export default GetContent;
