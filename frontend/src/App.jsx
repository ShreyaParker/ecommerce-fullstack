import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from "./pages/Login.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<h1 className="text-center mt-10 text-4xl">Welcome to E-Shop</h1>} />
            </Routes>?
        </Router>
    );
}

export default App;