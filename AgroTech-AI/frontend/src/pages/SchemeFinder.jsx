import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function SchemeFinder() {
    const { language, speak } = useLanguage();
    const [formData, setFormData] = useState({
        state: '',
        district: '',
        landSize: '',
        cropType: '',
        farmerCategory: ''
    });
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (answer && !answer.startsWith('Error:')) {
            speak(answer);
        }
    }, [answer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const query = `I am a ${formData.farmerCategory || 'farmer'} from ${formData.district}, ${formData.state}. I have ${formData.landSize} of land and grow ${formData.cropType}. What government schemes am I eligible for?`;

        setLoading(true);
        setAnswer('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/schemes/search`, {
                query,
                language,
                location: { state: formData.state, district: formData.district },
                landSize: formData.landSize,
                cropType: formData.cropType
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error finding schemes:', error);
            setAnswer('Error: Could not retrieve scheme information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];

    const farmerCategories = ['Small Farmer', 'Marginal Farmer', 'Medium Farmer', 'Large Farmer', 'Tenant Farmer', 'Landless Farmer'];

    const translations = {
        English: {
            title: "Scheme Finder",
            desc: "Find government agricultural schemes based on your location, land size, and crop type.",
            state: "State",
            district: "District/City",
            landSize: "Land Size (in acres/hectares)",
            cropType: "Primary Crop Type",
            category: "Farmer Category",
            btn: "Find Eligible Schemes",
            loading: "Analyzing eligibility criteria...",
            result: "Eligible Schemes & Benefits",
            selectState: "Select your state",
            selectCategory: "Select category"
        },
        Telugu: {
            title: "పథకాల అన్వేషణ",
            desc: "మీ ప్రాంతం, భూమి పరిమాణం మరియు పంట రకం ఆధారంగా ప్రభుత్వ వ్యవసాయ పథకాలను కనుగొనండి.",
            state: "రాష్ట్రం",
            district: "జిల్లా/నగరం",
            landSize: "భూమి పరిమాణం (ఎకరాలు/హెక్టార్లు)",
            cropType: "ప్రధాన పంట రకం",
            category: "రైతు వర్గం",
            btn: "అర్హత ఉన్న పథకాలను కనుగొనండి",
            loading: "అర్హత ప్రమాణాలను విశ్లేషిస్తున్నాము...",
            result: "అర్హత ఉన్న పథకాలు & ప్రయోజనాలు",
            selectState: "మీ రాష్ట్రాన్ని ఎంచుకోండి",
            selectCategory: "వర్గాన్ని ఎంచుకోండి"
        },
        Hindi: {
            title: "योजना खोजक",
            desc: "अपने स्थान, भूमि के आकार और फसल के प्रकार के आधार पर सरकारी कृषि योजनाएं खोजें।",
            state: "राज्य",
            district: "जिला/शहर",
            landSize: "भूमि का आकार (एकड़/हेक्टेयर में)",
            cropType: "प्राथमिक फसल प्रकार",
            category: "किसान श्रेणी",
            btn: "पात्र योजनाएं खोजें",
            loading: "पात्रता मानदंडों का विश्लेषण कर रहे हैं...",
            result: "पात्र योजनाएं और लाभ",
            selectState: "अपना राज्य चुनें",
            selectCategory: "श्रेणी चुनें"
        }
    };

    const t = translations[language] || translations.English;

    return (
        <div className="fade-in">
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1>{t.title}</h1>
                    <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(16, 163, 127, 0.1)', color: 'var(--primary)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>LOCATION-BASED</span>
                </div>
                <p style={{ color: 'var(--text-muted)' }}>{t.desc}</p>
            </header>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.state} *</label>
                            <select
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                required
                                style={{ width: '100%' }}
                            >
                                <option value="">{t.selectState}</option>
                                {indianStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.district} *</label>
                            <input
                                type="text"
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                placeholder={language === 'Telugu' ? "ఉదా: విశాఖపట్నం" : "e.g. Visakhapatnam"}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.category} *</label>
                            <select
                                value={formData.farmerCategory}
                                onChange={(e) => setFormData({ ...formData, farmerCategory: e.target.value })}
                                required
                                style={{ width: '100%' }}
                            >
                                <option value="">{t.selectCategory}</option>
                                {farmerCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.landSize}</label>
                            <input
                                type="text"
                                value={formData.landSize}
                                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                                placeholder={language === 'Telugu' ? "ఉదా: 2 ఎకరాలు" : "e.g. 2 acres"}
                            />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.cropType}</label>
                            <input
                                type="text"
                                value={formData.cropType}
                                onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                                placeholder={language === 'Telugu' ? "ఉదా: వరి, పత్తి" : "e.g. Rice, Cotton"}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} style={{ width: '100%' }}>
                        {loading ? '...' : t.btn}
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
                    <p>{t.loading}</p>
                </div>
            ) : answer && (
                <div className="card fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0 }}>{t.result}</h3>
                        <button
                            onClick={() => speak(answer)}
                            style={{ padding: '0.4rem', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            🔊
                        </button>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text)', marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                        {answer}
                    </div>
                </div>
            )}

            <style>{`
                .spinner {
                    width: 32px;
                    height: 32px;
                    border: 4px solid rgba(255,255,255,0.1);
                    border-top: 4px solid var(--primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}