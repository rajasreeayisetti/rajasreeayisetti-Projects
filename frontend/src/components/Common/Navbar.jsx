import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Car, User, LayoutDashboard, LogIn, LogOut } from 'lucide-react'

const Navbar = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            setUser(JSON.parse(userInfo))
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        setUser(null)
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/" className="nav-logo">
                    <Car size={32} />
                    <span>DriveEase</span>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/vehicles" className="nav-link">Fleet</Link></li>
                    {user && <li><Link to="/dashboard" className="nav-link">My Bookings</Link></li>}
                    <li><Link to="/admin" className="nav-link">Admin</Link></li>
                </ul>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {user ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 600 }}>
                                <User size={20} />
                                <span>{user.name}</span>
                            </div>
                            <button onClick={handleLogout} className="nav-link" style={{ background: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <LogOut size={20} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <LogIn size={20} /> Login
                            </Link>
                            <Link to="/register" className="btn-primary">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
