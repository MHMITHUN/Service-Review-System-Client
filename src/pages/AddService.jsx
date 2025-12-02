import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import useDocumentTitle from '../hooks/useDocumentTitle';
import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    GlobeAltIcon,
    TagIcon,
    BanknotesIcon,
    PhotoIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const AddService = () => {
    useDocumentTitle('Add Service');
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
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

    const handleReview = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = async () => {
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
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
                >
                    <div className="bg-gradient-primary p-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Add New Service
                        </h1>
                        <p className="text-purple-100 text-lg">
                            Share your expertise with the world
                        </p>
                    </div>

                    <form onSubmit={handleReview} className="p-8 md:p-12 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <BriefcaseIcon className="w-5 h-5 mr-2 text-purple-600" />
                                    Service Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50/50 focus:bg-white"
                                    placeholder="e.g., Professional Web Development"
                                />
                            </div>

                            {/* Company */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <BuildingOfficeIcon className="w-5 h-5 mr-2 text-purple-600" />
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50/50 focus:bg-white"
                                    placeholder="e.g., TechCorp Inc."
                                />
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <GlobeAltIcon className="w-5 h-5 mr-2 text-purple-600" />
                                    Website (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50/50 focus:bg-white"
                                    placeholder="https://example.com"
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <TagIcon className="w-5 h-5 mr-2 text-purple-600" />
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        required
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50/50 focus:bg-white appearance-none cursor-pointer text-gray-900"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <BanknotesIcon className="w-5 h-5 mr-2 text-purple-600" />
                                    Price (৳ Taka)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50/50 focus:bg-white"
                                    placeholder="5000"
                                />
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <PhotoIcon className="w-5 h-5 mr-2 text-purple-600" />
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    required
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50/50 focus:bg-white"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-semibold text-gray-700">
                                <DocumentTextIcon className="w-5 h-5 mr-2 text-purple-600" />
                                Description
                            </label>
                            <textarea
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50/50 focus:bg-white resize-none"
                                placeholder="Describe your service in detail..."
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/my-services')}
                                className="flex-1 px-8 py-4 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 hover:text-gray-900 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transform hover:-translate-y-0.5 transition-all"
                            >
                                Review & Submit
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900">Confirm Service Details</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                                <div className="bg-purple-50 p-4 rounded-xl flex items-start gap-4">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                                        <img
                                            src={formData.imageUrl}
                                            alt="Service"
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{formData.title}</h4>
                                        <p className="text-sm text-gray-600">{formData.company}</p>
                                        <span className="inline-block mt-2 px-2 py-1 bg-white text-purple-600 text-xs font-bold rounded border border-purple-100">
                                            {formData.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="block text-gray-500 mb-1">Price</span>
                                        <span className="font-semibold text-gray-900">৳ {formData.price}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 mb-1">Website</span>
                                        <span className="font-semibold text-gray-900 truncate block">
                                            {formData.website || 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-gray-500 mb-1 text-sm">Description</span>
                                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        {formData.description}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 flex gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={loading}
                                    className="flex-[2] px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <CheckCircleIcon className="w-5 h-5" />
                                            Confirm & Add Service
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddService;
