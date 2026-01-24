import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function Chatbot() {
    const { language, speak } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const getInitialGreeting = () => {
        if (language === 'Telugu') return 'నమస్కారం! నేను అగ్రోటెక్ AIని. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?';
        if (language === 'Hindi') return 'नमस्ते! मैं एग्रोटेक AI हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?';
        return 'Hello! I am AgroTech AI. How can I help you today?';
    };

    const [messages, setMessages] = useState([
        { role: 'model', text: getInitialGreeting() }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getGreeting = () => {
        if (language === 'Telugu') return 'నమస్కారం! నేను అగ్రోటెక్ AIని. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?';
        if (language === 'Hindi') return 'नमस्ते! मैं एग्रोटेक AI हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?';
        return 'Hello! I am AgroTech AI. How can I help you today?';
    };

    useEffect(() => {
        if (messages.length === 1 && (messages[0].role === 'model')) {
            setMessages([{ role: 'model', text: getGreeting() }]);
        }
    }, [language]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
                message: userMsg,
                language: language
            });

            const botMsg = response.data.response;
            setMessages(prev => [...prev, { role: 'model', text: botMsg }]);
            speak(botMsg);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'Error: Could not connect to the chat assistant.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-wrapper" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            {isOpen ? (
                <div className="chat-container card fade-in" style={{ width: '350px', height: '500px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                    <div className="chat-header" style={{ padding: '1rem', background: 'var(--gradient-main)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600 }}>🌱 AgroTech AI Assistant</span>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', padding: '0.2rem', minWidth: 'auto', border: 'none' }}>✖</button>
                    </div>

                    <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {messages.map((m, i) => (
                            <div key={i} style={{
                                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                background: m.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: 'white',
                                padding: '0.6rem 1rem',
                                borderRadius: m.role === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                                maxWidth: '85%',
                                fontSize: '0.9rem',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                {m.text}
                            </div>
                        ))}
                        {loading && (
                            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1rem', borderRadius: '18px 18px 18px 2px' }}>
                                <div className="typing-dots"><span>.</span><span>.</span><span>.</span></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={language === 'Telugu' ? "మీ ప్రశ్నను ఇక్కడ అడగండి..." : (language === 'Hindi' ? "अपना प्रश्न यहाँ पूछें..." : "Type your question...")}
                            style={{ flex: 1, padding: '0.5rem' }}
                        />
                        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', minWidth: 'auto' }}>
                            ➤
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="chat-toggle"
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '30px',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(16, 163, 127, 0.4)'
                    }}
                >
                    💬
                </button>
            )}

            <style>{`
                .typing-dots { display: flex; gap: 4px; }
                .typing-dots span { 
                    animation: blink 1.4s infinite both; 
                    font-weight: bold;
                    font-size: 20px;
                    line-height: 10px;
                }
                .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
                .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes blink {
                    0% { opacity: 0.2; }
                    20% { opacity: 1; }
                    100% { opacity: 0.2; }
                }
            `}</style>
        </div>
    );
}
