require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve Static Frontend Files
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// API Routes
const diagnoseRoutes = require('./routes/diagnose');
const schemesRoutes = require('./routes/schemes');
const voiceRoutes = require('./routes/voice');
const marketRoutes = require('./routes/market');
const chatRoutes = require('./routes/chat');

app.use('/api/diagnose', diagnoseRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/chat', chatRoutes);

// Health Check API
app.get('/api/health', (req, res) => {
    res.send('AgroTech AI Backend is Running');
});

// React Catch-All (Using app.use as fallback)
app.use((req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(err.status || 500).json({
        error: err.message || 'An unexpected error occurred'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Serving frontend from: ${frontendPath}`);
});
