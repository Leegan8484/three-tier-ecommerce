const Cart = require("../models/cartModel");

// Add Product to Cart
exports.addToCart = (req, res) => {

    const user_id = req.user.id;

    const {
        product_id,
        quantity
    } = req.body;

    const cart = {
        user_id,
        product_id,
        quantity
    };

    Cart.addToCart(cart, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error adding to cart",
                error: err
            });
        }

        res.status(201).json({
            message: "Product added to cart successfully"
        });

    });

};

// Get Logged-in User Cart
exports.getCart = (req, res) => {

    const user_id = req.user.id;

    Cart.getCart(user_id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching cart",
                error: err
            });
        }

        res.status(200).json(result);

    });

};

// Update Quantity
exports.updateCart = (req, res) => {

    const { id } = req.params;
    const { quantity } = req.body;

    Cart.updateCart(id, quantity, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error updating cart",
                error: err
            });
        }

        res.status(200).json({
            message: "Cart updated successfully"
        });

    });

};

// Remove Item
exports.removeCartItem = (req, res) => {

    const { id } = req.params;

    Cart.removeCartItem(id, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error removing cart item",
                error: err
            });
        }

        res.status(200).json({
            message: "Item removed from cart"
        });

    });

};

// Clear Cart
exports.clearCart = (req, res) => {

    const user_id = req.user.id;

    Cart.clearCart(user_id, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error clearing cart",
                error: err
            });
        }

        res.status(200).json({
            message: "Cart cleared successfully"
        });

    });

};