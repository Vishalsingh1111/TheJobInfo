import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { baseUrl } from '../../Baseurl';

function SearchForm() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);
    const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

    useEffect(() => {
        if (query.length > 0 && !isSuggestionSelected) {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.get(`${baseUrl}/search/suggestions`, {
                        params: { q: query },
                    });
                    setSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            };

            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [query, isSuggestionSelected]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${baseUrl}/search`, {
                params: { q: query },
            });
            setResults(response.data);
            setIsSuggestionSelected(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        setQuery(suggestion.header);
        setIsSuggestionSelected(true);
        try {
            const response = await axios.get(`${baseUrl}/search`, {
                params: { q: suggestion.header },
            });
            setResults(response.data);
            setSuggestions([]);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value.length === 0) {
            setIsSuggestionSelected(false);
        }
    };

    return (
        <div className="w-full">
            {/* Search Bar */}
            <div className="w-full mb-8">
                <form onSubmit={handleSearch} className="relative">
                    <div className="relative">
                        <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6 pointer-events-none z-10" />
                        <input
                            type="text"
                            placeholder="Search courses, topics, problems..."
                            className="w-full pl-12 sm:pl-16 pr-24 sm:pr-32 py-3 sm:py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none text-base sm:text-lg bg-white/90 backdrop-blur-sm transition-all dark:bg-slate-800/90 dark:text-white dark:border-purple-300 dark:placeholder-gray-400"
                            value={query}
                            onChange={handleQueryChange}
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all whitespace-nowrap"
                        >
                            Search
                        </button>
                    </div>

                    {/* Suggestions Dropdown */}
                    {query.length > 0 && !isSuggestionSelected && suggestions.length > 0 && (
                        <ul className="absolute w-full bg-white mt-2 shadow-lg max-h-[250px] sm:max-h-[300px] overflow-auto rounded-2xl p-2 z-20 border-2 border-purple-100 dark:bg-slate-800 dark:border-purple-300">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion._id}
                                    className="p-3 hover:bg-purple-50 dark:hover:bg-slate-700 cursor-pointer rounded-lg transition-all"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <span className="text-sm sm:text-base text-gray-800 dark:text-white">{suggestion.header}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>

            {/* Results */}
            {results.length > 0 && (
                <div className="w-full space-y-4">
                    {results.map((result) => (
                        <div
                            key={result._id}
                            className="bg-white shadow-md rounded-2xl p-4 sm:p-6 border-2 border-purple-100 hover:border-purple-300 transition-all dark:bg-slate-800 dark:border-purple-300"
                        >
                            <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                                {result.header}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                {result.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchForm;