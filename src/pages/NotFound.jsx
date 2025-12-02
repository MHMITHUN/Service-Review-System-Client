import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="text-center">
                <h1 className="text-9xl font-heading font-bold text-gradient">404</h1>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-4 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block mt-8 px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
