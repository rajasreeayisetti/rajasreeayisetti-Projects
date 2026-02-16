import React from 'react'

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '4rem 0', marginTop: '4rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>DriveEase</h3>
                        <p style={{ color: '#94a3b8' }}>Premium vehicle rental services for your next journey. Reliable, fast, and affordable.</p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem' }}>Support</h4>
                        <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>Help Center</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
                        <p style={{ color: '#94a3b8' }}>info@driveease.com</p>
                        <p style={{ color: '#94a3b8' }}>+1 (555) 000-0000</p>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #1e293b', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center', color: '#64748b' }}>
                    <p>&copy; {new Date().getFullYear()} DriveEase Rental System. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
