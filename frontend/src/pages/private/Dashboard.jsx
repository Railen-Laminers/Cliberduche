import { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { user, hasRole } = useAuth();

  const primaryRole = useMemo(() => {
    if (!user || !user.roles) return null;
    return user.roles.length ? user.roles[0].name : null;
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome, {user?.name}.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {hasRole('admin') && (
          <div className="p-4 border rounded">
            <h2 className="font-semibold">Admin</h2>
            <p className="text-sm text-gray-600">Manage users, roles, departments, and permissions.</p>
          </div>
        )}

        {hasRole('department_head') && (
          <div className="p-4 border rounded">
            <h2 className="font-semibold">Department Head</h2>
            <p className="text-sm text-gray-600">Approve requests and view department reports.</p>
          </div>
        )}

        {hasRole('hr_officer') && (
          <div className="p-4 border rounded">
            <h2 className="font-semibold">HR</h2>
            <p className="text-sm text-gray-600">Manage employee files, hiring and benefits.</p>
          </div>
        )}

        {hasRole('finance_officer') && (
          <div className="p-4 border rounded">
            <h2 className="font-semibold">Finance</h2>
            <p className="text-sm text-gray-600">Bookkeeping, payroll and financial reports.</p>
          </div>
        )}

        {hasRole('procurement_staff') && (
          <div className="p-4 border rounded">
            <h2 className="font-semibold">Procurement</h2>
            <p className="text-sm text-gray-600">Purchase orders and supplier coordination.</p>
          </div>
        )}

        {hasRole('safety_staff') && (
          <div className="p-4 border rounded">
            <h2 className="font-semibold">Safety / Warehouse</h2>
            <p className="text-sm text-gray-600">Inventory control and safety inspections.</p>
          </div>
        )}

        {hasRole('engineering_staff') && (
          <div className="p-4 border rounded">
            <h2 className="font-semibold">Engineering</h2>
            <p className="text-sm text-gray-600">Project planning, QA/QC and timelines.</p>
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500">Primary role: {primaryRole || '—'}</div>
    </div>
  );
}
