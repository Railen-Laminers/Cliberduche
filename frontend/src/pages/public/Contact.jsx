// Contact.jsx
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import Map from "./Map";
import PerspectiveCard from "../../components/PerspectiveCard";
import logo from "/logo/cliberduche_logo.png";

export default function Contact({ introDone = true }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        details: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setFormData({ name: "", email: "", details: "" });
    };

    const [headingRef, headingAnim] = useScrollAnimation(0.2, introDone);
    const [infoRef, infoAnim] = useScrollAnimation(0.2, introDone);
    const [formRef, formAnim] = useScrollAnimation(0.2, introDone);

    return (
        <section
            id="contact"
            className="relative px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
        >
            {/* Subtle decorative dots pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(circle,_#0b2545_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_#1f7a8c_1px,_transparent_1px)] bg-[length:30px_30px]"></div>
            </div>

            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-start relative z-10">

                {/* ================= COMPANY INFO ================= */}
                <div
                    ref={infoRef}
                    className={`flex flex-col justify-center text-[#0b2545] transition-all duration-1000 ${infoAnim}`}
                >
                    <h3
                        ref={headingRef}
                        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${headingAnim}`}
                    >
                        Contact <span className="text-green-600">CLIBERDUCHE</span>
                    </h3>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Whether you need backfilling materials, land development, or complete
                        construction solutions, CLIBERDUCHE CORPORATION is ready to support
                        your project. Let’s discuss how we can work together.
                    </p>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        We proudly serve clients across the <strong className="text-[#0b2545]">CALABARZON region and beyond</strong>, delivering reliable,
                        sustainable, and cost-effective solutions for commercial and
                        industrial projects.
                    </p>

                    {/* Office Location with Map */}
                    <div className="mb-8">
                        <h5 className="text-lg font-semibold text-[#0b2545] mb-4 flex items-center">
                            <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
                            Office Location
                        </h5>
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                            <Map />
                        </div>
                    </div>

                    {/* Contact Details as Cards */}
                    <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaMapMarkerAlt className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-[#0b2545]">Visit Us</p>
                                <p className="text-gray-600">
                                    3rd floor CBD Building, Brgy. Pulo, National Highway,
                                    Cabuyao City, Laguna 4025
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaPhone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-[#0b2545]">Call Us</p>
                                <p className="text-gray-600">(+63) 9XX-XXX-XXXX</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaEnvelope className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-[#0b2545]">Email Us</p>
                                <p className="text-gray-600">info@cliberduche.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= CONTACT FORM ================= */}
                <PerspectiveCard
                    className={`relative ${formAnim}`}
                    maxRotate={8}
                    defaultScale={1}
                >
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="relative bg-white rounded-2xl p-6 pt-14 shadow-xl border border-gray-200 space-y-5 max-w-md w-full mx-auto"
                        style={{
                            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,128,0,0.05) inset",
                        }}
                    >
                        {/* Floating Logo with gradient ring */}
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                            <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-full p-1 shadow-lg">
                                <div className="bg-white rounded-full p-2">
                                    <img
                                        src={logo}
                                        alt="Cliberduche Logo"
                                        className="w-14 h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-4">
                            <h4 className="text-2xl font-bold text-[#0b2545]">
                                Request a Consultation
                            </h4>
                            <p className="text-gray-500 text-sm mt-1">
                                We'll get back to you within 24 hours
                            </p>
                        </div>

                        {/* Name Field */}
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                            />
                            <label
                                htmlFor="name"
                                className={`absolute left-4 transition-all duration-300 pointer-events-none
                                    ${formData.name
                                        ? "top-1 text-green-600 text-xs"
                                        : "top-4 text-gray-500 text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-xs"
                                    }`}
                            >
                                Full Name *
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
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-4 transition-all duration-300 pointer-events-none
                                    ${formData.email
                                        ? "top-1 text-green-600 text-xs"
                                        : "top-4 text-gray-500 text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-xs"
                                    }`}
                            >
                                Email Address *
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
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 resize-none focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                            />
                            <label
                                htmlFor="details"
                                className={`absolute left-4 transition-all duration-300 pointer-events-none
                                    ${formData.details
                                        ? "top-1 text-green-600 text-xs"
                                        : "top-4 text-gray-500 text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-xs"
                                    }`}
                            >
                                Project Details *
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#0b2545] to-[#1f7a8c] hover:from-[#1f7a8c] hover:to-[#0b2545] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#0b2545]/50"
                        >
                            Send Message
                        </button>

                        {/* Footer note */}
                        <p className="text-xs text-gray-400 text-center mt-2">
                            We respect your privacy. No spam.
                        </p>
                    </form>
                </PerspectiveCard>
            </div>
        </section>
    );
}