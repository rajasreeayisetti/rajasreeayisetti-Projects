import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { Plus, Trash2, Edit3, Car } from 'lucide-react'

const AdminPanel = () => {
    const [vehicles, setVehicles] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [newVehicle, setNewVehicle] = useState({
        vehicleName: '',
        vehicleType: 'Sedan',
        pricePerDay: '',
        gpsEnabled: false,
        imageUrl: ''
    })

    useEffect(() => {
        fetchVehicles()
    }, [])

    const fetchVehicles = async () => {
        const { data } = await api.get('/vehicles')
        setVehicles(data)
    }

    const handleAddVehicle = async (e) => {
        e.preventDefault()
        try {
            await api.post('/vehicles', newVehicle)
            setShowAddModal(false)
            fetchVehicles()
            alert('Vehicle added successfully')
        } catch (error) {
            alert('Error adding vehicle')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            await api.delete(`/vehicles/${id}`)
            fetchVehicles()
        }
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Inventory Management</h2>
                    <p style={{ color: '#64748b' }}>Manage your rental fleet and availability.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                    <Plus size={20} /> Add New Vehicle
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1.25rem' }}>Vehicle</th>
                            <th style={{ padding: '1.25rem' }}>Type</th>
                            <th style={{ padding: '1.25rem' }}>Price/Day</th>
                            <th style={{ padding: '1.25rem' }}>GPS</th>
                            <th style={{ padding: '1.25rem' }}>Status</th>
                            <th style={{ padding: '1.25rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(v => (
                            <tr key={v._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <img src={v.imageUrl || 'https://via.placeholder.com/40'} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                    {v.vehicleName}
                                </td>
                                <td style={{ padding: '1.25rem' }}>{v.vehicleType}</td>
                                <td style={{ padding: '1.25rem' }}>${v.pricePerDay}</td>
                                <td style={{ padding: '1.25rem' }}>{v.gpsEnabled ? 'Yes' : 'No'}</td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span className={`badge ${v.availability ? 'badge-success' : 'badge-error'}`}>
                                        {v.availability ? 'Active' : 'Rented'}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button style={{ color: '#2563eb' }}><Edit3 size={18} /></button>
                                        <button style={{ color: '#ef4444' }} onClick={() => handleDelete(v._id)}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Add New Vehicle</h3>
                        <form onSubmit={handleAddVehicle}>
                            <div className="form-group">
                                <label className="label">Vehicle Name</label>
                                <input type="text" className="input" required value={newVehicle.vehicleName} onChange={e => setNewVehicle({ ...newVehicle, vehicleName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="label">Vehicle Type</label>
                                <select className="input" value={newVehicle.vehicleType} onChange={e => setNewVehicle({ ...newVehicle, vehicleType: e.target.value })}>
                                    <option>Sedan</option>
                                    <option>SUV</option>
                                    <option>Luxury</option>
                                    <option>Economy</option>
                                    <option>Sports</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="label">Price per Day ($)</label>
                                    <input type="number" className="input" required value={newVehicle.pricePerDay} onChange={e => setNewVehicle({ ...newVehicle, pricePerDay: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="label">GPS Enabled</label>
                                    <select className="input" value={newVehicle.gpsEnabled} onChange={e => setNewVehicle({ ...newVehicle, gpsEnabled: e.target.value === 'true' })}>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label">Image URL</label>
                                <input type="text" className="input" placeholder="https://unsplash.com/..." value={newVehicle.imageUrl} onChange={e => setNewVehicle({ ...newVehicle, imageUrl: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="btn-primary" style={{ background: '#f1f5f9', color: '#0f172a' }} onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Save Vehicle</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminPanel
