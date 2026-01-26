import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useScrollAnimation from "./useScrollAnimation";

export default function Contact() {
    const [ref, animationClass] = useScrollAnimation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        details: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', details: '' });
    };

    return (
        <section
            ref={ref}
            id="contact"
            className={`min-h-screen flex items-center justify-center px-4 py-16 md:py-20 bg-gradient-to-br from-[#0b2545] via-[#1f7a8c] to-[#0b2545] transition-all duration-1000 ${animationClass}`}
        >
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left Info Section */}
                <div className="flex flex-col justify-center text-white">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Something Great</h3>
                    <p className="text-green-300 text-lg leading-relaxed mb-6">
                        Contact us for a consultation or project estimate. Our team is ready to bring your vision to life with expert guidance and transparent communication.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-700/20 rounded-full flex items-center justify-center">
                                <FaPhone className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="font-medium">(555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-700/20 rounded-full flex items-center justify-center">
                                <FaEnvelope className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="font-medium">info@cliberduche.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-700/20 rounded-full flex items-center justify-center">
                                <FaMapMarkerAlt className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="font-medium">123 Construction Ave, Build City</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 space-y-6">
                    <h4 className="text-2xl font-semibold text-white mb-2 text-center">Get In Touch</h4>

                    {/* Name Field */}
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Full Name"
                            className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-transparent focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                        />
                        <label
                            htmlFor="name"
                            className={`absolute left-4 transition-all duration-300
                                ${formData.name
                                    ? 'top-0 text-green-400 text-sm'
                                    : 'top-3 text-white/60 text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-green-400 peer-focus:text-sm'
                                }`}
                        >
                            Full Name
                        </label>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email Address"
                            className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-transparent focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-4 transition-all duration-300
                                ${formData.email
                                    ? 'top-0 text-green-400 text-sm'
                                    : 'top-3 text-white/60 text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-green-400 peer-focus:text-sm'
                                }`}
                        >
                            Email Address
                        </label>
                    </div>

                    {/* Details Field */}
                    <div className="relative">
                        <textarea
                            id="details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Project Details"
                            className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-transparent resize-none focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                        ></textarea>
                        <label
                            htmlFor="details"
                            className={`absolute left-4 top-3 transition-all duration-300
                                ${formData.details
                                    ? 'top-0 text-green-400 text-sm'
                                    : 'top-3 text-white/60 text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-green-400 peer-focus:text-sm'
                                }`}
                        >
                            Project Details
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
