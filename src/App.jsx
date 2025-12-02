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
import Profile from './pages/Profile';

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
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Profile />
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
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#fff',
                            color: '#1f2937',
                            borderRadius: '12px',
                            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
                            padding: '12px 20px',
                            fontSize: '14px',
                            fontWeight: '500',
                        },
                        success: {
                            duration: 2500,
                            iconTheme: {
                                primary: '#10B981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            duration: 3500,
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
