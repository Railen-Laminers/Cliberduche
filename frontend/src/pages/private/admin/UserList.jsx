import { useState } from 'react';
import { FaEdit, FaTrash, FaBan } from 'react-icons/fa';
import useMutation from '../../../hooks/useMutation';
import { deleteUser, deactivateUser } from '../../../api/axios';

// Keep the same mapping as in UserForm so we can render friendly labels
const AVAILABLE_ROLES = [
  { name: 'admin', apiName: 'admin', label: 'Administrator' },
  { name: 'department_head', apiName: 'head', label: 'Department Head / VP' },
  { name: 'hr_officer', apiName: 'hr_officer', label: 'HR Officer' },
  { name: 'finance_officer', apiName: 'finance_officer', label: 'Finance Officer' },
  { name: 'procurement_staff', apiName: 'procurement_staff', label: 'Procurement Staff' },
  { name: 'safety_staff', apiName: 'safety_staff', label: 'Safety/Warehouse Staff' },
  { name: 'engineering_staff', apiName: 'engineering_staff', label: 'Engineering Staff' },
];

function roleLabelFromApiName(apiName) {
  const found = AVAILABLE_ROLES.find(r => r.apiName === apiName || r.name === apiName);
  return found ? found.label : apiName;
}

export default function UserList({ users = [], isLoading, onEdit, onDelete, onUpdate }) {
  const [activeAction, setActiveAction] = useState({ type: null, id: null });

  const deleteMutation = useMutation(deleteUser);
  const deactivateMutation = useMutation(deactivateUser);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    setActiveAction({ type: 'delete', id: userId });
    try {
      await deleteMutation.mutate(userId);
      onDelete?.(userId);
    } catch {
      alert(deleteMutation.error || 'Failed to delete user');
    } finally {
      setActiveAction({ type: null, id: null });
    }
  };

  const handleDeactivate = async (userId) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;

    setActiveAction({ type: 'deactivate', id: userId });
    try {
      const updatedUser = await deactivateMutation.mutate(userId);
      onUpdate?.(updatedUser);
    } catch {
      alert(deactivateMutation.error || 'Failed to deactivate user');
    } finally {
      setActiveAction({ type: null, id: null });
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading users...</div>;
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Roles</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isDeleting = activeAction.type === 'delete' && activeAction.id === user.id && deleteMutation.isLoading;
            const isDeactivating = activeAction.type === 'deactivate' && activeAction.id === user.id && deactivateMutation.isLoading;

            return (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.department ? user.department.name : <span className="text-gray-400">—</span>}
                </td>

                <td className="px-6 py-4 text-sm">
                  {user.roles && user.roles.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role, idx) => {
                        const apiName = typeof role === 'string' ? role : role.name;
                        const label = roleLabelFromApiName(apiName);
                        return (
                          <span
                            key={role.id ?? apiName ?? idx}
                            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                          >
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-gray-400">No roles</span>
                  )}
                </td>

                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 inline-block text-xs font-medium rounded ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit user"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>

                    {user.active && (
                      <button
                        onClick={() => handleDeactivate(user.id)}
                        disabled={isDeactivating || isDeleting}
                        className="text-yellow-600 hover:text-yellow-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Deactivate user"
                      >
                        {isDeactivating ? (
                          <span className="text-xs">Deactivating...</span>
                        ) : (
                          <FaBan className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={isDeleting || isDeactivating}
                      className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete user"
                    >
                      {isDeleting ? <span className="text-xs">Deleting...</span> : <FaTrash className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
