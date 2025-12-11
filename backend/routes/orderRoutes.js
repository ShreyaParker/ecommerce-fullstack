import express from 'express';
import { getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import middleware

const router = express.Router();


router.get('/myorders', protect, getMyOrders);

export default router;