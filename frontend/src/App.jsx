import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./homepage/HomePage";
import Login from "./homepage/Login";

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
