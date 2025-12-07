import { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/register', formData);
            alert('Registration Successful! Token: ' + res.data.token);
            console.log(res.data);
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">


                    <div className="flex items-center border border-gray-300 rounded-md p-2">
                        <User className="text-gray-400 mr-2" size={20} />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="w-full outline-none"
                            required
                        />
                    </div>


                    <div className="flex items-center border border-gray-300 rounded-md p-2">
                        <Mail className="text-gray-400 mr-2" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={handleChange}
                            className="w-full outline-none"
                            required
                        />
                    </div>


                    <div className="flex items-center border border-gray-300 rounded-md p-2">
                        <Lock className="text-gray-400 mr-2" size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full outline-none"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;