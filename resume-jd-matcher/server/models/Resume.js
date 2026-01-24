const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  extractedText: { type: String, required: true },
  matchScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
