import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import api from '../utils/api';
import LoadingSpinner from '../components/Spinner';
import useDocumentTitle from '../hooks/useDocumentTitle';

const AllServices = () => {
    useDocumentTitle('All Services');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'IT', 'Food', 'Transport', 'Healthcare', 'Education', 'Finance'];

    useEffect(() => {
        fetchServices();
    }, []);

    // Real-time search with debouncing
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery !== undefined) {
                fetchServices(searchQuery, selectedCategory);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const fetchServices = async (search = '', category = 'all') => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.search = search;
            if (category !== 'all') params.category = category;

            const response = await api.get('/api/services', { params });
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchServices(searchQuery, selectedCategory);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        fetchServices(searchQuery, category);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
                        All Services
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Browse and discover amazing services from our community
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, category, or company... (instant search)"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Search
                        </button>
                    </form>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 border-2 ${selectedCategory === category
                                    ? 'bg-gradient-primary text-white border-transparent shadow-lg'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                            No services found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllServices;
