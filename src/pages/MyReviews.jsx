import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Rating from 'react-rating';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import LoadingSpinner from '../components/Spinner';
import { formatDateTime } from '../utils/formatDate';
import toast from 'react-hot-toast';

import useDocumentTitle from '../hooks/useDocumentTitle';

const MyReviews = () => {
    useDocumentTitle('My Reviews');
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);
    const [deletingReview, setDeletingReview] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchMyReviews();
        }
    }, [user]);

    const fetchMyReviews = async () => {
        try {
            const response = await api.get(`/api/reviews/user/${user.email}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            toast.error('Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setUpdateLoading(true);
        try {
            await api.patch(`/api/reviews/${editingReview._id}`, {
                rating: editingReview.rating,
                reviewText: editingReview.reviewText
            });
            toast.success('Review updated successfully!');
            setEditingReview(null);
            fetchMyReviews();
        } catch (error) {
            console.error('Error updating review:', error);
            toast.error('Failed to update review');
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/reviews/${deletingReview._id}`);
            toast.success('Review deleted successfully!');
            setDeletingReview(null);
            fetchMyReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Failed to delete review');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
                        My Reviews
                    </h1>
                    <p className="text-gray-600">Manage all your service reviews</p>
                </motion.div>

                {reviews.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <motion.div
                                key={review._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-md p-6 hover-lift"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-heading font-bold text-purple-600 mb-2">
                                            {review.serviceTitle}
                                        </h3>
                                        <div className="flex items-center gap-3 mb-3">
                                            <Rating
                                                readonly
                                                initialRating={review.rating}
                                                emptySymbol={<StarIconOutline className="w-5 h-5 text-gray-300" />}
                                                fullSymbol={<StarIconSolid className="w-5 h-5 text-yellow-400" />}
                                            />
                                            <span className="text-sm text-gray-500">
                                                {formatDateTime(review.postedDate)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            {review.reviewText}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <button
                                            onClick={() => setEditingReview(review)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit Review"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setDeletingReview(review)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Review"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">💭</div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                            No reviews yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Start reviewing services to share your experiences
                        </p>
                        <a
                            href="/services"
                            className="inline-block px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Browse Services
                        </a>
                    </div>
                )}

                {/* Update Modal */}
                {editingReview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-8 max-w-2xl w-full"
                        >
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                                Update Review
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service Title (Read-only)
                                    </label>
                                    <input
                                        type="text"
                                        value={editingReview.serviceTitle}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Rating
                                    </label>
                                    <Rating
                                        initialRating={editingReview.rating}
                                        onChange={(rate) => setEditingReview({ ...editingReview, rating: rate })}
                                        emptySymbol={<StarIconOutline className="w-8 h-8 text-gray-300" />}
                                        fullSymbol={<StarIconSolid className="w-8 h-8 text-yellow-400" />}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Review
                                    </label>
                                    <textarea
                                        value={editingReview.reviewText}
                                        onChange={(e) => setEditingReview({ ...editingReview, reviewText: e.target.value })}
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleUpdate}
                                    disabled={updateLoading}
                                    className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
                                >
                                    {updateLoading ? 'Updating...' : 'Update Review'}
                                </button>
                                <button
                                    onClick={() => setEditingReview(null)}
                                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deletingReview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-8 max-w-md w-full"
                        >
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                                Delete Review?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete your review for "{deletingReview.serviceTitle}"? This action cannot be undone.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setDeletingReview(null)}
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

export default MyReviews;
