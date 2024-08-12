import express from 'express';
import { getProducts, getProductById, purchaseProduct } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/purchase', authenticateToken, purchaseProduct);

export default router;