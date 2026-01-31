import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/auth/Login";
import Projects from "./pages/homepage/Projects"; // import the Projects page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
