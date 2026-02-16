import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Zap, MapPin, CreditCard } from 'lucide-react'

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section style={{
                padding: '6rem 0',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ maxWidth: '600px' }}
                    >
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: '#1e3a8a' }}>
                            Rent Your Dream Car In <span style={{ color: '#2563eb' }}>Minutes.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '2.5rem' }}>
                            Experience the ultimate freedom of the road with our premium fleet. Transparent pricing, 24/7 support, and instant booking.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/vehicles" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                Browse Fleet
                            </Link>
                            <Link to="/register" style={{
                                padding: '1rem 2rem',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: '#1e3a8a',
                                border: '2px solid #bfdbfe',
                                borderRadius: '12px',
                                background: 'white'
                            }}>
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
                {/* Animated Background Elements */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-5%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}
                />
            </section>

            {/* Features Section */}
            <section className="container" style={{ padding: '5rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Why Choose DriveEase?</h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>We provide top-tier service for your mobility needs.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: <Shield color="#2563eb" />, title: 'Fully Insured', desc: 'Every rental includes comprehensive insurance coverage for peace of mind.' },
                        { icon: <Zap color="#2563eb" />, title: 'Fast Booking', desc: 'Our streamlined process lets you book a car in less than 2 minutes.' },
                        { icon: <MapPin color="#2563eb" />, title: 'GPS Included', desc: 'Stay on track with built-in high-precision GPS tracking in all vehicles.' },
                        { icon: <CreditCard color="#2563eb" />, title: 'Secure Payment', desc: 'Secure online payments with instant invoice generation.' }
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            style={{ padding: '2rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow)', border: '1px solid #f1f5f9' }}
                        >
                            <div style={{ width: '50px', height: '50px', background: '#eff6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                {f.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{f.title}</h3>
                            <p style={{ color: '#64748b' }}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home
