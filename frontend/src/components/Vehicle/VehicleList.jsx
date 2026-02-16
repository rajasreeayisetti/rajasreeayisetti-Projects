import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import VehicleCard from './VehicleCard'
import { Filter, Search } from 'lucide-react'

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const { data } = await api.get('/vehicles')
                setVehicles(data)
            } catch (error) {
                console.error('Error fetching vehicles', error)
            } finally {
                setLoading(false)
            }
        }
        fetchVehicles()
    }, [])

    if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading Fleet...</div>

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Available Fleet</h2>
                    <p style={{ color: '#64748b' }}>Choose from our diverse collection of premium vehicles.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input type="text" placeholder="Search vehicles..." className="input" style={{ paddingLeft: '2.5rem', width: '300px' }} />
                    </div>
                    <button className="btn-primary" style={{ background: 'white', color: '#0f172a', border: '1px solid #e2e8f0' }}>
                        <Filter size={18} /> Filter
                    </button>
                </div>
            </div>

            <div className="vehicle-grid">
                {vehicles.length > 0 ? (
                    vehicles.map(v => <VehicleCard key={v._id} vehicle={v} />)
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                        <p style={{ color: '#64748b' }}>No vehicles found in our fleet currently.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VehicleList
