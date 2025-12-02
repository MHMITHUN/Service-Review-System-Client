import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navItems = user
        ? [
            { to: '/', label: 'Home' },
            { to: '/services', label: 'Services' },
            { to: '/add-service', label: 'Add Service' },
            { to: '/my-services', label: 'My Services' },
            { to: '/my-reviews', label: 'My Reviews' },
        ]
        : [
            { to: '/', label: 'Home' },
            { to: '/services', label: 'Services' },
            { to: '/login', label: 'Login' },
            { to: '/register', label: 'Register' },
        ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">SR</span>
                        </div>
                        <span className="text-2xl font-heading font-bold text-gradient">ServiceReview</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        {user && (
                            <div className="flex items-center space-x-3 ml-4">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={user.photoURL || 'https://via.placeholder.com/40'}
                                        alt={user.displayName}
                                        className="w-10 h-10 rounded-full border-2 border-purple-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.displayName}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-3 rounded-lg font-medium transition-all ${isActive
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        {user && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center space-x-3 px-4 mb-3">
                                    <img
                                        src={user.photoURL || 'https://via.placeholder.com/40'}
                                        alt={user.displayName}
                                        className="w-10 h-10 rounded-full border-2 border-purple-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.displayName}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 bg-gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
