import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import { UserPlus, Mail, Phone, MapPin, Lock } from 'lucide-react'

const RegisterCustomer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/customers', formData)
            alert('Registration successful! Please login.')
            navigate('/login')
        } catch (error) {
            alert('Registration failed: ' + error.response?.data?.message)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 0' }}>
            <div style={{ width: '100%', maxWidth: '500px', padding: '3rem', background: 'white', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '60px', height: '60px', background: '#eff6ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <UserPlus color="#2563eb" size={30} />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b' }}>Join DriveEase</h2>
                    <p style={{ color: '#64748b' }}>Create an account to start your journey today.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <input type="text" className="input" placeholder="John Doe" required style={{ paddingLeft: '2.5rem' }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <UserPlus size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <input type="email" className="input" placeholder="john@example.com" required style={{ paddingLeft: '2.5rem' }} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="label">Phone</label>
                            <div style={{ position: 'relative' }}>
                                <input type="text" className="input" placeholder="+1..." required style={{ paddingLeft: '2.5rem' }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input type="password" className="input" placeholder="••••••••" required style={{ paddingLeft: '2.5rem' }} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label">Address</label>
                        <div style={{ position: 'relative' }}>
                            <input type="text" className="input" placeholder="123 Street, City" style={{ paddingLeft: '2.5rem' }} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                            <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem', fontSize: '1.1rem' }}>
                        Create Account
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: '#64748b' }}>
                    Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterCustomer
