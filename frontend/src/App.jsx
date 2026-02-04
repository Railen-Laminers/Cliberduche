import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Homepage from "./pages/public/Homepage";
import Login from "./pages/auth/Login";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* scroll resets on every route change */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
