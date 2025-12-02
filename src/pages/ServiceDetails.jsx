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
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        fetchServiceData();
    }, [id]);

    useEffect(() => {
        if (service) {
            document.title = `${service.title} - ServiceReview`;
        }
    }, [service]);

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

    const handleSubmitReview = async (e) => {
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
        <div className="min-h-screen bg-gray-50 py-12">
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
                                <Link
                                    to={`/services/${id}#add-review`}
                                    className="inline-block px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Write a Review
                                </Link>
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
                                <form onSubmit={handleSubmitReview} className="space-y-4">
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
                                        disabled={submittingReview}
                                        className="w-full py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                                    >
                                        {submittingReview ? 'Submitting...' : 'Submit Review'}
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
        </div>
    );
};

export default ServiceDetails;
