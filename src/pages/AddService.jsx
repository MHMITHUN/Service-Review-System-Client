import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import useDocumentTitle from '../hooks/useDocumentTitle';

const AddService = () => {
    useDocumentTitle('Add Service');
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        website: '',
        description: '',
        category: 'IT',
        price: '',
        imageUrl: ''
    });

    const categories = ['IT', 'Food', 'Transport', 'Healthcare', 'Education', 'Finance'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const serviceData = {
                ...formData,
                price: parseFloat(formData.price),
                userEmail: user.email,
                addedDate: new Date().toISOString()
            };

            await api.post('/api/services', serviceData);
            toast.success('Service added successfully!');
            navigate('/my-services');
        } catch (error) {
            console.error('Error adding service:', error);
            toast.error('Failed to add service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                >
                    <h1 className="text-4xl font-heading font-bold text-gradient mb-2">
                        Add New Service
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Share a great service with the community
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Service Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g., Professional Web Development"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="e.g., TechCorp Inc."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (৳ Taka) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="5000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL *
                                </label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    required
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Describe the service in detail..."
                            ></textarea>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? 'Adding Service...' : 'Add Service'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/my-services')}
                                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddService;
