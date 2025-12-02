import React from 'react';
import Rating from 'react-rating';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { formatDateTime } from '../utils/formatDate';

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover-lift">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img
                        src={review.userPhoto || 'https://via.placeholder.com/40'}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full border-2 border-purple-200"
                    />
                    <div>
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        <p className="text-xs text-gray-500">{formatDateTime(review.postedDate)}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Rating
                        readonly
                        initialRating={review.rating}
                        emptySymbol={<StarIconOutline className="w-5 h-5 text-gray-300" />}
                        fullSymbol={<StarIconSolid className="w-5 h-5 text-yellow-400" />}
                    />
                </div>
            </div>

            {review.serviceTitle && (
                <h5 className="text-sm font-medium text-purple-600 mb-2">
                    Service: {review.serviceTitle}
                </h5>
            )}

            <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
        </div>
    );
};

export default ReviewCard;
