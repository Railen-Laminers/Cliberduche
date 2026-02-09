import { useState, useEffect } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { createUser, updateUser, getDepartments } from '../../../api/axios';
import useMutation from '../../../hooks/useMutation';

// NOTE: apiName = the role name expected by the backend; name = the frontend/local id used in the UI
const AVAILABLE_ROLES = [
  { name: 'admin', apiName: 'admin', label: 'Administrator' },
  { name: 'department_head', apiName: 'department_head', label: 'Department Head / VP' },
  { name: 'hr_officer', apiName: 'hr_officer', label: 'HR Officer' },
  { name: 'finance_officer', apiName: 'finance_officer', label: 'Finance Officer' },
  { name: 'procurement_staff', apiName: 'procurement_staff', label: 'Procurement Staff' },
  { name: 'safety_staff', apiName: 'safety_staff', label: 'Safety/Warehouse Staff' },
  { name: 'engineering_staff', apiName: 'engineering_staff', label: 'Engineering Staff' },
];

// Department code → allowed roles
const DEPARTMENT_ROLES = {
  HR: ['hr_officer', 'department_head'],
  FIN: ['finance_officer', 'department_head'],
  PRC: ['procurement_staff', 'department_head'],
  SFW: ['safety_staff', 'department_head'],
  ENG: ['engineering_staff', 'department_head'],
};

export default function UserForm({ user, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roles: [],
    department_id: null,
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [deptLoading, setDeptLoading] = useState(false);
  const [deptError, setDeptError] = useState(null);

  // Single mutation for both create and update
  const mutation = useMutation(async (payload) => {
    if (user) return updateUser(user.id, payload);
    return createUser(payload);
  });

  const { isLoading, error, mutate } = mutation;

  // Fetch departments
  useEffect(() => {
    let mounted = true;
    setDeptLoading(true);
    setDeptError(null);
    getDepartments()
      .then((data) => {
        if (!mounted) return;
        setDepartments(data || []);
      })
      .catch(() => {
        if (!mounted) return;
        setDeptError('Failed to load departments');
      })
      .finally(() => mounted && setDeptLoading(false));

    return () => { mounted = false; };
  }, []);

  // Populate form when editing
  useEffect(() => {
    mutation.reset();

    const mappedRoles = (user?.roles || []).map((r) => {
      const roleName = typeof r === 'string' ? r : r.name;
      const found = AVAILABLE_ROLES.find(x => x.apiName === roleName || x.name === roleName);
      return found ? found.name : roleName;
    });

    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      roles: mappedRoles,
      department_id: user?.department?.id ?? null,
    });
  }, [user]);

  // Clean up roles when department changes
  useEffect(() => {
    if (!formData.department_id) return;
    const dept = departments.find(d => d.id === formData.department_id);
    if (!dept) return;
    const allowedRoles = DEPARTMENT_ROLES[dept.code] || [];
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter(r => allowedRoles.includes(r) || r === 'admin')
    }));
  }, [formData.department_id, departments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert department_id to number, keep others as-is
    const finalValue = name === 'department_id' ? (value ? Number(value) : null) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleRoleToggle = (roleName) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleName)
        ? prev.roles.filter(r => r !== roleName)
        : [...prev.roles, roleName],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user && !formData.password) {
      alert('Password is required');
      return;
    }

    if (formData.roles.includes('department_head') && !formData.department_id) {
      alert('Please select a department when assigning the Department Head role.');
      return;
    }

    const payloadRoles = formData.roles.map((rn) => {
      const found = AVAILABLE_ROLES.find(x => x.name === rn);
      return found ? found.apiName : rn;
    });

    const payload = {
      name: formData.name,
      email: formData.email,
      roles: payloadRoles,
      department_id: formData.department_id || null,
      ...(formData.password && { password: formData.password }),
    };

    try {
      const savedUser = await mutate(payload);
      onSubmit(savedUser);
    } catch {
      // handled by mutation hook
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {user ? 'Edit User' : 'Create New User'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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

        {/* Department select */}
        <div>
          <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 mb-2">Department</label>

          {deptLoading ? (
            <div className="text-sm text-gray-500">Loading departments...</div>
          ) : deptError ? (
            <div className="text-sm text-red-600">{deptError}</div>
          ) : (
            <select
              id="department_id"
              name="department_id"
              value={formData.department_id ?? ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">— No department —</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}{d.code ? ` (${d.code})` : ''}</option>
              ))}
            </select>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Assign a department to the user. Required when assigning Department Head.
          </p>
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
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {user ? 'Leave blank to keep the current password' : 'Minimum 6 characters recommended'}
          </p>
        </div>

        {/* Roles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Assign Roles</label>
          {!formData.department_id && (
            <p className="text-sm text-gray-500 mb-3">Select a department above to assign roles.</p>
          )}
          <div className="space-y-2">
            {AVAILABLE_ROLES.filter(role => {
              if (role.name === 'admin') return true; // admin always selectable

              if (!formData.department_id) return false; // no department => hide non-admin roles

              const dept = departments.find(d => d.id === formData.department_id);
              if (!dept) return false;

              const allowedRoles = DEPARTMENT_ROLES[dept.code] || [];
              return allowedRoles.includes(role.name);
            }).map((role) => (
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
        </div>
      </form>
    </div>
  );
}
