import { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../../api/axios';
import { FaTimes } from 'react-icons/fa';

const AVAILABLE_ROLES = [
  { name: 'admin', label: 'Administrator' },
  { name: 'department_head', label: 'Department Head / VP' },
  { name: 'hr_officer', label: 'HR Officer' },
  { name: 'finance_officer', label: 'Finance Officer' },
  { name: 'procurement_staff', label: 'Procurement Staff' },
  { name: 'safety_staff', label: 'Safety/Warehouse Staff' },
  { name: 'engineering_staff', label: 'Engineering Staff' },
];

export default function UserForm({ user, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roles: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        roles: user.roles?.map(r => r.name) || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleToggle = (roleName) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleName)
        ? prev.roles.filter(r => r !== roleName)
        : [...prev.roles, roleName]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        roles: formData.roles,
      };

      // Only include password if provided
      if (formData.password) {
        payload.password = formData.password;
      } else if (!user) {
        // Password is required for new users
        setError('Password is required');
        setIsLoading(false);
        return;
      }

      if (user) {
        await updateUser(user.id, payload);
      } else {
        await createUser(payload);
      }

      onSubmit();
    } catch (err) {
      setError(
        err?.response?.data?.message || 
        err?.message || 
        'An error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {user ? 'Edit User' : 'Create New User'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="email@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password {!user && <span className="text-red-600">*</span>}
          </label>
          <div className="relative">
            <input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!user}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder={user ? 'Leave blank to keep current password' : 'Enter a secure password'}
            />
            <button
              type="button"
              onClick={() => setPasswordShown(!passwordShown)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {passwordShown ? '✕' : '◉'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {user ? 'Leave blank to keep the current password' : 'Minimum 6 characters recommended'}
          </p>
        </div>

        {/* Roles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Assign Roles
          </label>
          <div className="space-y-2">
            {AVAILABLE_ROLES.map(role => (
              <label key={role.name} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.roles.includes(role.name)}
                  onChange={() => handleRoleToggle(role.name)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">{role.label}</span>
                  <span className="text-gray-500"> ({role.name})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? 'Saving...' : (user ? 'Update User' : 'Create User')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
