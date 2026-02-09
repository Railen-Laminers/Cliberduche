import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Auth
export function setAuthToken(token) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
}

export async function login(email, password) {
  const res = await instance.post('/login', { email, password });
  return res.data;
}

export async function logout() {
  const res = await instance.post('/logout');
  return res.data;
}

export async function me() {
  const res = await instance.get('/me');
  return res.data;
}

// Admin user management
export async function getUsers() { return (await instance.get('/admin/users')).data; }
export async function createUser(payload) { return (await instance.post('/admin/users', payload)).data; }
export async function updateUser(id, payload) { return (await instance.put(`/admin/users/${id}`, payload)).data; }
export async function deleteUser(id) { return (await instance.delete(`/admin/users/${id}`)).data; }
export async function deactivateUser(id) { return (await instance.post(`/admin/users/${id}/deactivate`)).data; }

// Department endpoints
export async function getDepartments() { return (await instance.get('/admin/departments')).data; }
export async function createDepartment(payload) { return (await instance.post('/admin/departments', payload)).data; }
export async function updateDepartment(id, payload) { return (await instance.put(`/admin/departments/${id}`, payload)).data; }
export async function deleteDepartment(id) { return (await instance.delete(`/admin/departments/${id}`)).data; }

export default instance;

// Helper for parsing API errors
export function parseError(err) {
  // backend generally returns { message: '...' } for validation/errors
  return err?.response?.data?.message || err?.response?.data?.errors || err?.message || 'An error occurred';
}
