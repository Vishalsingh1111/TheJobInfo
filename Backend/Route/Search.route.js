

// export default router;

import express from 'express';
import Blog from '../Modal/Blog.modal.js';
import SheetProblem from '../Modal/sheetproblem.modal.js';

const router = express.Router();

// Create text indexes for search functionality
const createIndexes = async () => {
    await Blog.createIndexes({ header: 'text', code: 'text', explanation: 'text', category: 'text' });
    await SheetProblem.createIndexes({ name: 'text', article: 'text', Level: 'text', topic: 'text' });
};

createIndexes();

// Search for results
router.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: 'Query is required' });
    }

    try {
        const blogs = await Blog.find({ $text: { $search: query } });
        const sheetProblems = await SheetProblem.find({ $text: { $search: query } });

        const results = [
            ...blogs.map(item => ({ ...item._doc, type: 'blog' })),
            ...sheetProblems.map(item => ({ ...item._doc, type: 'sheetProblem' }))
        ];

        res.json(results);
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ message: 'Error searching' });
    }
});

// Fetch suggestions based on query
router.get('/suggestions', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: 'Query is required' });
    }

    try {

        const blogSuggestions = await Blog.find({ header: new RegExp(query, 'i') }).limit(7);
        const sheetProblemSuggestions = await SheetProblem.find({ name: new RegExp(query, 'i') }).limit(7);

        const suggestions = [

            ...blogSuggestions.map(item => ({ ...item._doc, type: 'blog' })),
            ...sheetProblemSuggestions.map(item => ({ ...item._doc, type: 'sheetProblem' }))
        ];

        // Remove duplicates if needed (optional)
        const uniqueSuggestions = Array.from(new Set(suggestions.map(s => s.header)))
            .map(header => suggestions.find(s => s.header === header));

        res.json(uniqueSuggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ message: 'Error fetching suggestions' });
    }
});

// Get detailed information about a specific result by ID
router.get('/results/:id', async (req, res) => {
    const resultId = req.params.id;

    try {


        const blog = await Blog.findById(resultId);
        if (blog) {
            return res.json({ ...blog._doc, type: 'blog' });
        }

        const sheetProblem = await SheetProblem.findById(resultId);
        if (sheetProblem) {
            return res.json({ ...sheetProblem._doc, type: 'sheetProblem' });
        }

        // If no matching result was found
        return res.status(404).json({ message: 'Result not found' });
    } catch (error) {
        console.error('Error fetching result details:', error);
        res.status(500).json({ message: 'Error fetching result details' });
    }
});

export default router;

