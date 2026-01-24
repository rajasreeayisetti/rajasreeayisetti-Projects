import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="app-container animate-fade-in">
            <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <a href="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{
                        background: 'linear-gradient(to right, #3B82F6, #6366F1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '3.5rem',
                        marginBottom: '0.75rem',
                        fontWeight: 900,
                        letterSpacing: '-0.02em'
                    }}>
                        Resume Matcher
                    </h1>
                </a>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>AI-Powered Resume Screening Assistant</p>
            </header>
            <main className="grid-layout">
                {children}
            </main>
        </div>
    );
};

export default Layout;
