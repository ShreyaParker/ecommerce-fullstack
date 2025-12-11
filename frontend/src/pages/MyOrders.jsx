import { useEffect, useState } from 'react';
import axios from 'axios';
import { Package } from 'lucide-react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token to Backend
                    },
                };

                const { data } = await axios.get('/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">You have no orders yet.</div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: {order.razorpay_order_id || order.id}</p>
                                    <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className={`px-4 py-1 rounded-full text-sm font-bold capitalize ${
                                    order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t pt-4">
                                <div className="flex items-center text-gray-700">
                                    <Package className="mr-2" size={20}/>
                                    <span>Order Total</span>
                                </div>
                                <span className="text-xl font-bold">₹{order.total_amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
