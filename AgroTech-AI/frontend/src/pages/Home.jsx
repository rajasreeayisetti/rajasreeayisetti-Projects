import { useLanguage } from '../context/LanguageContext';
import { NavLink } from 'react-router-dom';

export default function Home() {
    const { language } = useLanguage();

    const translations = {
        English: {
            heroTitle: "AgroTech AI",
            heroDesc: "The future of agriculture is here. Harness the power of scientific AI to diagnose crop health, find tailored government schemes, and monitor global market trends in real-time.",
            getStarted: "Get Started",
            features: "Our Scientific Core",
            voiceTitle: "Multilingual AI Assistant",
            voiceDesc: "Speak to AgroTech AI in any major Indian language. Our advanced voice recognition makes scientific farming advice accessible even without a keypad.",
            whyTitle: "Why AgroTech AI?",
            stat1: "98% Accuracy",
            stat2: "Live Data",
            stat3: "Free Access"
        },
        Telugu: {
            heroTitle: "ఒక్క స్నాప్‌తో ప్రారంభమయ్యే శాస్త్రీయ వ్యవసాయం",
            heroDesc: "వ్యవసాయం భవిష్యత్తు ఇక్కడే ఉంది. పంట ఆరోగ్యాన్ని నిర్ధారించడానికి, తగిన ప్రభుత్వ పథకాలను కనుగొనడానికి మరియు ప్రపంచ మార్కెట్ ధోరణులను పర్యవేక్షించడానికి AI శక్తిని ఉపయోగించండి.",
            getStarted: "క్రాప్ డాక్టర్ ప్రారంభించండి",
            features: "మా శాస్త్రీయ విభాగాలు",
            voiceTitle: "బహుభాషా AI అసిస్టెంట్",
            voiceDesc: "ఏదైనా ప్రధాన భారతీయ భాషలో అగ్రోటెక్ AI తో మాట్లాడండి. మా వాయిస్ రికగ్నిషన్ టెక్నాలజీ శాస్త్రీయ సలహాలను అందరికీ అందుబాటులోకి తెస్తుంది.",
            whyTitle: "ఎందుకు అగ్రోటెక్ AI?",
            stat1: "98% ఖచ్చితత్వం",
            stat2: "లైవ్ డేటా",
            stat3: "ఉచిత సేవ"
        },
        Hindi: {
            heroTitle: "AgroTech AI: एक क्लिक में वैज्ञानिक खेती",
            heroDesc: "खेती का भविष्य यहाँ है। फसल के स्वास्थ्य का निदान करने, उपयुक्त सरकारी योजनाएं खोजने और वास्तविक समय में वैश्विक बाजार रुझानों की निगरानी करने के लिए वैज्ञानिक AI की शक्ति का उपयोग करें।",
            getStarted: "शुरू करें",
            features: "हमारे वैज्ञानिक कोर",
            voiceTitle: "बहुभाषी AI सहायक",
            voiceDesc: "किसी भी प्रमुख भारतीय भाषा में एग्रोटेक AI से बात करें। हमारी उन्नत आवाज पहचान वैज्ञानिक खेती की सलाह को बिना कीपैड के भी सुलभ बनाती है।",
            whyTitle: "एग्रोटेक AI क्यों?",
            stat1: "98% सटीकता",
            stat2: "लाइव डेटा",
            stat3: "मुफ्त पहुंच"
        }
    };

    const t = translations[language] || translations.English;

    const getLabel = (en, te, hi) => {
        if (language === 'Telugu') return te;
        if (language === 'Hindi') return hi;
        return en;
    };

    const cards = [
        { title: getLabel("Crop Doctor", "క్రాప్ డాక్టర్", "क्रॉप डॉक्टर"), desc: getLabel("Snap a photo for instant diagnosis and treatment plans.", "తక్షణ వ్యాధి నిర్ధారణ మరియు చికిత్స ప్రణాళిక.", "तत्काल निदान और उपचार के लिए एक फोटो लें।"), link: "/crop-doctor", icon: "🌱", accent: "#10b981" },
        { title: getLabel("Scheme Finder", "పథకాల అన్వేషణ", "योजना खोजक"), desc: getLabel("Find government schemes tailored to your land and crops.", "మీ అర్హతకు సరిపోయే ప్రభుత్వ పథకాలు.", "अपनी भूमि और फसलों के अनुसार सरकारी योजनाएं खोजें।"), link: "/schemes", icon: "🇮🇳", accent: "#6366f1" },
        { title: getLabel("Market Trends", "మార్కెట్ ధోరణులు", "बाजार रुझान"), desc: getLabel("Get live mandi prices and predictive trade analysis.", "ప్రస్తుత మార్కెట్ ధరలు మరియు విశ్లేషణ.", "मंडी की लाइव कीमतें और व्यापार विश्लेषण प्राप्त करें।"), link: "/market", icon: "📈", accent: "#f59e0b" },
        { title: getLabel("Voice Assistant", "వాయిస్ అసిస్టెంట్", "वॉयस असिस्टेंट"), desc: getLabel("Hands-free AI assistance for busy field workers.", "ప్రశ్నలను అడగండి మరియు సమాధానాలను వినండి.", "व्यस्त किसानों के लिए हैंड्स-फ्री AI सहायता।"), link: "/voice-assistant", icon: "🎙️", accent: "#ec4899" }
    ];

    return (
        <div className="fade-in">
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '6rem 1rem 8rem',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '300px',
                    background: 'var(--primary)',
                    filter: 'blur(150px)',
                    opacity: 0.15,
                    zIndex: -1
                }}></div>
                <h1 style={{
                    fontSize: '4.5rem',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                    background: 'var(--gradient-main)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    maxWidth: '900px',
                    margin: '0 auto 1.5rem'
                }}>
                    {t.heroTitle}
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    color: 'var(--text-muted)',
                    maxWidth: '700px',
                    margin: '0 auto 3rem',
                    lineHeight: 1.6
                }}>
                    {t.heroDesc}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <NavLink to="/crop-doctor" className="btn-hero" style={{
                        textDecoration: 'none',
                        padding: '1.2rem 2.5rem',
                        borderRadius: '100px',
                        background: 'var(--gradient-main)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 30px var(--primary-glow)',
                        transition: 'all 0.3s ease'
                    }}>
                        {t.getStarted}
                    </NavLink>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '6rem',
                marginBottom: '8rem',
                padding: '2rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>{t.stat1}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Scientific Accuracy</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--secondary)' }}>{t.stat2}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Satellite Updates</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)' }}>{t.stat3}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Government Schemes</div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '4rem 1rem 8rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>{t.features}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {cards.map((card, i) => (
                        <NavLink key={i} to={card.link} className="card feature-card" style={{
                            textDecoration: 'none',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            <div style={{
                                fontSize: '3.5rem',
                                marginBottom: '1.5rem',
                                background: `rgba(${parseInt(card.accent.slice(1, 3), 16)}, ${parseInt(card.accent.slice(3, 5), 16)}, ${parseInt(card.accent.slice(5, 7), 16)}, 0.1)`,
                                width: '80px',
                                height: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '20px',
                                color: card.accent
                            }}>
                                {card.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{card.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{card.desc}</p>
                            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: card.accent, fontWeight: 600 }}>
                                Explore Feature →
                            </div>
                        </NavLink>
                    ))}
                </div>
            </section>

            {/* Voice Section */}
            <section style={{
                background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
                borderRadius: '40px',
                padding: '6rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4rem',
                margin: '4rem 0',
                border: '1px solid var(--border)'
            }}>
                <div style={{ flex: 1.2 }}>
                    <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>
                        LIVE VOICE AI
                    </div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{t.voiceTitle}</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '3rem' }}>
                        {t.voiceDesc}
                    </p>
                    <NavLink to="/voice-assistant" className="btn-secondary" style={{
                        textDecoration: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '100px',
                        background: 'white',
                        color: 'black',
                        fontWeight: 700
                    }}>
                        Try Voice Companion 🎙️
                    </NavLink>
                </div>
                <div style={{ flex: 0.8, textAlign: 'center', position: 'relative' }}>
                    <div className="voice-visualizer">
                        <div style={{ fontSize: '10rem', filter: 'drop-shadow(0 0 50px var(--primary))' }}>🎙️</div>
                        {/* Orbiting circles */}
                        <div className="orbit orbit-1"></div>
                        <div className="orbit orbit-2"></div>
                    </div>
                </div>
            </section>

            <style>{`
                .btn-hero:hover {
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 12px 40px var(--primary-glow);
                }
                .feature-card:hover h3 {
                    color: var(--primary);
                }
                .voice-visualizer {
                    position: relative;
                    display: inline-block;
                }
                .orbit {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border: 2px solid var(--border);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                }
                .orbit-1 { width: 300px; height: 300px; border-color: rgba(16, 185, 129, 0.1); animation: rotate 20s linear infinite; }
                .orbit-2 { width: 450px; height: 450px; border-color: rgba(99, 102, 241, 0.1); animation: rotate 30s linear infinite reverse; }
                
                @keyframes rotate {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                .card {
                    overflow: visible;
                }
                .card:hover {
                    border-color: rgba(255,255,255,0.2) !important;
                }
            `}</style>
        </div>
    );
}
