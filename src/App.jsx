import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import AllServices from './pages/AllServices';
import ServiceDetails from './pages/ServiceDetails';
import AddService from './pages/AddService';
import MyServices from './pages/MyServices';
import MyReviews from './pages/MyReviews';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<AllServices />} />
                            <Route path="/services/:id" element={<ServiceDetails />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Private Routes */}
                            <Route
                                path="/add-service"
                                element={
                                    <PrivateRoute>
                                        <AddService />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/my-services"
                                element={
                                    <PrivateRoute>
                                        <MyServices />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/my-reviews"
                                element={
                                    <PrivateRoute>
                                        <MyReviews />
                                    </PrivateRoute>
                                }
                            />

                            {/* 404 Route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>

                {/* Toast Notifications */}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#fff',
                            color: '#363636',
                            borderRadius: '10px',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10B981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </AuthProvider>
        </Router>
    );
}

export default App;
