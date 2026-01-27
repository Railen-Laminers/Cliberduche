import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
