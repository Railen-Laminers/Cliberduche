import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaTimes, FaBars } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';

export default function Sidebar({ links = [] }) {
    const { user, hasRole, logout } = useAuth();
    const { pathname } = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await logout();
        }
    };

    // Filter links based on roles
    const availableLinks = links.filter(link =>
        !link.roles || link.roles.some(role => hasRole(role))
    );

    // Close sidebar on mobile when route changes
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative z-40
                w-64 min-h-screen bg-white border-r border-gray-200
                transform transition-transform duration-300
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {availableLinks.map(link => {
                            const Icon = link.icon;
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-semibold' : ''}`}
                                >
                                    {Icon && <Icon className="w-5 h-5" />}
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg mt-6"
                    >
                        <FaSignOutAlt className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}