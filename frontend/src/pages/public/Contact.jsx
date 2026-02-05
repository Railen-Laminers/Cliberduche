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
            className="px-6 md:px-10 py-16 md:py-20 bg-white"
        >
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-start">

                {/* ================= COMPANY INFO ================= */}
                <div
                    ref={infoRef}
                    className={`flex flex-col justify-center text-[#0b2545] transition-all duration-1000 ${infoAnim}`}
                >
                    <h3
                        ref={headingRef}
                        className={`text-3xl md:text-4xl font-bold mb-4 ${headingAnim}`}
                    >
                        Contact CLIBERDUCHE CORPORATION
                    </h3>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Whether you need backfilling materials, land development, or complete
                        construction solutions, CLIBERDUCHE CORPORATION is ready to support
                        your project. Let’s discuss how we can work together.
                    </p>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        We proudly serve clients across the <strong>CALABARZON region and beyond</strong>, delivering reliable,
                        sustainable, and cost-effective solutions for commercial and
                        industrial projects.
                    </p>

                    <div className="space-y-4">
                        <div className="mt-6">
                            <h5 className="text-lg font-semibold text-[#0b2545] mb-3">
                                Office Location
                            </h5>
                            <Map />
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <FaMapMarkerAlt className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-gray-700">
                                3rd floor CBD Building, Brgy. Pulo, National Highway,
                                Cabuyao City, Laguna 4025
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <FaPhone className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-gray-700">(+63) 9XX-XXX-XXXX</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <FaEnvelope className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-gray-700">info@cliberduche.com</span>
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
                        className="relative bg-white rounded-2xl p-6 pt-14 shadow-lg border border-gray-100 space-y-4 max-w-md w-full mx-auto"
                    >
                        {/* Floating Logo */}
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                            <div className="bg-white rounded-full p-2 shadow border border-gray-100">
                                <img
                                    src={logo}
                                    alt="Cliberduche Logo"
                                    className="w-14 h-auto"
                                />
                            </div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-6">
                            <h4 className="text-2xl font-bold text-[#0b2545]">
                                Request a Consultation
                            </h4>
                        </div>

                        {/* Name */}
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder=""
                                className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                            />
                            <label
                                htmlFor="name"
                                className={`absolute left-4 transition-all duration-300
                                    ${formData.name
                                        ? "top-0 text-green-600 text-sm"
                                        : "top-3 text-gray-500 text-base peer-focus:top-0 peer-focus:text-green-600 peer-focus:text-sm"
                                    }`}
                            >
                                Full Name
                            </label>
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=""
                                className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-4 transition-all duration-300
                                    ${formData.email
                                        ? "top-0 text-green-600 text-sm"
                                        : "top-3 text-gray-500 text-base peer-focus:top-0 peer-focus:text-green-600 peer-focus:text-sm"
                                    }`}
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Details */}
                        <div className="relative">
                            <textarea
                                id="details"
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder=""
                                className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 resize-none focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                            />
                            <label
                                htmlFor="details"
                                className={`absolute left-4 transition-all duration-300
                                    ${formData.details
                                        ? "top-0 text-green-600 text-sm"
                                        : "top-3 text-gray-500 text-base peer-focus:top-0 peer-focus:text-green-600 peer-focus:text-sm"
                                    }`}
                            >
                                Project Details
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-[#0b2545] hover:bg-[#1f7a8c] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#0b2545]"
                        >
                            Send Message
                        </button>
                    </form>
                </PerspectiveCard>
            </div>
        </section>
    );
}
