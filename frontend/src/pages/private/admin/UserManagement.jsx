import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UserList from './UserList';
import UserForm from './UserForm';
import { FaPlus } from 'react-icons/fa';
import { getUsers } from '../../../api/axios';
import PrivateLayout from '../PrivateLayout';

export default function UserManagement() {
  const { user, hasRole, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if not admin
  if (!loading && (!user || !hasRole('admin'))) {
    return <Navigate to="/dashboard" replace />;
  }

  // Fetch users once on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users: ' + (err?.response?.data?.message || err.message));
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditUser = (userData) => {
    setSelectedUser(userData);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  // Called by UserForm with the saved user object (from API)
  const handleFormSubmit = (savedUser) => {
    // savedUser should be the API response object (with id, roles as objects, etc)
    if (!savedUser) {
      // defensive fallback: close the form
      handleFormClose();
      return;
    }

    if (selectedUser) {
      // Edit: replace the existing user in state
      setUsers((prev) => prev.map((u) => (u.id === savedUser.id ? savedUser : u)));
    } else {
      // Add: prepend new user
      setUsers((prev) => [savedUser, ...prev]);
    }

    handleFormClose();
  };

  // Called by UserList when a user is deleted successfully
  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Called by UserList when a user is updated on the server (e.g., deactivate)
  const handleUpdateUser = (updatedUser) => {
    if (!updatedUser) return;
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  if (loading) return null;

  return (
    <PrivateLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showForm ? (
        <div className="mb-8">
          <UserForm
            user={selectedUser}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit} // receives savedUser
          />
        </div>
      ) : (
        <UserList
          users={users}
          isLoading={isLoading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}   // receives id
          onUpdate={handleUpdateUser}   // receives updatedUser
        />
      )}
    </PrivateLayout>
  );
}
