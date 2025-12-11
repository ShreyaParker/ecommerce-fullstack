import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Upload, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        image_url: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            alert("Access Denied: Admins Only");
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Send Admin Token
                },
            };

            await axios.post('/api/products', formData, config);
            alert('Product Added Successfully!');

            setFormData({ name: '', description: '', price: '', stock_quantity: '', image_url: '' });
        } catch (error) {
            console.error(error);
            alert('Failed to add product');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl min-h-screen">
            <div className="flex items-center justify-center mb-8 text-gray-800">
                <LayoutDashboard size={32} className="mr-3" />
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-700 border-b pb-4">
                    <PlusCircle className="mr-2" /> Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text" name="name" value={formData.name} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="e.g. Wireless Earbuds"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description" value={formData.description} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition h-24"
                            placeholder="Product details..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                            <input
                                type="number" name="price" value={formData.price} onChange={handleChange} required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                placeholder="2999"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                            <input
                                type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                placeholder="50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                        <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <Upload size={18} />
              </span>
                            <input
                                type="text" name="image_url" value={formData.image_url} onChange={handleChange} required
                                placeholder="https://example.com/image.jpg"
                                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Tip: Copy an image address from Unsplash.com</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition transform active:scale-95 shadow-md mt-4"
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;