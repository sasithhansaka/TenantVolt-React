import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import NoteFound from "./pages/NoteFound";
// import Login from './pages/LoginPage';
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import CheckOutPage from "./pages/CheckOutPage";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./pages/Dashboard";
import ContactPage from "./pages/ContactPage.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NoteFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
