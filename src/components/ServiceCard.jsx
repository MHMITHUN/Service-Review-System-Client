import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceCard = ({ service }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-purple-600 font-semibold">${service.price}</span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        {service.category}
                    </span>
                    <span className="text-xs text-gray-500">{service.company}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 line-clamp-1">
                    {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                </p>

                <Link
                    to={`/services/${service._id}`}
                    className="block w-full text-center px-4 py-2 bg-gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    See Details
                </Link>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
