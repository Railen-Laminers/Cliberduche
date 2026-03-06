import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/public/Homepage";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Router>
      {/* Fixed grid background – now globally available */}
      <div className="grid-bg" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;