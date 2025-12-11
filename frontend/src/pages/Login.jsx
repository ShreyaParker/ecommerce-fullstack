import { useState } from 'react';
import axios from 'axios';
import { Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate("/");
            window.location.reload(); // optional, only if navbar doesn't update

        } catch (error) {
            alert(error.response?.data?.message || 'Invalid Credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg active:scale-95">
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    New here? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
