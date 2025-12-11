import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart.jsx';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;