const Resume = require('../models/Resume');
const extractText = require('../utils/extractText');
const matchAlgorithm = require('../utils/matchAlgorithm');
const fs = require('fs');

exports.uploadResume = async (req, res) => {
    console.log(`Processing upload: ${req.files?.length} files received`);
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const { jobDescription } = req.body;
        if (!jobDescription || jobDescription.trim().length < 10) {
            return res.status(400).json({ message: 'A valid job description is required (min 10 chars)' });
        }

        const results = [];

        for (const file of req.files) {
            console.log(`Extracting text from: ${file.originalname}`);
            // Extract Text
            let text;
            try {
                text = await extractText(file);
                if (!text || text.trim().length === 0) {
                    throw new Error("No text could be extracted from this file.");
                }
            } catch (extErr) {
                console.error(`Extraction failed for ${file.originalname}:`, extErr);
                results.push({
                    fileName: file.originalname,
                    error: `Extraction failed: ${extErr.message}`
                });
                continue;
            }

            // Match Logic
            console.log(`Calculating match score for: ${file.originalname}`);
            const matchData = matchAlgorithm(text, jobDescription);

            // Save to DB (Optional: Fail gracefully if DB is down)
            try {
                const newResume = new Resume({
                    fileName: file.originalname,
                    extractedText: text,
                    matchScore: matchData.score
                });
                await newResume.save();
                console.log(`Saved to DB: ${file.originalname}`);
            } catch (dbErr) {
                console.warn(`Database save failed for ${file.originalname} (Non-critical):`, dbErr.message);
            }

            // Clean up uploaded file
            try {
                fs.unlinkSync(file.path);
            } catch (err) {
                console.error("Failed to delete temp file", err);
            }

            results.push({
                fileName: file.originalname,
                score: matchData.score,
                matchedKeywords: matchData.matchedKeywords,
                missingKeywords: matchData.missingKeywords,
                status: matchData.score >= 70 ? 'Good' : matchData.score >= 40 ? 'Average' : 'Poor'
            });
        }

        res.status(200).json({
            message: 'Resumes processed successfully',
            results
        });

    } catch (error) {
        console.error("Global Server Error:", error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
