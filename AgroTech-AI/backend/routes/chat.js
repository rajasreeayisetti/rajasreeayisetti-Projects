const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const prompts = require("../config/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getChatDemoResponse = (msg, language) => {
    const input = msg.toLowerCase();
    const responses = {
        English: {
            wheat: "Wheat (Triticum aestivum) grows best in cool weather (15-20°C). It is a major source of energy and protein in the human diet. To cultivate: Sow in October-November, provide 4-6 irrigations at critical stages like crown root initiation, and harvest when grains are hard. Recommended seed rate is 100-120kg per hectare.",
            rice: "Rice (Oryza sativa) is the primary food source for billions. It needs warm weather and high water levels. For best results: Transplant 21-25 day old seedlings, maintain standing water (5cm) during growth, and harvest when 80-90% of grains turn golden. Integrated Nutrient Management is recommended for higher yields.",
            tomato: "Tomatoes (Solanum lycopersicum) are versatile crops requiring warm weather and well-drained loamy soil. They should be grown on raised beds with proper staking for support. Use organic mulch to conserve moisture and apply neem-based sprays to prevent early blight and fruit borers.",
            potato: "Potatoes (Solanum tuberosum) are tubers that prefer cool weather. Plant high-quality seed tubers 5-10cm deep. Perform 'earthing up' twice (at 30 and 45 days) to encourage tuber growth and prevent greening from sun exposure. Harvest when the foliage turns yellow.",
            cotton: "Cotton (Gossypium) is known as 'White Gold'. It needs warm weather and deep, fertile black soil. Sow with the onset of the monsoon. Focus on Integrated Pest Management (IPM) to control American and Pink Bollworms. Harvest in several pickings as bolls mature and open.",
            fertilizer: "Fertilization should be based on soil test results. Use a balanced NPK ratio (e.g., 4:2:1 for cereals). Apply nitrogen in 3 split doses (sowing, tillering, and flowering) for maximum efficiency. Supplement with micronutrients like Zinc and Boron if needed.",
            pest: "Integrated Pest Management (IPM) is the best approach. It involves monitoring pests with pheromone traps, using bio-pesticides like Beauveria bassiana, and applying chemicals only as a last resort. Encourage friendly insects like ladybugs to naturally control aphids.",
            irrigation: "Efficient water management is critical. Drip or sprinkler irrigation can save 40-50% water compared to flood irrigation. Irrigate during critical moisture-sensitive stages (e.g., flowering and grain filling) to avoid yield loss. Ensure proper drainage to prevent root rot.",
            soil: "Healthy soil is the foundation of farming. Get your soil tested every 2 years for pH and nutrient levels. Apply FYM (Farm Yard Manure) or vermicompost annually to improve soil structure and microbial activity. Practice crop rotation with legumes to fix nitrogen.",
            disease: "Prevent crop diseases by selecting resistant varieties and treating seeds with fungicides before sowing. Maintain proper plant spacing for better air circulation and sunlight penetration. Remove and burn diseased plant parts immediately to prevent further spread.",
            default: "I am AgroTech AI, your farming expert. I can provide detailed guidance on crop cultivation, soil health, pest management, and irrigation techniques. Please ask about specific crops like wheat, rice, or tomato to get started!"
        },
        Telugu: {
            wheat: "గోధుమ (Triticum aestivum) చల్లని వాతావరణంలో (15-20°C) బాగా పెరుగుతుంది. సాగు విధానం: అక్టోబర్-నవంబర్‌లో విత్తండి, కీలక దశలలో 4-6 సార్లు నీరు పెట్టండి మరియు గింజలు గట్టిపడినప్పుడు కోయండి. హెక్టారుకు 100-120 కిలోల విత్తన మోతాదు సిఫార్సు చేయబడింది.",
            rice: "వరి (Oryza sativa) బిలియన్ల మందికి ప్రధాన ఆహారం. దీనికి వెచ్చని వాతావరణం మరియు ఎక్కువ నీరు అవసరం. ఉత్తమ ఫలితాల కోసం: 21-25 రోజుల నారును నాటండి, పెరుగుదల సమయంలో 5 సెం.మీ నీరు ఉండేలా చూడండి మరియు 80-90% గింజలు బంగారు రంగులోకి వచ్చినప్పుడు కోయండి.",
            tomato: "టమోటాలు (Solanum lycopersicum) వెచ్చని వాతావరణం మరియు సారవంతమైన నేల అవసరమయ్యే పంటలు. వీటిని ఎత్తైన పాదులపై పెంచాలి. మట్టిలో తేమను కాపాడటానికి మల్చింగ్ చేయండి మరియు ఆకు మచ్చ తెగులు నివారణకు వేప నూనె వాడండి.",
            potato: "బంగాళాదుంపలు (Solanum tuberosum) చల్లని వాతావరణాన్ని ఇష్టపడతాయి. నాణ్యమైన విత్తన దుంపలను 5-10 సెం.మీ లోతులో నాటండి. దుంపల ఎదుగుదల కోసం 30 మరియు 45 రోజులలో రెండుసార్లు మట్టిని ఎగదోయాలి. ఆకులు పసుపు రంగులోకి వచ్చినప్పుడు కోయండి.",
            cotton: "పత్తి (Gossypium)ని 'తెల్ల బంగారం' అని పిలుస్తారు. దీనికి వెచ్చని వాతావరణం మరియు లోతైన నల్ల రేగడి నేలలు అనుకూలం. తెగుళ్ల నివారణకు సమగ్ర సంరక్షణ (IPM) పాటించండి. కాయలు పగిలిన తర్వాత విడతల వారీగా ఏరుకోవాలి.",
            fertilizer: "నేల పరీక్ష ఆధారంగానే ఎరువులు వాడాలి. నత్రజనిని మూడు విడతలుగా (విత్తేటప్పుడు, దుబ్బు చేసేటప్పుడు, పూత దశలో) వాడటం వల్ల మొక్కకు బాగా అందుతుంది. అవసరమైతే జింక్ మరియు బోరాన్ వంటి సూక్ష్మ పోషకాలను కూడా అందించండి.",
            pest: "సమగ్ర తెగులు నిర్వహణ (IPM) ఉత్తమమైనది. దీనిలో ఫెరమోన్ ట్రాప్‌లు వాడటం, బవేరియా బసియానా వంటి జీవ నియంత్రణలను ఉపయోగించడం మరియు రసాయనాలను చివరి ఎంపికగా మాత్రమే వాడటం జరుగుతుంది. మిత్ర పురుగులను ప్రోత్సహించడం ద్వారా పచ్చ పురుగులను సహజంగా అరికట్టవచ్చు.",
            irrigation: "క్షమవంతమైన నీటి నిర్వహణ చాలా ముఖ్యం. డ్రిప్ లేదా స్ప్రింక్లర్ సాగు ద్వారా 40-50% నీటిని ఆదా చేయవచ్చు. కీలక దశల్లో (పూత మరియు గింజ పక్వ దశ) నీటి ఎద్దడి లేకుండా చూడాలి. నీరు నిల్వ ఉండకుండా చూసుకోవడం ద్వారా వేరు కుళ్లును నివారించవచ్చు.",
            soil: "ఆరోగ్యకరమైన నేత వ్యవసాయానికి మూలం. ప్రతి 2 ఏళ్లకు ఒకసారి భూసార పరీక్ష చేయించండి. ప్రతి ఏటా పశువుల ఎరువు లేదా వర్మీ కంపోస్ట్ వాడటం వల్ల నేల సారం పెరుగుతుంది. పప్పు ధాన్యాల పంటలతో పంట మార్పిడి చేయడం ద్వారా నేలలో నత్రజని పెరుగుతుంది.",
            disease: "రోగ నిరోధక రకాలను ఎంచుకోవడం మరియు విత్తన శుద్ధి చేయడం ద్వారా పంట వ్యాధులను నివారించవచ్చు. మొక్కల మధ్య సరైన దూరం పాటించడం వల్ల గాలి మరియు వెలుతురు బాగా అందుతుంది. సోకిన మొక్కల భాగాలను వెంటనే తొలగించి కాల్చివేయాలి.",
            default: "నేను అగ్రోటెక్ AIని, మీ వ్యవసాయ నిపుణుడిని. నేను పంట సాగు, నేల ఆరోగ్యం, తెగుళ్ల నిర్వహణ మరియు నీటి పారుదల గురించి వివరంగా తెలియజేయగలను. ప్రారంభించడానికి వరి, గోధుమ లేదా టమోటా వంటి పంటల గురించి అడగండి!"
        }
    };

    const langSet = responses[language] || responses.English;

    // Check for crop-specific keywords
    if (input.includes('wheat') || input.includes('గోధుమ')) return langSet.wheat;
    if (input.includes('rice') || input.includes('వరి') || input.includes('paddy') || input.includes('ధాన్యం')) return langSet.rice;
    if (input.includes('tomato') || input.includes('టమోటా')) return langSet.tomato;
    if (input.includes('potato') || input.includes('బంగాళాదుంప')) return langSet.potato;
    if (input.includes('cotton') || input.includes('పత్తి')) return langSet.cotton;

    // Check for topic-specific keywords
    if (input.includes('fertilizer') || input.includes('ఎరువు') || input.includes('manure')) return langSet.fertilizer;
    if (input.includes('pest') || input.includes('తెగులు') || input.includes('insect') || input.includes('bug')) return langSet.pest;
    if (input.includes('irrigation') || input.includes('water') || input.includes('నీరు') || input.includes('పారుదల')) return langSet.irrigation;
    if (input.includes('soil') || input.includes('నేల') || input.includes('మట్టి')) return langSet.soil;
    if (input.includes('disease') || input.includes('వ్యాధి') || input.includes('infection') || input.includes('fungus')) return langSet.disease;

    return langSet.default;
};

router.post('/', async (req, res) => {
    try {
        const { message, history, language = 'English' } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Demo Mode Check
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here" || process.env.GEMINI_API_KEY === "") {
            const response = getChatDemoResponse(message, language);
            return res.json({ response: `[DEMO MODE] ${response}` });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = model.startChat({
            history: history || [],
            systemInstruction: prompts.AGRI_CHAT_PROMPT.replace('{language}', language),
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        res.json({ response: response.text() });
    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: 'Chat service failed' });
    }
});

module.exports = router;
