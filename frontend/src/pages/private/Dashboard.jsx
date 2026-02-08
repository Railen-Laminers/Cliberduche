import { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PrivateLayout from './PrivateLayout';

export default function Dashboard() {
  const { user } = useAuth();

  const primaryRole = useMemo(() => {
    if (!user || !user.roles) return null;
    return user.roles.length ? user.roles[0].name : null;
  }, [user]);

  return (
    <PrivateLayout>
      {/* User Info Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm sm:shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
          Your Information
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-500">Name</p>
            <p className="text-base sm:text-lg font-medium text-gray-900 truncate">
              {user?.name}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-500">Email</p>
            <p className="text-base sm:text-lg font-medium text-gray-900 break-words">
              {user?.email}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-500">Status</p>
            <p className={`text-base sm:text-lg font-medium ${user?.active ? 'text-green-600' : 'text-red-600'}`}>
              {user?.active ? 'Active' : 'Inactive'}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-500">Primary Role</p>
            <p className="text-base sm:text-lg font-medium text-blue-600 capitalize truncate">
              {primaryRole || '—'}
            </p>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
