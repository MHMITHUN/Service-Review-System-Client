import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
            setIsProfileOpen(false);
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
        <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
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
                                        ? 'bg-gradient-primary text-white'
                                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}

                        {user && (
                            <div className="relative ml-4" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                                >
                                    <img
                                        src={user.photoURL || 'https://via.placeholder.com/40'}
                                        alt={user.displayName}
                                        className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
                                    />
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                                            {user.displayName || 'User'}
                                        </span>
                                        <span className="text-xs text-gray-500 max-w-[120px] truncate">
                                            {user.email}
                                        </span>
                                    </div>
                                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.displayName}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                        >
                                            <Cog6ToothIcon className="w-5 h-5" />
                                            <span>Edit Profile</span>
                                        </Link>
                                        <Link
                                            to="/my-services"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                        >
                                            <UserCircleIcon className="w-5 h-5" />
                                            <span>My Services</span>
                                        </Link>
                                        <div className="border-t border-gray-100 mt-2"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-purple-50 transition-colors"
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
                    <div className="md:hidden pb-4 animate-fade-in">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-3 rounded-lg font-medium transition-all mb-1 ${isActive
                                        ? 'bg-gradient-primary text-white'
                                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
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
                                        className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{user.displayName}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-lg mb-1"
                                >
                                    <Cog6ToothIcon className="w-5 h-5" />
                                    <span>Edit Profile</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    <span>Logout</span>
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
