import React from 'react';

const JobDescription = ({ value, onChange }) => {
    return (
        <div className="card">
            <div className="section-title">
                <span>📄</span> Job Description
            </div>
            <div className="form-group">
                <label>Paste the job description here</label>
                <textarea
                    placeholder="e.g. We are looking for a Senior React Developer with 5+ years of experience..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default JobDescription;
