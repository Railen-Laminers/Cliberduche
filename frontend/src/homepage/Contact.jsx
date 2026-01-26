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
            className={`grid md:grid-cols-2 gap-8 md:gap-12 px-6 md:px-10 py-16 md:py-20 bg-gradient-to-r from-green-100 via-green-50 to-green-100 transition-all duration-1000 ${animationClass}`}
        >
            {/* Text Section */}
            <div className="flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Let's Build Something Great
                </h3>
                <p className="text-green-700 text-lg leading-relaxed mb-6">
                    Contact us for a consultation or project estimate. Our team is ready to bring your vision to life with expert guidance and transparent communication.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                            <FaPhone className="w-5 h-5 text-green-700" />
                        </div>
                        <span className="text-gray-700 font-medium">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                            <FaEnvelope className="w-5 h-5 text-green-700" />
                        </div>
                        <span className="text-gray-700 font-medium">info@cliberduche.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                            <FaMapMarkerAlt className="w-5 h-5 text-green-700" />
                        </div>
                        <span className="text-gray-700 font-medium">123 Construction Ave, Build City</span>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md text-gray-900 p-8 rounded-2xl flex flex-col gap-6 shadow-xl border border-white/20">
                <h4 className="text-2xl font-semibold mb-2">Get In Touch</h4>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 placeholder-gray-500 focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 placeholder-gray-500 focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                />
                <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Project Details"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 placeholder-gray-500 focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none resize-none transition-all duration-300"
                ></textarea>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
}
