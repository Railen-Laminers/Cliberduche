import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  // Allow unauthenticated users; authenticated users are redirected to the protected dashboard
  if (user) return <Navigate to="/private/dashboard" replace />;
  return children;
}
