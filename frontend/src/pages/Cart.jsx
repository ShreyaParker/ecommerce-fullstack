import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { removeFromCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert("Please login to checkout");
            navigate('/login');
            return;
        }

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const { data: { key } } = await axios.get("/api/payment/key");
        const { data: { order } } = await axios.post("/api/payment/checkout", {
            amount: totalPrice,
            cartItems,
            userId: user.id
        });

        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "MyShop",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            handler: async function (response) {
                const verifyData = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    cartItems,
                    userId: user.id
                };

                const result = await axios.post("/api/payment/verify", verifyData);
                if (result.data.success) {
                    alert("Payment Successful! Order Placed.");
                    navigate('/');
                } else {
                    alert("Payment Verification Failed");
                }
            },
            prefill: {
                name: user.username,
                email: user.email,
                contact: "9999999999"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

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
                            <span>Subtotal</span>
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
                        <button
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition active:scale-95"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
