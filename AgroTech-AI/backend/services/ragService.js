const { queryVectors } = require('./pineconeService');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const prompts = require("../config/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getRAGResponse(query, category, language = "English") {
    // Demo Mode Check
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here" || process.env.OPENAI_API_KEY === "") {
        const schemeSamples = [
            {
                English: "[DEMO MODE: Scheme Finder]\n\nBased on your profile, you are eligible for:\n1. PM-Kisan Samman Nidhi: Income support of ₹6,000/year (3 installments).\n2. PM Fasal Bima Yojana: Comprehensive crop insurance with low premium (2% for Kharif, 1.5% for Rabi).\n3. Paramparagat Krishi Vikas Yojana (PKVY): Support for organic farming and cluster-based development.\n4. Micro Irrigation Fund: Subsidies for drip and sprinkler irrigation systems.",
                Telugu: "[డెమో మోడ్: పథకాల అన్వేషణ]\n\nమీ ప్రొఫైల్ ఆధారంగా, మీరు వీటికి అర్హులు:\n1. పీఎం-కిసాన్ సమ్మాన్ నిధి: ఏటా ₹6,000 ఆదాయ మద్దతు (3 వాయిదాలలో).\n2. పీఎం ఫసల్ బీమా యోజన: తక్కువ ప్రీమియంతో సమగ్ర పంట భీమా (ఖరీఫ్ 2%, రబీ 1.5%).\n3. పరంపరాగత్ కృషి వికాస్ యోజన (PKVY): సేంద్రీయ వ్యవసాయం మరియు క్లస్టర్ అభివృద్ధికి మద్దతు.\n4. మైక్రో ఇరిగేషన్ ఫండ్: డ్రిప్ మరియు స్ప్రింక్లర్ సాగుకు సబ్సిడీలు."
            },
            {
                English: "[DEMO MODE: Scheme Finder]\n\nMatching Government Schemes Found:\n1. Kisan Credit Card (KCC): Access to low-interest institutional credit for farming needs.\n2. Soil Health Card Scheme: Free soil testing every 2 years with nutrient recommendations.\n3. National Mission On Agriculture Extension and Technology: Subsidies on farm machinery and seeds.\n4. PM-KMY (Kisan Maan Dhan Yojana): Pension scheme for small and marginal farmers (₹3,000/month after age 60).",
                Telugu: "[డెమో మోడ్: పథకాల అన్వేషణ]\n\nసరిపోయే ప్రభుత్వ పథకాలు:\n1. కిసాన్ క్రెడిట్ కార్డ్ (KCC): తక్కువ వడ్డీకి వ్యవసాయ రుణ సౌకర్యం.\n2. సాయిల్ హెల్త్ కార్డ్ స్కీమ్: ప్రతి 2 సంవత్సరాలకు ఉచిత నేల పరీక్ష మరియు పోషక సిఫార్సులు.\n3. నేషనల్ మిషన్ ఆన్ అగ్రికల్చర్ ఎక్స్టెన్షన్: వ్యవసాయ యంత్రాలు మరియు విత్తనాలపై సబ్సిడీలు.\n4. పీఎం-కేఎమ్‌వై (కిసాన్ మాన్ ధన్ యోజన): చిన్న మరియు ఉపాంత రైతులకు పెన్షన్ పథకం (60 ఏళ్ల తర్వాత నెలకు ₹3,000)."
            }
        ];

        const treatmentSamples = [
            {
                English: "[DEMO MODE: Treatment Advice]\n\nGeneral Scientific Treatment for Leaf Rot:\n1. Sanitation: Remove infected plant debris from the field.\n2. Fungicide: Apply Carbendazim (1g/L) or Copper Oxychloride (3g/L) spray.\n3. Moisture Control: Avoid water-logging and ensure proper drainage.\n4. Balanced Nutrients: Apply Potash to increase plant immunity.",
                Telugu: "[డెమో మోడ్: చికిత్స సలహా]\n\nఆకు కుళ్లు తెగులుకు సాధారణ శాస్త్రీయ చికిత్స:\n1. పారిశుధ్యం: పొలం నుండి సోకిన మొక్కల వ్యర్థాలను తొలగించండి.\n2. శిలీంద్ర సంహారిణి: కార్బెండజిమ్ (1 గ్రా/లీ) లేదా కాపర్ ఆక్సీక్లోరైడ్ (3 గ్రా/లీ) స్ప్రే చేయండి.\n3. తేమ నియంత్రణ: నీరు నిల్వ ఉండకుండా చూసుకోండి మరియు సరైన డ్రైనేజీని ఏర్పాటు చేయండి.\n4. సమతుల్య పోషకాలు: మొక్కల నిరోధక శక్తిని పెంచడానికి పొటాష్‌ను వాడండి."
            },
            {
                English: "[DEMO MODE: Treatment Advice]\n\nGeneral Scientific Treatment for Sucking Pests:\n1. Organic: Spray Neem Oil (5ml/L) with soap solution.\n2. Chemical: Use Imidacloprid (0.5ml/L) or Thiamethoxam if infestation is severe.\n3. Traps: Set up yellow sticky traps (10 per acre).\n4. Predators: Encourage natural enemies like ladybugs and lacewings.",
                Telugu: "[డెమో మోడ్: చికిత్స సలహా]\n\nరసం పీల్చు పురుగులకు సాధారణ శాస్త్రీయ చికిత్స:\n1. సేంద్రీయ: వేప నూనె (5మిలీ/లీ) సబ్బు ద్రావణంతో కలిపి స్ప్రే చేయండి.\n2. కెమికల్: తీవ్రత ఎక్కువగా ఉంటే ఇమిడాక్లోప్రిడ్ (0.5 మిలీ/లీ) వాడండి.\n3. ట్రాప్స్: పసుపు స్టిక్కీ ట్రాప్‌లను ఏర్పాటు చేయండి (ఎకరాకు 10).\n4. మిత్ర పురుగులు: లేడీబగ్స్ వంటి సహజ శత్రువులను ప్రోత్సహించండి."
            }
        ];

        const samples = category === 'Scheme' ? schemeSamples : treatmentSamples;
        const index = Math.floor(Date.now() / 10000) % samples.length; // Rotate every 10 seconds
        return samples[index][language] || samples[index]["English"];
    }

    try {
        // 1. Query Pinecone for relevant chunks
        const matches = await queryVectors(query, { category });
        const context = matches.map(m => m.metadata.text).join("\n\n---\n\n");

        // 2. Prepare Prompt
        const systemPromptTemplate = category === 'Scheme'
            ? prompts.SCHEME_ELIGIBILITY_PROMPT
            : prompts.RAG_TREATMENT_PROMPT;

        const systemPrompt = systemPromptTemplate.replace("{language}", language);

        const fullPrompt = `
Context Information:
${context}

User Question:
${query}

Instruction:
${systemPrompt}
`;

        // 3. Generate Answer using Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;

        return response.text();
    } catch (error) {
        console.error("RAG Service Error:", error);
        throw new Error("Failed to retrieve information");
    }
}

module.exports = { getRAGResponse };