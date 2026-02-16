import React from 'react';

const Results = ({ results }) => {
    if (!results || results.length === 0) return null;

    const anyMatch = results.some(r => !r.error && (r.score > 0));

    return (
        <div className="card full-width animate-fade-in">
            <div className="section-title">
                <span>📊</span> Analysis Results
            </div>

            <div style={{
                padding: '1rem',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '1.1rem',
                background: anyMatch ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                color: anyMatch ? '#15803d' : '#b91c1c',
                border: `1px solid ${anyMatch ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
            }}>
                {anyMatch
                    ? "Resume is matching to the job description"
                    : "No matching resumes found for the given job description."
                }
            </div>

            <div className="results-grid">
                {results.map((result, index) => {
                    if (result.error) {
                        return (
                            <div key={index} className="result-card" style={{ borderLeft: '4px solid var(--danger)', opacity: 0.8 }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{result.fileName}</h3>
                                <div style={{ color: 'var(--danger)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                    ⚠️ {result.error}
                                </div>
                            </div>
                        );
                    }

                    let statusClass = 'status-low';
                    let color = '#F59E0B'; // Amber for low match

                    if (result.score >= 75) {
                        statusClass = 'status-high';
                        color = '#22C55E'; // Green for high match
                    } else if (result.score >= 40) {
                        statusClass = 'status-medium';
                        color = '#3B82F6'; // Blue for medium match
                    }

                    return (
                        <div key={index} className={`result-card ${statusClass}`}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{result.fileName}</h3>

                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                                <span className="score-badge" style={{ color }}>{result.score}%</span>
                                <span style={{ paddingBottom: '6px', color: 'var(--text-muted)' }}>Match</span>
                            </div>

                            <div className="match-bar">
                                <div
                                    className="match-fill"
                                    style={{ width: `${result.score}%`, backgroundColor: color }}
                                ></div>
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{
                                    backgroundColor: `${color}20`,
                                    color: color,
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600
                                }}>
                                    {result.score > 0 ? "Resume is matching to the job" : "No matching resumes found"}
                                </span>
                            </div>

                            {/* Keywords Feedback */}
                            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                                {result.matchedKeywords?.length > 0 && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'block', marginBottom: '0.5rem' }}>Matched Skills/Keywords:</label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {result.matchedKeywords.map((kw, i) => (
                                                <span key={i} style={{ fontSize: '0.7rem', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', padding: '2px 8px', borderRadius: '4px' }}>{kw}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {result.missingKeywords?.length > 0 && (
                                    <div>
                                        <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Missing from Resume:</label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            {result.missingKeywords.map((kw, i) => (
                                                <span key={i} style={{ fontSize: '0.7rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px' }}>{kw}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {result.score === 0 && (
                                    <div style={{ color: 'var(--danger)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                                        No matching resumes found for the given job description.
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Results;
