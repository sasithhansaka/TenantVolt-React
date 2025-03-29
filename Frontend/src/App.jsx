import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import NoteFound from "./pages/NoteFound";
// import Login from './pages/LoginPage';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<NoteFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
