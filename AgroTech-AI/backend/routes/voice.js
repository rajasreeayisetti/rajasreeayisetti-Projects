const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const prompts = require("../config/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// UNIVERSAL DEMO GENERATOR (Works for any crop)
// UNIVERSAL DEMO GENERATOR (Works for any crop)
const getUniversalVoiceResponse = (text, language) => {
    const input = text.toLowerCase();
    const isTelugu = language === 'Telugu';
    const isHindi = language === 'Hindi';

    // Identify Crop
    let crop = 'Crop';
    const knownCrops = ['wheat', 'rice', 'paddy', 'maize', 'corn', 'tomato', 'potato', 'onion', 'cotton', 'chilli', 'mango', 'banana', 'sugarcane', 'brinjal'];

    // Check key words
    for (let k of knownCrops) { if (input.includes(k)) { crop = k; break; } }

    // Identify Action/Symptom
    let symptom = '';

    // English Keywords
    if (input.includes('yellow') || input.includes('chlorosis')) symptom = 'yellowing';
    else if (input.includes('spot') || input.includes('blight') || input.includes('rust')) symptom = 'spots';
    else if (input.includes('wilt') || input.includes('droop') || input.includes('die')) symptom = 'wilting';
    else if (input.includes('pest') || input.includes('bug') || input.includes('insect') || input.includes('attack')) symptom = 'pest';

    // Telugu Keywords
    else if (input.includes('పసుపు')) symptom = 'yellowing';
    else if (input.includes('మచ్చ')) symptom = 'spots';
    else if (input.includes('వాడిపో')) symptom = 'wilting';
    else if (input.includes('పురుగు')) symptom = 'pest';

    // Hindi Keywords
    else if (input.includes('peela') || input.includes('पीला')) symptom = 'yellowing';
    else if (input.includes('dhabba') || input.includes('धब्बा')) symptom = 'spots';
    else if (input.includes('murjha') || input.includes('मुरझा')) symptom = 'wilting';
    else if (input.includes('kit') || input.includes('kiit') || input.includes('कीट')) symptom = 'pest';

    const cropName = crop === 'Crop' ? (isHindi ? 'फसल' : isTelugu ? 'పంట' : 'crop') : crop;

    if (isTelugu) {
        let msg = `[డెమో మోడ్] మీరు ${cropName} గురించి అడిగారు. `;
        if (symptom === 'yellowing') msg += `పసుపు ఆకులు సాధారణంగా నత్రజని లోపం లేదా వైరస్ వల్ల వస్తాయి. శాస్త్రీయంగా, దీనిని క్లోరోసిస్ అంటారు. మీరు సమతుల్య ఎరువులు వాడాలని సిఫార్సు చేయబడింది.`;
        else if (symptom === 'spots') msg += `ఆకులపై మచ్చలు శిలీంధ్ర వ్యాధి (Fungal disease) లక్షణం. తగిన శిలీంద్ర సంహారిణిని వాడండి.`;
        else if (symptom === 'pest') msg += `ఇది తెగులు లేదా పురుగుల దాడి కావచ్చు. వేప నూనెను పిచికారీ చేయండి.`;
        else if (symptom === 'wilting') msg += `మొక్క వాడిపోవడం నీటి ఎద్దడి లేదా వేరు కుళ్ళ తెగులు కావచ్చు. నీటి పారుదల సరిచూసుకోండి.`;
        else msg += `సాధారణంగా ${cropName} సాగుకు మంచి నీటి పారుదల మరియు సరైన పోషకాలు అవసరం. మీకు ఖచ్చితమైన సమాచారం కావాలంటే, సమస్యను (మచ్చలు, పసుపు రంగు, పురుగులు) స్పష్టంగా చెప్పండి.`;
        return msg;
    }

    if (isHindi) {
        let msg = `[DEMO MODE] आपने ${cropName} के बारे में पूछा। `;
        if (symptom === 'yellowing') msg += `पत्तियां पीली पड़ना (Chlorosis) आमतौर पर नाइट्रोजन की कमी या वायरस के कारण होता है। सूक्ष्म पोषक तत्वों का छिड़काव करें।`;
        else if (symptom === 'spots') msg += `पत्तियों पर धब्बे कवक (fungal) रोग का संकेत देते हैं। कवकनाशी (fungicide) का प्रयोग करें।`;
        else if (symptom === 'pest') msg += `यह कीटों का हमला लग रहा है। कृपया नीम तेल या उचित कीटनाशक का प्रयोग करें।`;
        else if (symptom === 'wilting') msg += `मुरझाना पानी की कमी या जड़ की बीमारी हो सकती है। नमी की जाँच करें।`;
        else msg += `अच्छी फसल के लिए सही खाद और पानी आवश्यक है। सटीक सलाह के लिए कृपया समस्या (जैसे धब्बे, पीलापन, कीड़े) स्पष्ट बताएं।`;
        return msg;
    }

    // English Default
    let msg = `[DEMO MODE] You asked about ${cropName}. `;
    if (symptom === 'yellowing') msg += `Yellowing (Chlorosis) in ${cropName} typically indicates a lack of mobile nutrients like Nitrogen or a viral infection. I recommend a foliar spray of micronutrients.`;
    else if (symptom === 'spots') msg += `The spots observed on ${cropName} are indicative of a pathogen attack, likely fungal. Ensure the leaves remain dry and use a protective spray.`;
    else if (symptom === 'pest') msg += `This sounds like a pest infestation. Inspect the underside of leaves and apply Neem oil or appropriate insecticide.`;
    else if (symptom === 'wilting') msg += `Wilting often results from water stress (too much or too little) or root rot. Check soil moisture immediately.`;
    else msg += `Cultivating ${cropName} requires balanced NPK application and proper soil moisture. For a more scientific diagnosis, please mention specific symptoms like spots, yellowing, or pests.`;

    return msg + "\n\n(Note: Add a Gemini API Key for real-time scientific advice on all global crops.)";
};

router.post('/process', async (req, res) => {
    try {
        const { text, language = 'English' } = req.body;
        if (!text) return res.status(400).json({ error: 'Text required' });

        // REAL AI MODE (Handles all crops)
        if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = prompts.VOICE_DIAGNOSIS_PROMPT.replace('{input_text}', text).replace('{language}', language);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return res.json({ response: response.text() });
        }

        // UNIVERSAL DEMO
        const response = getUniversalVoiceResponse(text, language);
        return res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed' });
    }
});

module.exports = router;
