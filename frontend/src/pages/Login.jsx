import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // Clear stale data on mount to fix "Cast to ObjectId" issues from failed mock attempts
    React.useEffect(() => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('Attempting login for:', email)
        try {
            const { data } = await api.post('/customers/login', { email, password })
            console.log('Login successful:', data.name)
            localStorage.setItem('userInfo', JSON.stringify(data))
            localStorage.setItem('token', data.token)
            window.location.href = '/dashboard'
        } catch (error) {
            console.error('Login Error:', error.response || error)
            alert(error.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h2>
                <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '2rem' }}>Sign in to manage your rentals.</p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="label">Email Address</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                        Sign In
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#2563eb', fontWeight: 600 }}>Create account</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
