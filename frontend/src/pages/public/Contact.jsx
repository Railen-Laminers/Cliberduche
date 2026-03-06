import React, { useState, useEffect } from "react";
import {
    FaPhone, FaEnvelope, FaInfinity, FaCheckCircle,
    FaTimes, FaClock, FaExclamationCircle, FaCheck, FaUserCheck
} from "react-icons/fa";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import Map from "./Map";
import MagneticButton from "../../components/MagneticButton";
import MicroAnimationCaptcha from "../../components/Captcha";

export default function Contact({ introDone = true }) {
    // Animation config (unchanged)
    const ANIM_CONFIG = {
        duration: "0.8s",
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        staggerBase: 0.6,
        paragraphStagger: 0.6,
    };

    // Form state
    const [formData, setFormData] = useState({
        subject: "",
        name: "",
        email: "",
        message: "",
        privacyAccepted: false,
    });

    // Validation state
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // CAPTCHA state
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const [showCaptchaModal, setShowCaptchaModal] = useState(false);

    // Allowed email domains (unchanged)
    const allowedDomains = new Set([
        "gmail.com", "yahoo.com", "yahoo.co.uk", "yahoo.com.ph",
        "outlook.com", "hotmail.com", "live.com", "icloud.com",
        "me.com", "aol.com", "protonmail.com", "mail.com",
        "gmx.com", "yandex.com",
    ]);

    // Minimum lengths
    const MIN_LENGTHS = {
        subject: 5,
        name: 2,
        email: 6,
        message: 10,
    };

    // Validation functions (unchanged)
    const validateField = (name, value) => {
        const val = typeof value === "string" ? value.trim() : value;
        switch (name) {
            case "subject":
                if (!val) return "Subject is required";
                if (val.length < MIN_LENGTHS.subject) return `Minimum ${MIN_LENGTHS.subject} characters`;
                return "";
            case "name":
                if (!val) return "Name is required";
                if (val.length < MIN_LENGTHS.name) return `Minimum ${MIN_LENGTHS.name} characters`;
                return "";
            case "email": {
                if (!val) return "Email is required";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) return "Invalid email format";
                const domain = val.split('@')[1]?.toLowerCase();
                if (!domain || !allowedDomains.has(domain)) {
                    return "Please use Gmail, Yahoo, Outlook, etc.";
                }
                return "";
            }
            case "message":
                if (!val) return "Message is required";
                if (val.length < MIN_LENGTHS.message) return `Minimum ${MIN_LENGTHS.message} characters`;
                return "";
            case "privacyAccepted":
                return !value ? "You must accept the privacy policy" : "";
            default:
                return "";
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handlers
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: val }));

        if (touched[name]) {
            const error = validateField(name, val);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }

        if (submitError) setSubmitError(null);
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));

        const error = validateField(name, formData[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaPassed) {
            setSubmitError("Please complete the human verification first.");
            return;
        }

        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        const apiUrl = "/api/contact";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    ...(csrfToken && { "X-CSRF-TOKEN": csrfToken }),
                },
                body: JSON.stringify({
                    subject: formData.subject.trim(),
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    message: formData.message.trim(),
                    privacyAccepted: formData.privacyAccepted,
                }),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error(
                    `Server returned ${response.status} with non-JSON response: ${text.substring(0, 100)}`
                );
            }

            const result = await response.json();

            if (response.ok && result.success) {
                setFormData({
                    subject: "",
                    name: "",
                    email: "",
                    message: "",
                    privacyAccepted: false,
                });
                setErrors({});
                setTouched({});
                setShowSuccessModal(true);
                setCaptchaPassed(false); // Reset for next message
            } else {
                if (result.errors) {
                    const serverErrors = {};
                    Object.entries(result.errors).forEach(([field, messages]) => {
                        serverErrors[field] = messages.join(", ");
                    });
                    setErrors(serverErrors);
                    setSubmitError("Please check the fields below");
                } else {
                    setSubmitError(result.message || "Failed to send message. Please try again.");
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError(
                error.message || "Network error. Please check your connection and try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Responsive height fix
    useEffect(() => {
        const setVh = () => {
            document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
        };
        setVh();
        window.addEventListener("resize", setVh);
        return () => window.removeEventListener("resize", setVh);
    }, []);

    // Scroll animations
    const [headingRef, headingAnim, headingVisible] = useScrollAnimation(0.2, introDone);
    const [infoRef, infoAnim, infoVisible] = useScrollAnimation(0.2, introDone);
    const [formRef, formAnim, formVisible] = useScrollAnimation(0.2, introDone);

    const fadeUpStyle = (visible, delay) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity ${ANIM_CONFIG.duration} ${ANIM_CONFIG.easing}, transform ${ANIM_CONFIG.duration} ${ANIM_CONFIG.easing}`,
        transitionDelay: `${delay}s`,
    });

    const getFieldClasses = (fieldName) => {
        const isError = touched[fieldName] && errors[fieldName];
        const isValid = touched[fieldName] && !errors[fieldName] && formData[fieldName];
        return {
            inputClass: `peer w-full px-4 pt-6 pb-2 rounded-sm bg-gray-50 border text-gray-800 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isError
                    ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    : isValid
                        ? "border-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                        : "border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                }`,
            labelClass: `absolute left-4 transition-all duration-300 pointer-events-none ${formData[fieldName] ? "top-1 text-xs" : "top-4 text-base peer-focus:top-1 peer-focus:text-xs"
                } ${isError
                    ? "text-red-600"
                    : isValid
                        ? "text-green-600"
                        : "text-gray-500 peer-focus:text-green-600"
                }`,
        };
    };

    const isPrivacyError = touched.privacyAccepted && errors.privacyAccepted;

    // CAPTCHA success handler
    const handleCaptchaSuccess = () => {
        setCaptchaPassed(true);
        setShowCaptchaModal(false);
    };

    return (
        <section
            id="contact"
            className="relative p-6 md:px-10 bg-transparent overflow-hidden flex flex-col justify-center"
            style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
        >
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
                {/* LEFT COLUMN – unchanged */}
                <div
                    ref={infoRef}
                    className={`flex flex-col text-gray-800 transition-all duration-1000 ${infoAnim}`}
                >
                    {/* ... (same as before) */}
                    <div ref={headingRef} className={`mb-8 transition-all duration-1000 ${headingAnim}`}>
                        <div style={fadeUpStyle(headingVisible, 0)} className="flex items-center gap-4 mb-2">
                            <div className="h-px w-16 bg-green-300"></div>
                            <FaInfinity className="text-green-600 text-2xl" />
                            <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">Contact Us</h3>
                        </div>
                    </div>

                    <div className="space-y-6 mb-8" style={fadeUpStyle(infoVisible, 0 * ANIM_CONFIG.paragraphStagger)}>
                        <div>
                            <h4 className="text-lg font-semibold text-green-800 mb-1">Cabuyao Office</h4>
                            <p className="text-sm text-gray-600">4025</p>
                            <p className="text-sm text-gray-600">
                                3rd floor CBD Building, Brgy. Pulo, National Highway, Cabuyao City, Laguna
                            </p>
                            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                                <FaPhone className="text-green-600 w-3 h-3" /> +63 49 546-6107
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                <FaEnvelope className="text-green-600 w-3 h-3" /> cliberduche.corp@yahoo.com
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                <FaClock className="text-green-600 w-3 h-3" /> Mon-Fri 8AM - 6PM
                            </p>
                        </div>
                    </div>

                    <div className="mb-8" style={fadeUpStyle(infoVisible, 1 * ANIM_CONFIG.paragraphStagger)}>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Core Services
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                            <li>Backfill & Land Sourcing</li>
                            <li>Land Development</li>
                            <li>Site Management</li>
                            <li>Equipment Leasing</li>
                            <li>Project Management Consultation</li>
                        </ul>
                    </div>

                    <div
                        className="flex space-x-8 text-sm text-gray-600 mb-10"
                        style={fadeUpStyle(infoVisible, 2 * ANIM_CONFIG.paragraphStagger)}
                    >
                        <p><span className="font-medium">Founded:</span> 2018</p>
                        <p><span className="font-medium">Incorporated:</span> November 28, 2018</p>
                    </div>

                    <div style={fadeUpStyle(infoVisible, 3 * ANIM_CONFIG.paragraphStagger)}>
                        <div className="rounded-sm overflow-hidden border border-gray-200 shadow-sm">
                            <Map />
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right">MAP</p>
                    </div>
                </div>

                {/* RIGHT COLUMN – FORM */}
                <div
                    ref={formRef}
                    className={`transition-all duration-1000 ${formAnim}`}
                    style={fadeUpStyle(formVisible, 0)}
                >
                    <div className="bg-transparent rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <h4 className="text-xl font-light text-gray-800 border-b border-gray-200 pb-3">
                                Send us a message
                            </h4>

                            {submitError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm flex items-start gap-2">
                                    <FaExclamationCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span className="whitespace-pre-wrap">{submitError}</span>
                                </div>
                            )}

                            {/* Subject field */}
                            <div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        disabled={isSubmitting}
                                        placeholder=" "
                                        className={getFieldClasses("subject").inputClass}
                                    />
                                    <label htmlFor="subject" className={getFieldClasses("subject").labelClass}>
                                        Subject *
                                    </label>
                                    {touched.subject && !errors.subject && formData.subject && (
                                        <FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />
                                    )}
                                </div>
                                {touched.subject && errors.subject && (
                                    <p className="text-xs text-gray-500 italic mt-1">{errors.subject}</p>
                                )}
                            </div>

                            {/* Name field */}
                            <div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        disabled={isSubmitting}
                                        placeholder=" "
                                        className={getFieldClasses("name").inputClass}
                                    />
                                    <label htmlFor="name" className={getFieldClasses("name").labelClass}>
                                        Name *
                                    </label>
                                    {touched.name && !errors.name && formData.name && (
                                        <FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />
                                    )}
                                </div>
                                {touched.name && errors.name && (
                                    <p className="text-xs text-gray-500 italic mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email field */}
                            <div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        disabled={isSubmitting}
                                        placeholder=" "
                                        className={getFieldClasses("email").inputClass}
                                    />
                                    <label htmlFor="email" className={getFieldClasses("email").labelClass}>
                                        Email Address *
                                    </label>
                                    {touched.email && !errors.email && formData.email && (
                                        <FaCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />
                                    )}
                                </div>
                                {touched.email && errors.email && (
                                    <p className="text-xs text-gray-500 italic mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Message field */}
                            <div>
                                <div className="relative">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        disabled={isSubmitting}
                                        placeholder=" "
                                        className={getFieldClasses("message").inputClass}
                                    />
                                    <label htmlFor="message" className={getFieldClasses("message").labelClass}>
                                        Message *
                                    </label>
                                    {touched.message && !errors.message && formData.message && (
                                        <FaCheck className="absolute right-3 top-6 text-green-500 w-4 h-4" />
                                    )}
                                </div>
                                {touched.message && errors.message && (
                                    <p className="text-xs text-gray-500 italic mt-1">{errors.message}</p>
                                )}
                            </div>

                            {/* Human verification row */}
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm text-gray-600">Human verification</span>
                                {captchaPassed ? (
                                    <span className="flex items-center gap-2 text-green-600 text-sm">
                                        <FaCheckCircle /> Verified
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setShowCaptchaModal(true)}
                                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-sm transition-colors border border-gray-300"
                                    >
                                        Verify
                                    </button>
                                )}
                            </div>

                            {/* Required note & Privacy checkbox */}
                            <div className="space-y-3">
                                <p className="text-xs text-gray-400">* Required</p>
                                <div>
                                    <label
                                        className={`flex items-start space-x-3 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            name="privacyAccepted"
                                            checked={formData.privacyAccepted}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isSubmitting}
                                            className={`mt-1 w-4 h-4 rounded-sm focus:ring-2 disabled:cursor-not-allowed transition-all duration-200 ${isPrivacyError
                                                    ? "border-2 border-red-400 text-red-600 focus:ring-red-100"
                                                    : "border border-gray-300 text-green-600 focus:ring-green-500"
                                                }`}
                                        />
                                        <span
                                            className={`text-xs leading-tight ${isPrivacyError ? "text-red-600" : "text-gray-600"
                                                }`}
                                        >
                                            Privacy Policy – I agree to send my information and be contacted.
                                        </span>
                                    </label>
                                    {touched.privacyAccepted && errors.privacyAccepted && (
                                        <p className="text-xs text-gray-500 italic mt-1">{errors.privacyAccepted}</p>
                                    )}
                                </div>
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
                                        disabled={isSubmitting || !captchaPassed}
                                        className={`bg-green-700 hover:bg-green-800 text-white py-3 px-8 rounded-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-green-700`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </button>
                                </MagneticButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* CAPTCHA Modal */}
            {showCaptchaModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowCaptchaModal(false)}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowCaptchaModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Verification</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Click the animation that stops moving first.
                        </p>
                        <MicroAnimationCaptcha onSuccess={handleCaptchaSuccess} />
                    </div>
                </div>
            )}

            {/* Success Modal (unchanged) */}
            {showSuccessModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowSuccessModal(false)}
                >
                    <div
                        className="bg-white rounded-sm shadow-xl max-w-sm w-full p-6 relative animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close modal"
                            disabled={isSubmitting}
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                        <div className="text-center">
                            <FaCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                            <p className="text-gray-600 mb-6">
                                Thank you for reaching out. We'll get back to you as soon as possible.
                                <br />
                                <span className="text-sm text-green-600">
                                    A confirmation email has been sent to your inbox.
                                </span>
                            </p>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
        </section>
    );
}