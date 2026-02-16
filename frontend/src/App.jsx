import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/Login'
import VehicleList from './components/Vehicle/VehicleList'
import RegisterCustomer from './components/Customer/RegisterCustomer'
import BookVehicle from './components/Booking/BookVehicle'

function App() {
    return (
        <Router>
            <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/vehicles" element={<VehicleList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterCustomer />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/book/:id" element={<BookVehicle />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
