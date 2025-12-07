import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden">
                                {product.description}
                            </p>

                            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ₹{product.price}
                </span>

                                <button
                                    className="bg-black text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-800 transition"
                                    onClick={() => alert(`Added ${product.name} to cart!`)}
                                >
                                    <ShoppingCart size={18} className="mr-2" />
                                    Add to Cart
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