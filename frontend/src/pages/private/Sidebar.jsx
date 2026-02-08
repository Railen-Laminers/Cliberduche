import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function Sidebar({ links = [], isOpen, setIsOpen, isMinimized, setIsMinimized }) {
    const { hasRole } = useAuth();
    const { pathname } = useLocation();

    const availableLinks = links.filter(link =>
        !link.roles || link.roles.some(role => hasRole(role))
    );

    // Close sidebar on mobile when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`
                  fixed lg:relative z-40 min-h-screen bg-white border-r border-gray-200
                  transform transition-all duration-300 ease-in-out
                  ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                  ${isMinimized ? 'w-20' : 'w-64'}
                  flex-shrink-0
              `}
            >
                <div className="h-full flex flex-col">
                    {/* Header with collapse button */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        {!isMinimized && <h1 className="text-2xl font-bold text-gray-900">Menu</h1>}
                        <button
                            className="p-1 rounded hover:bg-gray-100 focus:outline-none"
                            onClick={() => setIsMinimized(prev => !prev)}
                        >
                            {isMinimized ? (
                                <AiOutlineRight className="w-5 h-5 text-gray-700" />
                            ) : (
                                <AiOutlineLeft className="w-5 h-5 text-gray-700" />
                            )}
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2 p-2">
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
                                    {!isMinimized && <span>{link.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
