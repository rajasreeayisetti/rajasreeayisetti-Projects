import React from 'react'
import { Link } from 'react-router-dom'
import { Fuel, Users, Navigation, CheckCircle } from 'lucide-react'

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="vehicle-card">
            <div style={{ position: 'relative' }}>
                <img
                    src={vehicle.imageUrl || `https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800`}
                    alt={vehicle.vehicleName}
                    className="vehicle-image"
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <span className={`badge ${vehicle.availability ? 'badge-success' : 'badge-error'}`}>
                        {vehicle.availability ? 'Available' : 'Booked'}
                    </span>
                </div>
            </div>
            <div className="vehicle-info">
                <p className="vehicle-type">{vehicle.vehicleType}</p>
                <h3 className="vehicle-name">{vehicle.vehicleName}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', margin: '1rem 0', padding: '1rem 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                        <Fuel size={16} /> <span>Automatic</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                        <Users size={16} /> <span>5 Seats</span>
                    </div>
                    {vehicle.gpsEnabled && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                            <Navigation size={16} /> <span>GPS Enabled</span>
                        </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                        <CheckCircle size={16} /> <span>Insured</span>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p className="vehicle-price">${vehicle.pricePerDay} <span>/day</span></p>
                    </div>
                    <Link to={`/book/${vehicle._id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VehicleCard
