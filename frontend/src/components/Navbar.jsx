import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wider hover:text-blue-400 transition">
                    MyShop
                </Link>

                <div className="flex items-center space-x-6">
                    <Link to="/" className="hover:text-blue-400 transition font-medium">Home</Link>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="flex items-center text-red-400 hover:text-red-300 transition font-bold border border-red-400 rounded px-3 py-1 mr-4">
                                    Admin Panel
                                </Link>
                            )}

                            <Link to="/myorders" className="flex items-center hover:text-blue-400 transition">
                                <Package size={20} className="mr-1" /> My Orders
                            </Link>

                            <Link to="/cart" className="relative group hover:text-yellow-400 transition">
                                <ShoppingCart size={24} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-gray-900">
                    {cartItems.length}
                  </span>
                                )}
                            </Link>

                            <button onClick={handleLogout} className="flex items-center text-red-400 hover:text-red-300 transition">
                                <LogOut size={20} className="mr-1" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
                            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition font-semibold">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
