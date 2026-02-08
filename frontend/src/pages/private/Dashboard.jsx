import { useMemo } from 'react';
import { FaCog, FaHome } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { user, hasRole } = useAuth();

  const primaryRole = useMemo(() => {
    if (!user || !user.roles) return null;
    return user.roles.length ? user.roles[0].name : null;
  }, [user]);

  // Pass links as props to Sidebar
  const sidebarLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: FaHome, roles: ['admin', 'hr_officer', 'finance_officer', 'department_head', 'procurement_staff', 'safety_staff', 'engineering_staff'] },
    { label: 'User Management', path: '/admin/users', icon: FaCog, roles: ['admin'] },
    // Add more links here dynamically
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Adjusts for mobile with collapsible behavior */}
      <div className="lg:w-64">
        <Sidebar links={sidebarLinks} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 overflow-x-hidden">

        {/* User Info Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm sm:shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Your Information
          </h2>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Name */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Name</p>
              <p className="text-base sm:text-lg font-medium text-gray-900 truncate">
                {user?.name}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Email</p>
              <p className="text-base sm:text-lg font-medium text-gray-900 break-words">
                {user?.email}
              </p>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Status</p>
              <p className={`text-base sm:text-lg font-medium ${user?.active ? 'text-green-600' : 'text-red-600'}`}>
                {user?.active ? 'Active' : 'Inactive'}
              </p>
            </div>

            {/* Primary Role */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-500">Primary Role</p>
              <p className="text-base sm:text-lg font-medium text-blue-600 capitalize truncate">
                {primaryRole || '—'}
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}