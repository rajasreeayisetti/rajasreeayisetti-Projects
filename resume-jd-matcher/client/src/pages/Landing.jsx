import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)'
        }}>
            <div className="landing-hero">
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(to right, #3B82F6, #6366F1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                }}>
                    Resume Matcher AI
                </h1>

                <p style={{
                    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                    color: 'var(--text-color)',
                    maxWidth: '700px',
                    margin: '0 auto 3.5rem',
                    lineHeight: '1.7',
                    fontWeight: 500,
                    opacity: 0.9
                }}>
                    The intelligent way to match careers. Analyze resumes against job descriptions
                    with forensic precision using our NLP-powered matching engine.
                </p>

                <button
                    className="btn-primary"
                    style={{
                        maxWidth: '300px',
                        fontSize: '1.25rem',
                        padding: '1.2rem 3rem',
                        borderRadius: '50px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        justifyContent: 'center',
                        fontWeight: 700
                    }}
                    onClick={() => navigate('/analyze')}
                >
                    Get Started <span>🚀</span>
                </button>
            </div>

            <div style={{
                marginTop: '6rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                width: '100%',
                maxWidth: '1000px'
            }}>
                <div className="card">
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📄</div>
                    <h3 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Smart Extraction</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>Supporting PDF and DOCX formats with high-fidelity text parsing.</p>
                </div>
                <div className="card">
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                    <h3 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Keyword Matching</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>Advanced algorithm that identifies core skills and industry relevance.</p>
                </div>
                <div className="card">
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
                    <h3 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Instant Insights</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>Visual grading system (Good/Average/Poor) for rapid screening.</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
