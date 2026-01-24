import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function VoiceAssistant() {
    const { language, speak } = useLanguage();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = language === 'Telugu' ? 'te-IN' : 'en-US';
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            handleVoiceAction(text);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    const handleVoiceAction = async (text) => {
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/voice/process`, {
                text,
                language
            });
            const aiResponse = res.data.response;
            setResponse(aiResponse);
            speak(aiResponse);
        } catch (error) {
            console.error('Voice processing error:', error);
            setResponse('Error: Could not process voice input.');
        } finally {
            setLoading(false);
        }
    };

    const translations = {
        English: {
            title: "Voice Assistant",
            desc: "Ask anything about farming. I can help with diagnosis, schemes, or just general advice.",
            tapToSpeak: "Tap to Speak",
            listening: "I'm listening...",
            heard: "Heard:",
            aiResponse: "AI Response:",
            placeholder: "Responses will appear here..."
        },
        Telugu: {
            title: "వాయిస్ అసిస్టెంట్",
            desc: "వ్యవసాయం గురించి ఏదైనా అడగండి. వ్యాధి నిర్ధారణ, పథకాలు లేదా సాధారణ సలహాలతో నేను మీకు సహాయం చేయగలను.",
            tapToSpeak: "మాట్లాడటానికి నొక్కండి",
            listening: "నేను వింటున్నాను...",
            heard: "విన్నాను:",
            aiResponse: "AI సమాధానం:",
            placeholder: "సమాధానాలు ఇక్కడ కనిపిస్తాయి..."
        },
        Hindi: {
            title: "वॉयस असिस्टेंट",
            desc: "खेती के बारे में कुछ भी पूछें। मैं निदान, योजनाओं या सामान्य सलाह में मदद कर सकता हूँ।",
            tapToSpeak: "बोलने के लिए टैप करें",
            listening: "मैं सुन रहा हूँ...",
            heard: "सुना गया:",
            aiResponse: "AI उत्तर:",
            placeholder: "उत्तर यहाँ दिखाई देंगे..."
        }
    };

    const t = translations[language] || translations.English;

    return (
        <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.title}</h1>
                <p style={{ color: 'var(--text-muted)' }}>{t.desc}</p>
            </header>

            <div style={{ marginBottom: '4rem' }}>
                <button
                    onClick={startListening}
                    disabled={isListening || loading}
                    style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: isListening ? 'var(--accent)' : 'var(--gradient-main)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        boxShadow: isListening ? '0 0 30px rgba(245, 158, 11, 0.5)' : '0 10px 30px rgba(16, 163, 127, 0.3)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <span style={{ fontSize: '3rem' }}>{isListening ? '🛑' : '🎙️'}</span>
                </button>
                <p style={{ marginTop: '1.5rem', fontWeight: 600, color: isListening ? 'var(--accent)' : 'var(--primary)' }}>
                    {isListening ? t.listening : t.tapToSpeak}
                </p>
            </div>

            {transcript && (
                <div className="card" style={{ marginBottom: '2rem', textAlign: 'left', borderLeft: '4px solid var(--primary)' }}>
                    <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t.heard}</h4>
                    <p style={{ fontSize: '1.2rem' }}>"{transcript}"</p>
                </div>
            )}

            <div className="card" style={{ textAlign: 'left', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>{t.aiResponse}</h3>
                    {response && (
                        <button
                            onClick={() => speak(response)}
                            style={{ padding: '0.4rem', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            🔊
                        </button>
                    )}
                </div>

                {loading ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="spinner"></div>
                    </div>
                ) : response ? (
                    <div className="fade-in" style={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        {response}
                    </div>
                ) : (
                    <div style={{ flex: 1, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p>{t.placeholder}</p>
                    </div>
                )}
            </div>

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
