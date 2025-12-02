import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import ServiceCard from '../components/ServiceCard';
import api from '../utils/api';
import LoadingSpinner from '../components/Spinner';

const Home = () => {
    const [featuredServices, setFeaturedServices] = useState([]);
    const [stats, setStats] = useState({ users: 0, services: 0, reviews: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Home - ServiceReview';

        const fetchData = async () => {
            try {
                const [servicesRes, statsRes] = await Promise.all([
                    api.get('/api/services/featured'),
                    api.get('/api/stats')
                ]);
                setFeaturedServices(servicesRes.data);
                setStats(statsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen">
            {/* Banner/Carousel Section */}
            <section className="relative h-[600px] bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                            Discover Trusted Services
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            Read authentic reviews, share your experiences, and make informed decisions
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to="/services"
                                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover-lift"
                            >
                                Explore Services
                            </Link>
                            <Link
                                to="/add-service"
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
                            >
                                Add Service
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Background Shapes */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 hover-lift"
                        >
                            <div className="text-5xl font-bold text-gradient mb-2">
                                <CountUp end={stats.users} duration={2.5} />+
                            </div>
                            <div className="text-gray-700 font-semibold text-lg">Happy Users</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 hover-lift"
                        >
                            <div className="text-5xl font-bold text-gradient mb-2">
                                <CountUp end={stats.services} duration={2.5} />+
                            </div>
                            <div className="text-gray-700 font-semibold text-lg">Services Listed</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center p-8 rounded-xl bg-gradient-to-br from-pink-100 to-yellow-100 hover-lift"
                        >
                            <div className="text-5xl font-bold text-gradient mb-2">
                                <CountUp end={stats.reviews} duration={2.5} />+
                            </div>
                            <div className="text-gray-700 font-semibold text-lg">Reviews Posted</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
                            Featured Services
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Explore our hand-picked selection of top-rated services
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredServices.map((service, index) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/services"
                            className="inline-block px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Meet Our Partners Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
                            Meet Our Partners
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Trusted companies that power our platform
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { name: 'TechCorp', description: 'Leading tech solutions provider' },
                            { name: 'CloudBase', description: 'Cloud infrastructure experts' },
                            { name: 'DataFlow', description: 'Data analytics platform' },
                            { name: 'SecureNet', description: 'Cybersecurity specialists' }
                        ].map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover-lift"
                            >
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">
                                        {partner.name.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-gray-900 mb-2">{partner.name}</h3>
                                <p className="text-sm text-gray-600">{partner.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Real experiences from our community members
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Sarah Johnson',
                                role: 'Business Owner',
                                comment: 'This platform helped me find the perfect web development service. The reviews were honest and detailed!',
                                avatar: 'https://i.pravatar.cc/150?img=1'
                            },
                            {
                                name: 'Michael Chen',
                                role: 'Freelancer',
                                comment: 'I love how easy it is to share my experiences. This platform has become my go-to for service recommendations.',
                                avatar: 'https://i.pravatar.cc/150?img=2'
                            },
                            {
                                name: 'Emily Davis',
                                role: 'Startup Founder',
                                comment: 'The quality of services listed here is outstanding. Saved me countless hours of research!',
                                avatar: 'https://i.pravatar.cc/150?img=3'
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-lg hover-lift"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-3"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of users sharing and discovering great services
                        </p>
                        <Link
                            to="/register"
                            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover-lift"
                        >
                            Create Free Account
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
