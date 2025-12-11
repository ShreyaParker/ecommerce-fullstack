import Razorpay from 'razorpay';
import crypto from 'crypto-js';
import dotenv from 'dotenv';
import { pool } from '../config/db.js';

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const checkout = async (req, res) => {
    const { amount, cartItems, userId } = req.body;

    const options = {
        amount: Number(amount * 100),
        currency: "INR",
        receipt: "receipt_" + Math.random(),
    };

    try {
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Payment initiation failed" });
    }
};

export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, userId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.HmacSHA256(body, process.env.RAZORPAY_KEY_SECRET).toString();

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        try {
            await pool.query(
                'INSERT INTO orders (user_id, total_amount, status, razorpay_order_id, razorpay_payment_id) VALUES ($1, $2, $3, $4, $5)',
                [
                    userId,
                    cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
                    'paid',
                    razorpay_order_id,
                    razorpay_payment_id
                ]
            );

            res.status(200).json({ success: true, message: "Payment Successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Order saving failed" });
        }
    } else {
        res.status(400).json({ success: false, message: "Invalid Signature" });
    }
};
