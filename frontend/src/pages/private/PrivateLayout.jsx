import { useState, useMemo } from 'react';
import { FaCog, FaHome } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateLayout({ children }) {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false); // Desktop collapse

    const sidebarLinks = [
        { label: 'Home', path: '/dashboard', icon: FaHome, roles: ['admin', 'hr_officer', 'finance_officer', 'department_head', 'procurement_staff', 'safety_staff', 'engineering_staff'] },
        { label: 'User Management', path: '/admin/users', icon: FaCog, roles: ['admin'] },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                links={sidebarLinks}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                isMinimized={isSidebarMinimized}
                setIsMinimized={setIsSidebarMinimized}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Header onBurgerClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
