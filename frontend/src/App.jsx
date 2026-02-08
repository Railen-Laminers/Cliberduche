import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Homepage from "./pages/public/Homepage";
import Login from "./pages/auth/Login";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Dashboard from './pages/private/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

      {/* single protected dashboard that renders content based on roles */}
      <Route path="/private/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path="/*" element={<Homepage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop /> {/* scroll resets on every route change */}
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
