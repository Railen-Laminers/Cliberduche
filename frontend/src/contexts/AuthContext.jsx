import { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, logout as apiLogout, me as apiMe, setAuthToken } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) setAuthToken(token);
    const init = async () => {
      try {
        if (token) {
          const u = await apiMe();
          setUser(u);
        }
      } catch (e) {
        console.error('Auth init failed', e);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    const t = data.token;
    localStorage.setItem('token', t);
    setAuthToken(t);
    setToken(t);
    const u = data.user || (await apiMe());
    setUser(u);
    return u;
  };

  const logout = async () => {
    try { await apiLogout(); } catch (e) { /* ignore */ }
    localStorage.removeItem('token');
    setAuthToken(null);
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const hasRole = (roleName) => {
    if (!user || !user.roles) return false;
    return user.roles.some(r => r.name === roleName);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
