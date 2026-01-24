import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function MarketTrends() {
    const { language, speak } = useLanguage();
    const [crop, setCrop] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    // Speak summary when it changes
    useEffect(() => {
        if (summary && !summary.startsWith('Error:')) {
            speak(summary);
        }
    }, [summary]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!crop.trim()) return;

        setLoading(true);
        setSummary('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/market/summary`, {
                crop,
                language
            });
            setSummary(response.data.summary);
        } catch (error) {
            console.error('Error fetching trends:', error);
            setSummary('Error: Could not retrieve market data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const commonCrops = language === 'Telugu'
        ? ['టమోటా', 'బంగాళాదుంప', 'గోధుమ', 'వరి', 'ఉల్లిపాయ', 'పత్తి']
        : ['Tomato', 'Potato', 'Wheat', 'Rice', 'Onion', 'Cotton'];

    const translations = {
        English: {
            title: "Market Trends",
            desc: "Get AI-powered summaries of current market prices and trade news for your crops.",
            searchTitle: "Search by Crop",
            placeholder: "Enter crop name (e.g. Wheat)",
            btn: "Get Trends",
            loading: "Fetching latest market news...",
            insight: "Market Insight"
        },
        Telugu: {
            title: "మార్కెట్ ధోరణులు",
            desc: "మీ పంటల కోసం ప్రస్తుత మార్కెట్ ధరలు మరియు వాణిజ్య వార్తల యొక్క AI-ఆధారిత సారాంశాలను పొందండి.",
            searchTitle: "పంట ద్వారా శోధించండి",
            placeholder: "పంట పేరును నమోదు చేయండి (ఉదా: వరి)",
            btn: "ధోరణులు పొందండి",
            loading: "తాజా మార్కెట్ వార్తలను సేకరిస్తున్నాము...",
            insight: "మార్కెట్ అంతర్దృష్టి"
        },
        Hindi: {
            title: "बाजार रुझान",
            desc: "अपनी फसलों के लिए वर्तमान बाजार कीमतों और व्यापार समाचारों का AI-संचालित सारांश प्राप्त करें।",
            searchTitle: "फसल द्वारा खोजें",
            placeholder: "फसल का नाम दर्ज करें (जैसे गेहूं)",
            btn: "रुझान प्राप्त करें",
            loading: "नवीनतम बाजार समाचार प्राप्त कर रहे हैं...",
            insight: "बाजार अंतर्दृष्टि"
        }
    };

    const t = translations[language] || translations.English;

    return (
        <div className="fade-in">
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1>{t.title}</h1>
                    <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(16, 163, 127, 0.1)', color: 'var(--primary)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>VOICE ASSISTANT ON</span>
                </div>
                <p style={{ color: 'var(--text-muted)' }}>{t.desc}</p>
            </header>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3>{t.searchTitle}</h3>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder={t.placeholder}
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <button type="submit" disabled={loading} style={{ minWidth: '150px' }}>
                            {loading ? '...' : t.btn}
                        </button>
                    </div>
                </form>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {commonCrops.map(c => (
                        <span
                            key={c}
                            onClick={() => setCrop(c)}
                            style={{
                                padding: '0.4rem 1rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                border: '1px solid var(--border)',
                                fontSize: '0.9rem'
                            }}
                        >
                            {c}
                        </span>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
                    <p>{t.loading}</p>
                </div>
            ) : summary && (
                <div className="card fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>{t.insight}: {crop}</h3>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>LIVE UPDATES</span>
                            <button
                                onClick={() => speak(summary)}
                                style={{ padding: '0.4rem', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                🔊
                            </button>
                        </div>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text)', borderLeft: '4px solid var(--primary)', paddingLeft: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.1)', borderRadius: '0 12px 12px 0' }}>
                        {summary}
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