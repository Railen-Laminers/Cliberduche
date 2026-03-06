import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/public/Homepage";
import Login from "./pages/auth/Login";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Fixed grid background – now theme‑aware */}
        <div className="grid-bg fixed inset-0 -z-10 bg-white dark:bg-gray-900" />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Homepage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;