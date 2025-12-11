import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { removeFromCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center mt-20">
                    <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                    <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                        <p className="text-gray-500">₹{item.price}</p>
                                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 hover:text-red-700 transition p-2">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md h-fit border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                            <span>₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between mb-6 text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-xl mb-6 text-gray-900">
                            <span>Total</span>
                            <span>₹{totalPrice}</span>
                        </div>
                        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition active:scale-95" onClick={() => alert("Payment Integration Coming Next!")}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;