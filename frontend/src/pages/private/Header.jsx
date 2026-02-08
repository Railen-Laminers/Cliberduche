import { useState, useRef, useEffect } from 'react';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

export default function Header({ onBurgerClick }) {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await logout();
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Generate initials
    const initials = user
        ? user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        : '';

    return (
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm">
            {/* Left: Mobile Burger Menu */}
            <div className="lg:hidden">
                <button
                    onClick={onBurgerClick}
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                >
                    <FaBars className="w-5 h-5" />
                </button>
            </div>

            {/* Center / Logo placeholder */}
            <div className="flex-1 text-center lg:text-left">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            {/* Right: User Icon */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg hover:bg-blue-700 transition"
                >
                    {initials}
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            <FaSignOutAlt className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
