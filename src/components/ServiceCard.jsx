import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/services/${service._id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            onClick={handleCardClick}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift h-full cursor-pointer group"
        >
            <div 
                onClick={handleCardClick}
                className="relative h-48 overflow-hidden shrink-0"
            >
                <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-purple-600 font-semibold">${service.price}</span>
                </div>
            </div>

            <div 
                onClick={handleCardClick}
                className="p-6 flex flex-col flex-grow"
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        {service.category}
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-xs font-medium text-gray-700">
                            {service.averageRating ? service.averageRating.toFixed(1) : '0.0'}
                        </span>
                        <span className="text-xs text-gray-500">
                            ({service.reviewCount || 0})
                        </span>
                    </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {service.description}
                </p>

                <div className="mt-auto">
                    <button
                        className="block w-full text-center px-4 py-2 bg-gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        See Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
