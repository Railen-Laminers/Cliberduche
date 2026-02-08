import { useState } from 'react';
import { FaEdit, FaTrash, FaBan } from 'react-icons/fa';
import { deleteUser, deactivateUser } from '../../../api/axios';

export default function UserList({ users, isLoading, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const handleDeleteClick = (userId) => {
    setConfirmDelete(userId);
  };

  const handleConfirmDelete = async (userId) => {
    setConfirming(true);
    try {
      await deleteUser(userId);
      setConfirmDelete(null);
      onDelete();
    } catch (err) {
      alert('Failed to delete user: ' + (err?.response?.data?.message || err.message));
    } finally {
      setConfirming(false);
    }
  };

  const handleDeactivate = async (userId) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;
    
    try {
      await deactivateUser(userId);
      onDelete();
    } catch (err) {
      alert('Failed to deactivate user: ' + (err?.response?.data?.message || err.message));
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading users...</div>;
  }

  if (users.length === 0) {
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
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Roles</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm">
                {user.roles && user.roles.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <span
                        key={role.id}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                      >
                        {role.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">No roles</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-2 py-1 inline-block text-xs font-medium rounded ${
                    user.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
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
                      className="text-yellow-600 hover:text-yellow-800 transition-colors"
                      title="Deactivate user"
                    >
                      <FaBan className="w-4 h-4" />
                    </button>
                  )}
                  <div className="relative">
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete user"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                    
                    {confirmDelete === user.id && (
                      <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 rounded shadow-lg p-3 z-10 whitespace-nowrap">
                        <p className="text-sm text-gray-700 mb-2">Delete this user?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleConfirmDelete(user.id)}
                            disabled={confirming}
                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50"
                          >
                            {confirming ? 'Deleting...' : 'Delete'}
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
