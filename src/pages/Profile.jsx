import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Profile = () => {
    useDocumentTitle('Edit Profile');
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });

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
            await updateProfile(auth.currentUser, {
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });

            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                >
                    <div className="text-center mb-8">
                        <div className="inline-block relative">
                            <img
                                src={user?.photoURL || 'https://via.placeholder.com/150'}
                                alt={user?.displayName}
                                className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover mx-auto mb-4"
                            />
                            <div className="absolute bottom-4 right-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center border-4 border-white">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl font-heading font-bold text-gradient mb-2">
                            Edit Profile
                        </h1>
                        <p className="text-gray-600">Update your personal information</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                            <button
                                type="button"
                                onClick={() => window.history.back()}
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

export default Profile;
