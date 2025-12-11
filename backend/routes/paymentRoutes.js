import express from 'express';
import { checkout, paymentVerification } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/checkout', checkout);
router.post('/verify', paymentVerification);

router.get('/key', (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

export default router;