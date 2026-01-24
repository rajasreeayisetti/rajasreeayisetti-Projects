import React, { useRef } from 'react';

const ResumeUpload = ({ files, setFiles }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Filter valid types first
        const incomingValidFiles = selectedFiles.filter(file =>
            file.type === "application/pdf" ||
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.type === "application/msword" ||
            file.name.toLowerCase().endsWith('.pdf') ||
            file.name.toLowerCase().endsWith('.docx')
        );

        if (incomingValidFiles.length !== selectedFiles.length) {
            alert("Only PDF and DOCX files are allowed.");
        }

        // Merge with existing files
        const newFileList = [...files, ...incomingValidFiles];

        // Ensure max 3
        if (newFileList.length > 3) {
            alert("You can only upload a maximum of 3 resumes at a time.");
            setFiles(newFileList.slice(0, 3));
        } else {
            setFiles(newFileList);
        }
    };

    const removeFile = (indexToRemove) => {
        setFiles(files.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="card">
            <div className="section-title">
                <span>📂</span> Upload Resumes ({files.length}/3)
            </div>

            <div
                className={`file-upload-area ${files.length >= 3 ? 'disabled' : ''}`}
                onClick={() => files.length < 3 && fileInputRef.current.click()}
                style={{
                    opacity: files.length >= 3 ? 0.5 : 1,
                    cursor: files.length >= 3 ? 'not-allowed' : 'pointer'
                }}
            >
                <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.doc"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    disabled={files.length >= 3}
                />
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))' }}>
                    {files.length === 0 ? "➕" : "📄"}
                </div>
                <p style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
                    {files.length === 0 ? "Upload Resumes" : "Add More"}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '300px' }}>
                    Drag and drop or click to select your PDF/DOCX files (Max 3)
                </p>
            </div>

            {files.length > 0 && (
                <div className="file-list" style={{ marginTop: '2rem' }}>
                    {files.map((file, index) => (
                        <div key={index} className="file-item animate-fade-in" style={{
                            background: '#F8FAFC',
                            border: '1px solid var(--glass-border)',
                            padding: '1rem',
                            marginBottom: '0.75rem',
                            borderRadius: '12px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--primary)',
                                    color: '#fff',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem'
                                }}>📄</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-heading)' }}>{file.name}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(1)} KB</span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;
