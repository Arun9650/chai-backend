import Cart from '../models/cart.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get cart by user ID
const getCartByUserId = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
});

// Add product to cart
const addProductToCart = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
    }

    await cart.save();
    res.status(200).json(cart);
});

// Remove product from cart
const removeProductFromCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
});

export { getCartByUserId, addProductToCart, removeProductFromCart };