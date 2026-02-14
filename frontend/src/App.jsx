import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/public/Homepage";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;