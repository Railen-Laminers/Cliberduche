import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UserList from './UserList';
import UserForm from './UserForm';
import { FaPlus } from 'react-icons/fa';
import useQuery from '../../../hooks/useQuery';
import { getUsers } from '../../../api/axios';
import PrivateLayout from '../PrivateLayout';

export default function UserManagement() {
  const { user: authUser, hasRole, loading: authLoading } = useAuth();

  // Fetch users via useQuery
  const { data: fetchedUsers, isLoading: queryLoading, error: queryError, refetch } = useQuery(getUsers, []);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Redirect if not admin
  if (!authLoading && (!authUser || !hasRole('admin'))) {
    return <Navigate to="/dashboard" replace />;
  }

  // keep local state in sync with fetched data
  useEffect(() => {
    if (fetchedUsers) setUsers(fetchedUsers);
  }, [fetchedUsers]);

  // Show a top-level loading while auth or query loads
  if (authLoading) return null;

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
    if (!savedUser) {
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

    // optionally refetch to ensure server-side canonical ordering/details
    // refetch();
    handleFormClose();
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleUpdateUser = (updatedUser) => {
    if (!updatedUser) return;
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

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

      {queryError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {queryError}
        </div>
      )}

      {showForm ? (
        <div className="mb-8">
          <UserForm user={selectedUser} onClose={handleFormClose} onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <UserList
          users={users}
          isLoading={queryLoading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onUpdate={handleUpdateUser}
        />
      )}
    </PrivateLayout>
  );
}
