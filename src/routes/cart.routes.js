import express from 'express';
import { getCartByUserId, addProductToCart, removeProductFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/:userId', getCartByUserId);
router.post('/add', addProductToCart);
router.post('/remove', removeProductFromCart);

export default router;