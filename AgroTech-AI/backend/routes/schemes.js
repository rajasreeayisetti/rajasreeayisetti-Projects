const express = require('express');
const router = express.Router();
const { getRAGResponse } = require('../services/ragService');

router.post('/search', async (req, res) => {
    try {
        const { query, language } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const answer = await getRAGResponse(query, 'Scheme', language || 'English');
        res.json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search schemes' });
    }
});

module.exports = router;
