import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Home from './pages/Home';
import CropDoctor from './pages/CropDoctor';
import SchemeFinder from './pages/SchemeFinder';
import MarketTrends from './pages/MarketTrends';
import VoiceAssistant from './pages/VoiceAssistant';
import Chatbot from './components/Chatbot';
import './App.css';

function Navbar() {
  const { language, setLanguage } = useLanguage();

  const labels = {
    English: {
      home: "Home",
      doctor: "Crop Doctor",
      schemes: "Scheme Finder",
      market: "Market Trends",
      voice: "Voice Assistant",
      logo: "AgroTech AI"
    },
    Telugu: {
      home: "హోమ్",
      doctor: "క్రాప్ డాక్టర్",
      schemes: "పథకాల అన్వేషణ",
      market: "మార్కెట్ ధోరణులు",
      voice: "వాయిస్ అసిస్టెంట్",
      logo: "అగ్రోటెక్ AI"
    }
  };

  const t = labels[language] || labels.English;

  const navItems = [
    { path: "/", label: t.home, icon: "🏠" },
    { path: "/crop-doctor", label: t.doctor, icon: "🌱" },
    { path: "/schemes", label: t.schemes, icon: "🇮🇳" },
    { path: "/market", label: t.market, icon: "📈" },
    { path: "/voice-assistant", label: t.voice, icon: "🎙️" }
  ];

  return (
    <nav className="navbar">
      <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
        ✨ {t.logo}
      </div>
      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            end={item.path === "/"}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="lang-selector">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="lang-dropdown"
        >
          <option value="English">🌐 English</option>
          <option value="Hindi">🇮🇳 हिन्दी (Hindi)</option>
          <option value="Telugu">🇮🇳 తెలుగు (Telugu)</option>
          <option value="Tamil">🇮🇳 தமிழ் (Tamil)</option>
          <option value="Kannada">🇮🇳 ಕನ್ನಡ (Kannada)</option>
          <option value="Marathi">🇮🇳 मराठी (Marathi)</option>
          <option value="Bengali">🇮🇳 বাংলা (Bengali)</option>
          <option value="Punjabi">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
        </select>
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="bg-glow"></div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop-doctor" element={<CropDoctor />} />
          <Route path="/schemes" element={<SchemeFinder />} />
          <Route path="/market" element={<MarketTrends />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
        </Routes>
      </main>
      <Chatbot />
      <footer style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border)',
        background: 'rgba(0,0,0,0.2)',
        marginTop: '4rem'
      }}>
        <div style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>🌱 AgroTech AI</div>
        <p>© 2026 AgroTech AI - Empowering Farmers with Scientific Insights</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          <span style={{ cursor: 'pointer' }}>Contact Support</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
