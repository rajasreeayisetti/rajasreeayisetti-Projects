const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const prompts = require("../config/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getCropStats(cropName) {
    let hash = 0;
    for (let i = 0; i < cropName.length; i++) {
        hash = ((hash << 5) - hash) + cropName.charCodeAt(i);
        hash |= 0;
    }
    const seed = Math.abs(hash);

    return {
        priceMin: 1800 + (seed % 2500),
        priceMax: 3500 + (seed % 3500),
        demand: (seed % 3 === 0) ? "Strong" : (seed % 3 === 1 ? "Consistent" : "Moderate"),
        trend: (seed % 2 === 0) ? "UPWARD (Bullish)" : "STABLE",
        stockStatus: (seed % 4 === 0) ? "Scarcity" : (seed % 4 === 1 ? "Surplus" : "Steady Supply"),
        arrival: (seed % 3 === 0) ? "Peak" : "Early Stage",
        forecast: 4 + (seed % 14)
    };
}

const getMarketDemoResponse = (crop, language) => {
    const isTelugu = language === 'Telugu';

    if (crop.toLowerCase() === 'all' || crop.toLowerCase() === 'all crops' || crop === 'అన్ని పంటలు') {
        const topCrops = isTelugu ? ['వరి', 'గోధుమ', 'టమోటా', 'పత్తి', 'మిర్చి'] : ['Rice', 'Wheat', 'Tomato', 'Cotton', 'Chilli'];
        let dashboard = isTelugu ? `[డెమో మోడ్] సమగ్ర మార్కెట్ డాష్‌బోర్డ్\n\n` : `[DEMO MODE] Comprehensive Market Dashboard\n\n`;

        topCrops.forEach(c => {
            const s = getCropStats(c);
            dashboard += `${c.toUpperCase()}:\n` +
                (isTelugu ? `💰 ధర: ₹${s.priceMin}-${s.priceMax} | 📈 స్థితి: ${s.trend} | 📦 నిల్వ: ${s.stockStatus}\n\n` :
                    `💰 Price: ₹${s.priceMin}-${s.priceMax} | 📈 Status: ${s.trend} | 📦 Stock: ${s.stockStatus}\n\n`);
        });

        dashboard += isTelugu ? `💡 గమనిక: ఏదైనా నిర్దిష్ట పంట గురించి వివరణాత్మక విశ్లేషణ కోసం ఆ పంట పేరుతో శోధించండి.`
            : `💡 Note: Search for a specific crop name for a deep-dive scientific analysis.`;
        return dashboard;
    }

    const stats = getCropStats(crop);

    if (isTelugu) {
        return `[డెమో మోడ్] ${crop} విశ్లేషణ నివేదిక\n\n` +
            `💵 ధర స్థితి (Price Status):\n` +
            `ప్రస్తుత మార్కెట్ ధర ₹${stats.priceMin} నుండి ₹${stats.priceMax} మధ్య ఉంది. పంట నాణ్యతను బట్టి క్వింటాల్‌కు ₹${stats.priceMax + 200} వరకు వచ్చే అవకాశం ఉంది.\n\n` +
            `📉 ప్రస్తుత ధోరణి (Current Trends):\n` +
            `మార్కెట్ ఇప్పుడు ${stats.trend} ధోరణిలో ఉంది. డిమాండ్ ${stats.demand}గా ఉండటం వల్ల వచ్చే నెలలో ${stats.forecast}% వరకు ధరలు పెరిగే సూచనలు ఉన్నాయి.\n\n` +
            `📦 స్టాక్ స్థితి (Stock Status):\n` +
            `ప్రస్తుతం మార్కెట్‌లో ${stats.stockStatus} ఉంది. పంట రాక (Arrivals) ${stats.arrival} దశలో ఉంది.\n\n` +
            `💡 శాస్త్రీయ సిఫార్సు:\n` +
            `మార్కెట్ అస్థిరతను గమనిస్తూ, నాణ్యమైన బాండల్స్‌ను వేరు చేసి నిల్వ చేయడం లాభదాయకం.`;
    }

    return `[DEMO MODE] ${crop} Market Status Report\n\n` +
        `💰 PRICE STATUS:\n` +
        `The current trading range is ₹${stats.priceMin} - ₹${stats.priceMax} per quintal. Premium grades are fetching an additional ₹250 above the average mandi rates.\n\n` +
        `📈 CURRENT TRENDS:\n` +
        `Market sentiment is ${stats.trend}. With ${stats.demand} global demand and supply chain contractions, we project a ${stats.forecast}% appreciation in value over the next 30 days.\n\n` +
        `📦 SUPPLY STATUS:\n` +
        `The stock level is currently ${stats.stockStatus}. Market arrivals are in the ${stats.arrival} phase with steady influx from major production zones.\n\n` +
        `💡 TRADE ADVICE:\n` +
        `Given the ${stats.trend} trend, consider a phased selling strategy. Retain 40% of standard grades for the late-season price peak while liquidating surplus stock now.`;
};

router.post('/summary', async (req, res) => {
    try {
        const { crop, language = 'English' } = req.body;
        const targetCrop = crop && crop.trim() ? crop : (language === 'Telugu' ? 'అన్ని పంటలు' : 'All Crops');

        if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = prompts.MARKET_TREND_PROMPT.replace('{crop}', targetCrop).replace('{language}', language);
            const result = await model.generateContent(prompt + "\nProvide explicit sections for: 1. Price Status, 2. Current Trends, 3. Stock/Supply Status.");
            const response = await result.response;
            return res.json({ summary: response.text() });
        }

        return res.json({ summary: getMarketDemoResponse(targetCrop, language) });
    } catch (error) {
        console.error("Market error:", error);
        res.status(500).json({ error: 'Failed' });
    }
});

module.exports = router;
