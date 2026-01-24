import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function CropDoctor() {
    const { language, speak } = useLanguage();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (diagnosis && !diagnosis.startsWith('Error:')) {
            speak(diagnosis);
        }
    }, [diagnosis]);

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
            const transcript = event.results[0][0].transcript;
            handleVoiceSubmit(transcript);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    const handleVoiceSubmit = async (text) => {
        setLoading(true);
        setDiagnosis('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/voice/process`, {
                text,
                language
            });
            setDiagnosis(response.data.response);
        } catch (error) {
            console.error('Voice processing error:', error);
            setDiagnosis('Error: Could not process voice input.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setDiagnosis(''); // Clear previous diagnosis
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setLoading(true);
        setDiagnosis('');
        setUploadProgress(0);
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('language', language);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/diagnose`, formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                }
            });
            setDiagnosis(response.data.diagnosis);
        } catch (error) {
            console.error('Error identifying crop:', error);
            const errorMsg = error.response?.data?.error || 'Could not reach the AI expert. Please try again.';
            setDiagnosis(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    const clearImage = () => {
        setSelectedFile(null);
        setPreview(null);
        setDiagnosis('');
    };

    const translations = {
        English: {
            title: "Crop Doctor",
            desc: "Upload a clear photo of your crop to get instant AI-powered diagnosis and treatment recommendations.",
            upload: "Upload Crop Image",
            drop: "Click or drag to upload",
            btn: "Diagnose Plant",
            speak: "Speak Problem",
            result: "Diagnosis Result",
            empty: "Upload an image to see detailed diagnosis and treatment plan here.",
            loading: "Analyzing image with AI...",
            guidelines: "Photo Guidelines",
            tip1: "✓ Take photo in good natural light",
            tip2: "✓ Focus on affected leaves/parts",
            tip3: "✓ Avoid blurry or dark images",
            tip4: "✓ Include multiple angles if possible",
            clear: "Clear & Upload New",
            confidence: "AI Confidence"
        },
        Telugu: {
            title: "క్రాప్ డాక్టర్",
            desc: "తక్షణ AI-ఆధారిత నిర్ధారణ మరియు చికిత్స సిఫార్సుల కోసం మీ పంట యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.",
            upload: "పంట చిత్రం అప్‌లోడ్ చేయండి",
            drop: "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
            btn: "మొక్కను పరీక్షించండి",
            speak: "సమస్యను చెప్పండి",
            result: "పరీక్ష ఫలితం",
            empty: "వివరణాత్మక నిర్ధారణ మరియు చికిత్స ప్రణాళికను చూడటానికి చిత్రాన్ని అప్‌లోడ్ చేయండి.",
            loading: "AI తో చిత్రాన్ని విశ్లేషిస్తున్నాము...",
            guidelines: "ఫోటో మార్గదర్శకాలు",
            tip1: "✓ మంచి సహజ వెలుతురులో ఫోటో తీయండి",
            tip2: "✓ ప్రభావిత ఆకులు/భాగాలపై దృష్టి పెట్టండి",
            tip3: "✓ అస్పష్టమైన లేదా చీకటి చిత్రాలను నివారించండి",
            tip4: "✓ వీలైతే బహుళ కోణాలను చేర్చండి",
            clear: "క్లియర్ & కొత్తది అప్‌లోడ్ చేయండి",
            confidence: "AI విశ్వాసం"
        },
        Hindi: {
            title: "क्रॉप डॉक्टर",
            desc: "तत्काल AI-संचालित निदान और उपचार अनुशंसाओं के लिए अपनी फसल की एक स्पष्ट फोटो अपलोड करें।",
            upload: "फसल की छवि अपलोड करें",
            drop: "अपलोड करने के लिए क्लिक करें",
            btn: "पौधे का निदान करें",
            speak: "समस्या बताएं",
            result: "निदान परिणाम",
            empty: "विस्तृत निदान और उपचार योजना देखने के लिए एक छवि अपलोड करें।",
            loading: "AI के साथ छवि का विश्लेषण कर रहे हैं...",
            guidelines: "फोटो मार्गदर्शिका",
            tip1: "✓ अच्छी प्राकृतिक रोशनी में फोटो लें",
            tip2: "✓ प्रभावित पत्तियों/हिस्सों पर ध्यान दें",
            tip3: "✓ धुंधली या अंधेरी छवियों से बचें",
            tip4: "✓ यदि संभव हो तो कई कोण शामिल करें",
            clear: "साफ़ करें और नया अपलोड करें",
            confidence: "AI विश्वास"
        }
    };

    const t = translations[language] || translations.English;

    return (
        <div className="fade-in">
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h1>{t.title}</h1>
                    <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(16, 163, 127, 0.1)', color: 'var(--primary)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>AI-POWERED</span>
                </div>
                <p style={{ color: 'var(--text-muted)' }}>{t.desc}</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <h3>{t.upload}</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{
                                border: preview ? '2px solid var(--primary)' : '2px dashed var(--border)',
                                borderRadius: '12px',
                                padding: '2rem',
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                                cursor: 'pointer',
                                position: 'relative',
                                background: preview ? 'rgba(16, 163, 127, 0.05)' : 'transparent',
                                transition: 'all 0.3s ease'
                            }}
                                onClick={() => !preview && document.getElementById('fileInput').click()}
                            >
                                {preview ? (
                                    <div style={{ position: 'relative' }}>
                                        <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: '8px', maxHeight: '300px' }} />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); clearImage(); }}
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: 'rgba(15, 23, 42, 0.9)',
                                                padding: '0.5rem',
                                                borderRadius: '50%',
                                                minWidth: 'auto',
                                                width: '36px',
                                                height: '36px'
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ color: 'var(--text-muted)' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
                                        <p>{t.drop}</p>
                                        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Max 5MB • JPG, PNG</p>
                                    </div>
                                )}
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            {loading && uploadProgress > 0 && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                                        <div style={{
                                            background: 'var(--primary)',
                                            height: '100%',
                                            width: `${uploadProgress}%`,
                                            transition: 'width 0.3s ease'
                                        }}></div>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                                        {uploadProgress}% uploaded
                                    </p>
                                </div>
                            )}

                            <button type="submit" disabled={!selectedFile || loading} style={{ width: '100%', marginBottom: '1rem' }}>
                                {loading ? t.loading : t.btn}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>OR</p>
                            <button
                                onClick={startListening}
                                disabled={loading || isListening}
                                style={{
                                    background: isListening ? 'var(--accent)' : 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isListening ? '🛑 Listening...' : `🎤 ${t.speak}`}
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ background: 'rgba(16, 163, 127, 0.05)', borderColor: 'var(--primary)' }}>
                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            💡 {t.guidelines}
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                            <li>{t.tip1}</li>
                            <li>{t.tip2}</li>
                            <li>{t.tip3}</li>
                            <li>{t.tip4}</li>
                        </ul>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>{t.result}</h3>
                        {diagnosis && !diagnosis.startsWith('Error:') && (
                            <button
                                onClick={() => speak(diagnosis)}
                                style={{ padding: '0.4rem', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                title="Replay Voice"
                            >
                                🔊
                            </button>
                        )}
                    </div>
                    {loading ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                            <div className="spinner"></div>
                            <p>{t.loading}</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <div className="pulse-dot" style={{ animationDelay: '0s' }}></div>
                                <div className="pulse-dot" style={{ animationDelay: '0.2s' }}></div>
                                <div className="pulse-dot" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    ) : diagnosis ? (
                        <div className="fade-in" style={{ whiteSpace: 'pre-wrap', color: 'var(--text)', flex: 1, padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                            {diagnosis}
                        </div>
                    ) : (
                        <div style={{ flex: 1, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ fontSize: '4rem', opacity: 0.3 }}>🔬</div>
                            <p>{t.empty}</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .spinner {
                    width: 48px;
                    height: 48px;
                    border: 4px solid rgba(255,255,255,0.1);
                    border-top: 4px solid var(--primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    background: var(--primary);
                    border-radius: 50%;
                    animation: pulse 1.5s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
}