import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { Calendar, Car, Clock, DollarSign } from 'lucide-react'

const Dashboard = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null)

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            setUser(JSON.parse(userInfo))
        }

        const fetchMyBookings = async () => {
            // For demo, we'll try to get bookings for a specific customer if logged in
            try {
                const user = JSON.parse(localStorage.getItem('userInfo'))
                if (user) {
                    const { data } = await api.get(`/customers/${user._id}/bookings`)
                    setBookings(data)
                }
            } catch (error) {
                console.error('Error fetching bookings', error)
            } finally {
                setLoading(false)
            }
        }
        fetchMyBookings()
    }, [])

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>
                Welcome, {user ? user.name : 'Guest'}! <span style={{ color: '#64748b', fontWeight: 400, fontSize: '1.25rem' }}>Here are your bookings.</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
                    <div style={{ color: '#2563eb', marginBottom: '1rem' }}><Car size={24} /></div>
                    <p style={{ color: '#64748b' }}>Active Bookings</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{bookings.filter(b => b.paymentStatus === 'Paid').length}</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
                    <div style={{ color: '#10b981', marginBottom: '1rem' }}><DollarSign size={24} /></div>
                    <p style={{ color: '#64748b' }}>Total Spent</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>${bookings.reduce((acc, b) => acc + b.totalAmount, 0)}</p>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1.25rem' }}>Vehicle</th>
                            <th style={{ padding: '1.25rem' }}>Start Date</th>
                            <th style={{ padding: '1.25rem' }}>End Date</th>
                            <th style={{ padding: '1.25rem' }}>Amount</th>
                            <th style={{ padding: '1.25rem' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? bookings.map(b => (
                            <tr key={b._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1.25rem' }}>{b.vehicleId?.vehicleName}</td>
                                <td style={{ padding: '1.25rem' }}>{new Date(b.startDate).toLocaleDateString()}</td>
                                <td style={{ padding: '1.25rem' }}>{new Date(b.endDate).toLocaleDateString()}</td>
                                <td style={{ padding: '1.25rem' }}>${b.totalAmount}</td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span className="badge badge-success">{b.paymentStatus}</span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No bookings found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
