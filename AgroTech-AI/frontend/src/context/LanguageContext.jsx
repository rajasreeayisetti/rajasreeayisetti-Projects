import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('agrotech_lang') || 'English');

    useEffect(() => {
        localStorage.setItem('agrotech_lang', language);
    }, [language]);

    const speak = (text) => {
        if (!window.speechSynthesis) return;

        // Stop any current speaking
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to match voice with language
        const voices = window.speechSynthesis.getVoices();
        if (language === 'Telugu') {
            utterance.lang = 'te-IN';
            const teluguVoice = voices.find(v => v.lang.includes('te'));
            if (teluguVoice) utterance.voice = teluguVoice;
        } else if (language === 'Hindi') {
            utterance.lang = 'hi-IN';
            const hindiVoice = voices.find(v => v.lang.includes('hi'));
            if (hindiVoice) utterance.voice = hindiVoice;
        } else {
            utterance.lang = 'en-US';
            const englishVoice = voices.find(v => v.lang.includes('en'));
            if (englishVoice) utterance.voice = englishVoice;
        }

        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, speak }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
