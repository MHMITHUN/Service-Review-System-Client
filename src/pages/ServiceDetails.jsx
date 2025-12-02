import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from 'react-rating';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';
import ReviewCard from '../components/ReviewCard';
import api from '../utils/api';
import LoadingSpinner from '../components/Spinner';
import { formatDate } from '../utils/formatDate';
import toast from 'react-hot-toast';

import useDocumentTitle from '../hooks/useDocumentTitle';

const ServiceDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewData, setReviewData] = useState({
        rating: 0,
        reviewText: ''
    });
    const [showModal, setShowModal] = useState(false);

    useDocumentTitle(service ? service.title : 'Service Details');

    useEffect(() => {
        fetchServiceData();
    }, [id]);

    const fetchServiceData = async () => {
        setLoading(true);
        try {
            const [serviceRes, reviewsRes] = await Promise.all([
                api.get(`/api/services/${id}`),
                api.get(`/api/reviews/service/${id}`)
            ]);
            setService(serviceRes.data);
            setReviews(reviewsRes.data);
        } catch (error) {
            console.error('Error fetching service data:', error);
            toast.error('Failed to load service details');
        } finally {
            setLoading(false);
        }
    };

    const handleBookService = () => {
        toast.success('Booking Request Sent! The service provider will contact you soon.', {
            duration: 5000,
            icon: '📅'
        });

        // Scroll to review section after a short delay to encourage review
        setTimeout(() => {
            const reviewSection = document.getElementById('add-review');
            if (reviewSection) {
                reviewSection.scrollIntoView({ behavior: 'smooth' });
                toast('Don\'t forget to leave a review after your service!', {
                    icon: '⭐',
                    duration: 4000
                });
            }
        }, 2000);
    };

    const handleInitiateReview = (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to add a review');
            return;
        }

        if (reviewData.rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (!reviewData.reviewText.trim()) {
            toast.error('Please write a review');
            return;
        }

        setShowModal(true);
    };

    const handleConfirmReview = async () => {
        setSubmittingReview(true);
        try {
            const newReview = {
                serviceId: id,
                serviceTitle: service.title,
                rating: reviewData.rating,
                reviewText: reviewData.reviewText,
                userEmail: user.email,
                userName: user.displayName,
                userPhoto: user.photoURL,
                postedDate: new Date().toISOString()
            };

            const response = await api.post('/api/reviews', newReview);
            setReviews([response.data.review, ...reviews]);
            setReviewData({ rating: 0, reviewText: '' });
            setShowModal(false);
            toast.success('Review added successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to add review');
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!service) return <div>Service not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Service Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="h-96 lg:h-auto">
                            <img
                                src={service.imageUrl}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-8 lg:p-12">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                                    {service.category}
                                </span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-600">{service.company}</span>
                            </div>

                            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
                                {service.title}
                            </h1>

                            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="space-y-3 mb-6">
                                {service.website && (
                                    <div className="flex items-center text-gray-600">
                                        <span className="font-semibold w-24">Website:</span>
                                        <a
                                            href={service.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-600 hover:text-purple-700 underline"
                                        >
                                            {service.website}
                                        </a>
                                    </div>
                                )}
                                <div className="flex items-center text-gray-600">
                                    <span className="font-semibold w-24">Price:</span>
                                    <span className="text-2xl font-bold text-gradient">${service.price}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="font-semibold w-24">Added:</span>
                                    <span>{formatDate(service.addedDate)}</span>
                                </div>
                            </div>

                            {user && (
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={handleBookService}
                                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Book Now
                                    </button>
                                    <a
                                        href="#add-review"
                                        className="px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                                    >
                                        Write a Review
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Reviews Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Review Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24" id="add-review">
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                                {user ? 'Add Your Review' : 'Login to Review'}
                            </h2>

                            {user ? (
                                <form onSubmit={handleInitiateReview} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Rating
                                        </label>
                                        <Rating
                                            initialRating={reviewData.rating}
                                            onChange={(rate) => setReviewData({ ...reviewData, rating: rate })}
                                            emptySymbol={<StarIconOutline className="w-8 h-8 text-gray-300" />}
                                            fullSymbol={<StarIconSolid className="w-8 h-8 text-yellow-400" />}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Review
                                        </label>
                                        <textarea
                                            value={reviewData.reviewText}
                                            onChange={(e) => setReviewData({ ...reviewData, reviewText: e.target.value })}
                                            rows="5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Share your experience..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 mb-4">
                                        Please login to add a review
                                    </p>
                                    <Link
                                        to="/login"
                                        className="inline-block px-6 py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                                Reviews ({reviews.length})
                            </h2>

                            {reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">💭</div>
                                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                                        No reviews yet
                                    </h3>
                                    <p className="text-gray-600">
                                        Be the first to review this service!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Review</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to submit this review?
                        </p>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <StarIconSolid
                                        key={i}
                                        className={`w-5 h-5 ${i < reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 italic">"{reviewData.reviewText}"</p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmReview}
                                disabled={submittingReview}
                                className="flex-1 px-4 py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {submittingReview ? 'Submitting...' : 'Confirm'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetails;
