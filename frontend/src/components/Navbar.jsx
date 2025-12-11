import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wider hover:text-blue-400 transition">
                    MyShop
                </Link>

                <div className="flex items-center space-x-8">
                    <Link to="/" className="hover:text-blue-400 transition font-medium">Home</Link>
                    <Link to="/login" className="flex items-center hover:text-blue-400 transition font-medium">
                        <User size={20} className="mr-2" /> Login
                    </Link>

                    <Link to="/cart" className="relative group hover:text-yellow-400 transition">
                        <ShoppingCart size={28} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-gray-900">
                {cartItems.length}
              </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;