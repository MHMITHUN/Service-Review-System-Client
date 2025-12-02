import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import LoadingSpinner from '../components/Spinner';
import toast from 'react-hot-toast';

import useDocumentTitle from '../hooks/useDocumentTitle';

const MyServices = () => {
    useDocumentTitle('My Services');
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingService, setEditingService] = useState(null);
    const [deletingService, setDeletingService] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchMyServices();
        }
    }, [user]);

    const fetchMyServices = async () => {
        try {
            const response = await api.get(`/api/services/user/${user.email}`);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setUpdateLoading(true);
        try {
            await api.patch(`/api/services/${editingService._id}`, editingService);
            toast.success('Service updated successfully!');
            setEditingService(null);
            fetchMyServices();
        } catch (error) {
            console.error('Error updating service:', error);
            toast.error('Failed to update service');
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/services/${deletingService._id}`);
            toast.success('Service deleted successfully!');
            setDeletingService(null);
            fetchMyServices();
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('Failed to delete service');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
                        My Services
                    </h1>
                    <p className="text-gray-600">Manage all your listed services</p>
                </motion.div>

                {services.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-primary text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {services.map((service) => (
                                        <tr key={service._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={service.imageUrl}
                                                    alt={service.title}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {service.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                                                    {service.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">
                                                ৳ {service.price}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {service.company}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => setEditingService(service)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletingService(service)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                            No services yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Start by adding your first service
                        </p>
                        <a
                            href="/add-service"
                            className="inline-block px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Add Service
                        </a>
                    </div>
                )}

                {/* Update Modal */}
                {editingService && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                                Update Service
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={editingService.title}
                                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={editingService.description}
                                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={editingService.category}
                                            onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
                                        >
                                            <option value="IT">IT</option>
                                            <option value="Food">Food</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Education">Education</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            value={editingService.price}
                                            onChange={(e) => setEditingService({ ...editingService, price: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={editingService.imageUrl}
                                        onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleUpdate}
                                    disabled={updateLoading}
                                    className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
                                >
                                    {updateLoading ? 'Updating...' : 'Update Service'}
                                </button>
                                <button
                                    onClick={() => setEditingService(null)}
                                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deletingService && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-8 max-w-md w-full"
                        >
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                Delete Service?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete "{deletingService.title}"? This action cannot be undone.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setDeletingService(null)}
                                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyServices;
