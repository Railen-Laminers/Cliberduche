import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import useScrollAnimation from '../homepage/useScrollAnimation';
import logo from '/logo/cliberduche_logo.png';
import PerspectiveCard from '../homepage/PerspectiveCard';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const [loginRef, loginAnimation] = useScrollAnimation(0.2);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('This is UI only, no login functionality yet.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b2545] via-[#1f7a8c] to-[#0b2545] flex items-center justify-center px-4">
            <div className="max-w-md w-full">

                {/* Back to Home */}
                <Link
                    to="/"
                    className="inline-flex items-center text-green-300 hover:text-green-100 transition-colors mb-6"
                >
                    <FaArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>

                {/* Login Card with Perspective */}
                <PerspectiveCard
                    className={`relative ${loginAnimation}`}
                    maxRotate={12}      // Maximum tilt angle
                    defaultScale={1.03} // Slight pop-out effect
                >
                    <div
                        ref={loginRef}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 pt-14 shadow-2xl border border-white/20"
                    >

                        {/* Floating Glass Logo */}
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                            <div className="bg-white/30 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/40">
                                <img
                                    src={logo}
                                    alt="Cliberduche Logo"
                                    className="w-14 h-auto"
                                />
                            </div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-white">
                                Login to Cliberduche
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Email */}
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-transparent focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                                    placeholder="Email Address"
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

                            {/* Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-transparent focus:border-green-400 focus:ring-2 focus:ring-green-400 outline-none transition-all duration-300"
                                    placeholder="Password"
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute left-4 transition-all duration-300
                    ${formData.password
                                            ? 'top-0 text-green-400 text-sm'
                                            : 'top-3 text-white/60 text-base peer-placeholder-shown:text-white/60 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-green-400 peer-focus:text-sm'
                                        }`}
                                >
                                    Password
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-green-400"
                                >
                                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* Remember / Forgot */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-green-600 bg-white/20 border-white/30 rounded focus:ring-green-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-white">
                                        Remember me
                                    </span>
                                </label>

                                <a href="#" className="text-green-300 hover:text-green-100 transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-4 text-center">
                            <p className="text-white/80 text-sm">
                                Don&apos;t have an account?{' '}
                                <a href="#" className="text-green-300 hover:text-green-100 font-medium">
                                    Contact us
                                </a>
                            </p>
                        </div>

                    </div>
                </PerspectiveCard>
            </div>
        </div>
    );
}
