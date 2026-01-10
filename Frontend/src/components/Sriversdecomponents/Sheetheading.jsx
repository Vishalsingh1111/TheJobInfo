

import React from 'react';
import { CheckSquare, FileText, BarChart3, BookOpen, Building2, ExternalLink, Star, Edit } from 'lucide-react';

function Sheetheading() {
    return (
        <tr className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border-b-2 border-gray-300 dark:border-gray-700">
            <th className="px-4 py-4 text-left font-bold text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
                <div className="flex items-center gap-2 justify-center">
                    <CheckSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>STATUS</span>
                </div>
            </th>
            <th className="px-4 py-4 text-left font-bold text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>PROBLEM</span>
                </div>
            </th>
            <th className="px-4 py-4 text-left font-bold text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span>DIFFICULTY</span>
                </div>
            </th>
            <th className="px-4 py-4 text-center font-bold text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>ARTICLE</span>
                </div>
            </th>
            <th className="px-4 py-4 text-center font-bold text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>COMPANIES</span>
                </div>
            </th>
            <th className="px-4 py-4 text-center font-bold text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span>PRACTICE</span>
                </div>
            </th>
            <th className="px-4 py-4 text-center font-bold text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span>REVISION</span>
                </div>
            </th>
            <th className="px-4 py-4 text-center font-bold text-gray-700 dark:text-gray-200">
                <div className="flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>NOTE</span>
                </div>
            </th>
        </tr>
    );
}

export default Sheetheading;