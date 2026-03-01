// Contact.jsx
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInfinity } from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import Map from "./Map";
import BackgroundDecor from "../../components/BackgroundDecor";
import MagneticButton from "../../components/MagneticButton";

export default function Contact({ introDone = true }) {
    const [formData, setFormData] = useState({
        subject: "",
        name: "",
        email: "",
        message: "",
        privacyAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.privacyAccepted) {
            alert("Please accept the Privacy Policy to send the message.");
            return;
        }
        console.log("Form submitted:", formData);
        setFormData({
            subject: "",
            name: "",
            email: "",
            message: "",
            privacyAccepted: false,
        });
    };

    // Scroll animations
    const [headingRef, headingAnim] = useScrollAnimation(0.2, introDone);
    const [infoRef, infoAnim] = useScrollAnimation(0.2, introDone);
    const [formRef, formAnim] = useScrollAnimation(0.2, introDone);

    const ANIM_DURATION = "1.2s";
    const ANIM_EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)";

    const fadeUpStyle = (visible, delay) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity ${ANIM_DURATION} ${ANIM_EASING}, transform ${ANIM_DURATION} ${ANIM_EASING}`,
        transitionDelay: `${delay}s`,
    });

    return (
        <section
            id="contact"
            className="relative px-6 md:px-10 py-16 md:py-20 bg-white overflow-hidden"
        >
            <BackgroundDecor pattern="grid" color="green" opacity={0.05} blurCircles={false} />

            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-start relative z-10">
                {/* LEFT COLUMN – COMPANY INFO & MAP */}
                <div
                    ref={infoRef}
                    className={`flex flex-col text-gray-800 transition-all duration-1000 ${infoAnim}`}
                >
                    <div ref={headingRef} className={`mb-8 transition-all duration-1000 ${headingAnim}`}>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px w-16 bg-green-300"></div>
                            <FaInfinity className="text-green-600 text-2xl" />
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">Contact Us</h3>
                        </div>
                    </div>

                    <div className="space-y-6 mb-8" style={fadeUpStyle(infoAnim !== "" ? true : false, 0)}>
                        <div>
                            <h4 className="text-lg font-semibold text-green-800 mb-1">Cabuyao Office</h4>
                            <p className="text-sm text-gray-600">4025</p>
                            <p className="text-sm text-gray-600">
                                3rd floor CBD Building, Brgy. Pulo, National Highway, Cabuyao City, Laguna
                            </p>
                            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                                <FaPhone className="text-green-600 w-3 h-3" /> (+63) 999 999 9999
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                <FaEnvelope className="text-green-600 w-3 h-3" /> info@cliberduche.com
                            </p>
                        </div>
                    </div>

                    <div className="mb-8" style={fadeUpStyle(infoAnim !== "" ? true : false, 0.1)}>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Core Services
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                            <li>Supply of high‑quality backfill materials (sub‑base, aggregates, boulders)</li>
                            <li>Land development – clearing, cutting & peeling, levelling, pipe laying</li>
                            <li>Infrastructure construction – bridges, concrete roads, gutters, ripraps, slope protection</li>
                            <li>General Engineering and Civil Works</li>
                            <li>Equipment leasing</li>
                            <li>Project Management Consultation</li>
                        </ul>
                    </div>

                    <div className="flex space-x-8 text-sm text-gray-600 mb-10" style={fadeUpStyle(infoAnim !== "" ? true : false, 0.2)}>
                        <p><span className="font-medium">Founded:</span> 2018</p>
                        <p><span className="font-medium">Incorporated:</span> November 28, 2018</p>
                    </div>

                    <div style={fadeUpStyle(infoAnim !== "" ? true : false, 0.3)}>
                        <div className="rounded-sm overflow-hidden border border-gray-200 shadow-sm">
                            <Map />
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right">MAP</p>
                    </div>
                </div>

                {/* RIGHT COLUMN – FORM (unchanged) */}
                <div ref={formRef} className={`transition-all duration-1000 ${formAnim}`}>
                    <div className="bg-white rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h4 className="text-xl font-light text-gray-800 border-b border-gray-200 pb-3">
                                Send us a message
                            </h4>

                            {/* Subject */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 rounded-sm bg-gray-50 border border-gray-200 text-gray-800 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                                />
                                <label
                                    htmlFor="subject"
                                    className={`absolute left-4 transition-all duration-300 pointer-events-none
                    ${formData.subject
                                            ? "top-1 text-green-600 text-xs"
                                            : "top-4 text-gray-500 text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-xs"
                                        }`}
                                >
                                    Subject *
                                </label>
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
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 rounded-sm bg-gray-50 border border-gray-200 text-gray-800 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                                />
                                <label
                                    htmlFor="name"
                                    className={`absolute left-4 transition-all duration-300 pointer-events-none
                    ${formData.name
                                            ? "top-1 text-green-600 text-xs"
                                            : "top-4 text-gray-500 text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-xs"
                                        }`}
                                >
                                    Name *
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
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 rounded-sm bg-gray-50 border border-gray-200 text-gray-800 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
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

                            {/* Message */}
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 rounded-sm bg-gray-50 border border-gray-200 text-gray-800 resize-none focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                                />
                                <label
                                    htmlFor="message"
                                    className={`absolute left-4 transition-all duration-300 pointer-events-none
                    ${formData.message
                                            ? "top-1 text-green-600 text-xs"
                                            : "top-4 text-gray-500 text-base peer-focus:top-1 peer-focus:text-green-600 peer-focus:text-xs"
                                        }`}
                                >
                                    Message *
                                </label>
                            </div>

                            {/* Required note & Privacy checkbox */}
                            <div className="space-y-3">
                                <p className="text-xs text-gray-400">* Required</p>
                                <label className="flex items-start space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="privacyAccepted"
                                        checked={formData.privacyAccepted}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded-sm focus:ring-green-500"
                                    />
                                    <span className="text-xs text-gray-600 leading-tight">
                                        Privacy Policy – I agree to send my information and be contacted.
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-start">
                                <MagneticButton
                                    magnetStrength={2}
                                    padding={100}
                                    wrapperClassName="inline-block"
                                    innerClassName=""
                                >
                                    <button
                                        type="submit"
                                        className="bg-green-700 hover:bg-green-800 text-white py-3 px-8 rounded-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        Send Message
                                    </button>
                                </MagneticButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}