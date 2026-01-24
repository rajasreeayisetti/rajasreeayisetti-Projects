const express = require('express');
const router = express.Router();
const multer = require('multer');
const { diagnoseImage } = require('../services/geminiVision');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
    console.log("Diagnose request received. File:", req.file ? req.file.originalname : "No file");
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const language = req.body.language || 'English';
        const diagnosis = await diagnoseImage(req.file.buffer, req.file.mimetype, language, req.file.originalname);

        res.json({ diagnosis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Diagnosis failed' });
    }
});

module.exports = router;
