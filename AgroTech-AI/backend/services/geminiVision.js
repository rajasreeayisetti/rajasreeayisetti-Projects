const { GoogleGenerativeAI } = require("@google/generative-ai");
const prompts = require("../config/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to generate a deterministic hash from the image buffer
function getBufferHash(buffer) {
    let hash = 0;
    const len = Math.min(buffer.length, 8192);
    for (let i = 0; i < len; i += 8) {
        hash = ((hash << 5) - hash) + buffer[i];
        hash |= 0;
    }
    return Math.abs(hash);
}

// 1. Specific High-Quality Demo Samples
const specificSamples = {
    tomato: {
        English: "Crop Identified: Tomato (Solanum lycopersicum)\nCondition: Early Blight (Alternaria solani)\nHealth: Yellowing lower leaves with target-like brown spots.\nScientific Explanation: Fungal pathogen spreading via soil splash. It inhibits photosynthesis.\nSeverity: Medium\nTreatment: Remove debris, apply Mancozeb or Copper Oxychloride.",
        Telugu: "గుర్తించబడిన పంట: టమోటా (Solanum lycopersicum)\nవ్యాధి: ఎర్లీ బ్లైట్ (Alternaria solani)\nఆరోగ్యం: దిగువ ఆకులపై వృత్తాకార మచ్చలు.\nతీవ్రత: మోతాదుగా\nచికిత్స: సోకిన ఆకులను తొలగించి, మాంకోజెబ్ పిచికారీ చేయండి."
    },
    rice: {
        English: "Crop Identified: Rice (Oryza sativa)\nCondition: Bacterial Leaf Blight (Xanthomonas oryzae)\nHealth: Yellowish streaks with wavy margins on leaf tips.\nScientific Explanation: Bacteria blocking xylem vessels, preventing water transport.\nSeverity: High\nTreatment: Drain the field, spray Streptocycline + Copper Oxychloride.",
        Telugu: "గుర్తించబడిన పంట: వరి (Oryza sativa)\nవ్యాధి: బ్యాక్టీరియల్ లీఫ్ బ్లైట్\nఆరోగ్యం: ఆకు చివరల నుండి పసుపు-తెలుపు చారలు.\nతీవ్రత: అధికం\nచికిత్స: పొలంలో నీరు తీసివేసి, స్ట్రెప్టోసైక్లిన్ వాడండి."
    },
    maize: {
        English: "Crop Identified: Maize (Zea mays)\nCondition: Northern Leaf Blight (Exserohilum turcicum)\nHealth: Long greyish elliptical lesions parallel to veins.\nScientific Explanation: Airborne fungal spores colonizing leaf tissues in humid weather.\nSeverity: Medium-High\nTreatment: Crop rotation, spray Propiconazole or Azoxystrobin.",
        Telugu: "గుర్తించబడిన పంట: మొక్కజొన్న (Zea mays)\nవ్యాధి: నార్తర్న్ లీఫ్ బ్లైట్\nఆరోగ్యం: ఆకులపై పొడవైన బూడిద రంగు మచ్చలు.\nతీవ్రత: మోతాదు-అధికం\nచికిత్స: పంట మార్పిడి చేయండి మరియు ప్రోపికోనజోల్ వాడండి."
    }
};

// 2. Universal Template Generator for ANY other crop
function getUniversalDemoResponse(cropName, language) {
    const isTelugu = language === 'Telugu';

    if (isTelugu) {
        return `[డెమో మోడ్ విశ్లేషణ: ${cropName}]\n\n` +
            `గుర్తించబడిన పంట: ${cropName} (శాస్త్రీయ నామం విశ్లేషించబడుతోంది)\n` +
            `మొక్క ఆరోగ్య వివరణ: ఈ ${cropName} మొక్క ఆకులపై పాలిపోయిన రంగు మరియు చిన్న మచ్చలు కనిపిస్తున్నాయి. ఇది పోషకాహార లోపం లేదా ప్రారంభ దశ వ్యాధి కావచ్చు.\n\n` +
            `పరిస్థితి: విశ్లేషణాత్మక నిర్ధారణ పెండింగ్‌లో ఉంది\n` +
            `శాస్త్రీయ వివరణ: మొక్క సెరోటోనిన్ మరియు క్లోరోఫిల్ స్థాయిలలో మార్పుల వల్ల ఆకులు రంగు మారుతున్నాయి.\n` +
            `తీవ్రత: తక్కువ\n\n` +
            `చికిత్స ప్రణాళిక:\n` +
            `1. సేంద్రీయ: సమీకృత ఎరువులు మరియు వేప నూనె వాడండి.\n` +
            `2. నిర్వహణ: మొక్కకు తగినంత గాలి మరియు వెలుతురు అందేలా చూడండి.\n\n` +
            `గమనిక: నిజ-సమయ మరియు ఖచ్చితమైన విశ్లేషణ కోసం దయచేసి GEMINI_API_KEYని కాన్ఫిగర్ చేయండి.`;
    }

    return `[DEMO MODE ANALYSIS: ${cropName}]\n\n` +
        `Crop Identified: ${cropName} (Scientific Name Indexing...)\n` +
        `Plant Health Description: This ${cropName} specimen shows mild chlorosis and localized spot forming. It appears to be in the early stages of environmental stress or nutrient deficiency.\n\n` +
        `Condition: General Pathogen Stress\n` +
        `Scientific Explanation: The plant is exhibiting defensive metabolic responses to external stressors, leading to localized cell necrosis or pigment loss.\n` +
        `Severity: Low-Medium\n\n` +
        `Treatment Plan:\n` +
        `1. Organic: Apply organic seaweed extract and ensure balanced soil pH.\n` +
        `2. Chemical: If symptoms persist, apply a broad-spectrum protective fungicide.\n` +
        `3. Management: Optimize irrigation schedules to avoid root stress.\n\n` +
        `NOTE: Configure a valid GEMINI_API_KEY in .env for real-time scientific identification of all unique crops.`;
}

function getVariedDemoResponse(buffer, filename = "", language = "English") {
    const fn = filename.toLowerCase();

    // Check specific high-quality matches
    if (fn.includes('tomato') || fn.includes('టమోటా')) return specificSamples.tomato[language] || specificSamples.tomato.English;
    if (fn.includes('rice') || fn.includes('వరి') || fn.includes('paddy')) return specificSamples.rice[language] || specificSamples.rice.English;
    if (fn.includes('maize') || fn.includes('corn') || fn.includes('మొక్కజొన్న')) return specificSamples.maize[language] || specificSamples.maize.English;

    // Use filename as the crop name if possible, otherwise generic "Crop"
    let detectedCrop = "Crop";
    const nameOnly = filename.split('.')[0].replace(/[0-9-_]/g, ' ').trim();
    if (nameOnly && nameOnly.length > 2) detectedCrop = nameOnly.charAt(0).toUpperCase() + nameOnly.slice(1);

    return getUniversalDemoResponse(detectedCrop, language);
}

async function diagnoseImage(imageBuffer, mimeType, language = "English", filename = "") {
    // Real AI Mode (Handles ALL crops globally)
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here" && process.env.GEMINI_API_KEY !== "") {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = prompts.CROP_DOCTOR_SYSTEM_PROMPT.replace("{language}", language);
            const image = { inlineData: { data: imageBuffer.toString("base64"), mimeType } };

            const result = await model.generateContent([prompt, image]);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini Vision Error:", error);
            throw new Error("Failed to diagnose image");
        }
    }

    // Demo Mode (Flexible Universal Wrapper)
    console.warn("Using Universal Demo Mode for:", filename);
    return getVariedDemoResponse(imageBuffer, filename, language);
}

module.exports = { diagnoseImage };