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
                                <span className="text-sm font-semibold">Find & Review Trusted Services</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight"
                            >
                                Discover & Share
                                <span className="block text-yellow-200">
                                    Service Reviews
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

            {/* Partners Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
                            Meet Our Partners
                        </h2>
                        <p className="text-xl text-gray-600">
                            Trusted companies that power our platform
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        {[
                            {
                                name: 'Grameenphone',
                                tagline: 'Leading Telecom Provider',
                                logo: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Grameenphone_Logo_GP_Logo.svg',
                                bgColor: 'bg-white'
                            },
                            {
                                name: 'bKash',
                                tagline: 'Digital Payment Solution',
                                logo: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSwiHGZdHchwDekVI-tkwVuh5mVMwJe86-phafEtJUWvtKwi3UN8blUyqSN1fiLPUBZ_irOqdO1',
                                bgColor: 'bg-pink-50'
                            },
                            {
                                name: 'Daraz',
                                tagline: 'E-commerce Platform',
                                logo: 'https://images.seeklogo.com/logo-png/42/1/daraz-logo-png_seeklogo-429389.png',
                                bgColor: 'bg-orange-50'
                            },
                            {
                                name: 'Pathao',
                                tagline: 'Logistics & Delivery',
                                logo: 'https://images.seeklogo.com/logo-png/50/1/pathao-logo-png_seeklogo-504561.png',
                                bgColor: 'bg-red-50'
                            }
                        ].map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600">
                                    {/* Logo Container */}
                                    <div className={`h-24 flex items-center justify-center mb-4 rounded-xl ${partner.bgColor} p-4 group-hover:bg-white/10 transition-all`}>
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-1 transition-all">
                                            {partner.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 group-hover:text-white/90 transition-all">{partner.tagline}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Partner Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
                                <div className="text-lg text-white/90">Partner Companies</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
                                <div className="text-lg text-white/90">Services Provided</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                                <div className="text-lg text-white/90">Satisfaction Rate</div>
                            </div>
                        </div>
                    </motion.div>
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
            <section className="relative py-24 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
                            <span className="text-sm font-semibold text-white">✨ Join Our Community</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of users sharing and discovering great services. Create your free account today!
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link
                                to="/register"
                                className="inline-flex items-center px-10 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-opacity-95 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Create Free Account
                            </Link>
                            <Link
                                to="/services"
                                className="inline-flex items-center px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all text-lg transform hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Browse Services
                            </Link>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">100% Free</h3>
                                <p className="text-white/80 text-sm">No hidden costs, completely free forever</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Verified Reviews</h3>
                                <p className="text-white/80 text-sm">Authentic feedback from real users</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Instant Access</h3>
                                <p className="text-white/80 text-sm">Start browsing and reviewing immediately</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
