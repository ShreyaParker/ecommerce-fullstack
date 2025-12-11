import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Home = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Latest Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">{product.name}</h2>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xlkq flex items-center font-semibold transition active:scale-95"
                                    onClick={() => dispatch(addToCart(product))}
                                >
                                    <ShoppingCart size={18} className="mr-2" /> Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;