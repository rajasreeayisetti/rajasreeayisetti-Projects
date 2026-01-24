import React, { useState } from 'react';
import Layout from '../components/Layout';
import JobDescription from '../components/JobDescription';
import ResumeUpload from '../components/ResumeUpload';
import Results from '../components/Results';
import { uploadResumes } from '../services/api';

const Home = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        // Validation
        if (!jobDescription.trim()) {
            alert('Please enter a job description.');
            return;
        }
        if (files.length === 0) {
            alert('Please upload at least one resume.');
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const formData = new FormData();
            formData.append('jobDescription', jobDescription);
            files.forEach((file) => {
                formData.append('resumes', file);
            });

            const response = await uploadResumes(formData);
            setResults(response.data.results);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.error
                ? `Server Error: ${err.response.data.error}`
                : err.response?.data?.message || err.message || 'Failed to process resumes.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            {/* Left Column: Resume Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <ResumeUpload files={files} setFiles={setFiles} />
            </div>

            {/* Right Column: Job Description & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <JobDescription value={jobDescription} onChange={setJobDescription} />

                <button
                    className="btn-primary"
                    onClick={handleAnalyze}
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Analyze Resumes'}
                </button>

                {error && (
                    <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                        {error}
                    </div>
                )}
            </div>

            <div className="full-width">
                <Results results={results} />
            </div>
        </Layout>
    );
};

export default Home;
