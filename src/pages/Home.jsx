import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import ServiceCard from '../components/ServiceCard';
import api from '../utils/api';
import LoadingSpinner from '../components/Spinner';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
    useDocumentTitle('Home');
    const [featuredServices, setFeaturedServices] = useState([]);
    const [stats, setStats] = useState({ users: 0, services: 0, reviews: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

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
            {/* Hero Banner Section */}
            <section className="relative min-h-[650px] lg:min-h-[700px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Content Container */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-white z-10"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30"
                            >
                                <span className="text-sm font-semibold">🇧🇩 বাংলাদেশের সেরা সার্ভিস প্ল্যাটফর্ম</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight"
                            >
                                Find & Review
                                <span className="block text-yellow-200">
                                    Trusted Services
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-lg lg:text-xl mb-8 text-white/90 leading-relaxed max-w-xl"
                            >
                                Discover authentic reviews from real users. Share your experiences and help others make informed decisions.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    to="/services"
                                    className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-opacity-95 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-base lg:text-lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Explore Services
                                </Link>
                                <Link
                                    to="/add-service"
                                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all backdrop-blur-sm text-base lg:text-lg transform hover:-translate-y-1"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Service
                                </Link>
                            </motion.div>

                            {/* Stats Preview */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                                className="mt-12 flex gap-8"
                            >
                                <div>
                                    <div className="text-3xl font-bold text-yellow-200">{stats.services}+</div>
                                    <div className="text-sm text-white/80">Services</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-yellow-200">{stats.reviews}+</div>
                                    <div className="text-sm text-white/80">Reviews</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-yellow-200">{stats.users}+</div>
                                    <div className="text-sm text-white/80">Users</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80"
                                    alt="Team collaboration"
                                    className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                                />
                                {/* Floating Card */}
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">Verified Reviews</div>
                                            <div className="text-xs text-gray-500">Trusted by thousands</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
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
                            { name: 'BdTech', description: 'Leading IT solutions' },
                            { name: 'DataCare', description: 'Cloud experts' },
                            { name: 'AdBuzz', description: 'Digital marketing' },
                            { name: 'SecureNet', description: 'Cybersecurity' }
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
                                name: 'আব্দুল্লাহ আল মামুন',
                                role: 'ব্যবসায়ী, ঢাকা',
                                comment: 'এই প্ল্যাটফর্মে আমি আমার ব্যবসার জন্য পারফেক্ট ওয়েব ডেভেলপমেন্ট সার্ভিস পেয়েছি। রিভিউগুলো সত্যিই সৎ এবং বিস্তারিত!',
                                avatar: 'https://i.pravatar.cc/150?img=12'
                            },
                            {
                                name: 'তাসনিম আরা',
                                role: 'ফ্রিল্যান্সার, চট্টগ্রাম',
                                comment: 'সার্ভিস সম্পর্কে নিজের অভিজ্ঞতা শেয়ার করা খুবই সহজ। এখন এটা আমার প্রিয় প্ল্যাটফর্ম সার্ভিস খোঁজার জন্য।',
                                avatar: 'https://i.pravatar.cc/150?img=45'
                            },
                            {
                                name: 'মোঃ কামরুল হাসান',
                                role: 'স্টার্টআপ ফাউন্ডার',
                                comment: 'এখানে তালিকাভুক্ত সার্ভিসের মান অসাধারণ। অনেক সময় এবং গবেষণা বাঁচিয়ে দিয়েছে!',
                                avatar: 'https://i.pravatar.cc/150?img=33'
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
