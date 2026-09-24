const Order = require("../models/orderModel");

// Checkout
exports.checkout = (req, res) => {

    const userId = req.user.id;
    const {
    full_name,
    phone,
    address,
    payment_method
} = req.body;

    // Get Cart Items
    Order.getCartItems(userId, (err, cartItems) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching cart",
                error: err
            });
        }

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        // Calculate Total Amount
        let totalAmount = 0;

        cartItems.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        // Create Order
        Order.createOrder(
    userId,
    full_name,
    phone,
    address,
    payment_method,
    totalAmount,
    (err, orderResult) => {
            if (err) {
                return res.status(500).json({
                    message: "Error creating order",
                    error: err
                });
            }

            const orderId = orderResult.insertId;

            let completed = 0;

            cartItems.forEach(item => {

                Order.saveOrderItem(orderId, item, (err) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Error saving order items",
                            error: err
                        });
                    }

                    completed++;

                    if (completed === cartItems.length) {

                        Order.clearCart(userId, (err) => {

                            if (err) {
                                return res.status(500).json({
                                    message: "Order created but cart not cleared",
                                    error: err
                                });
                            }

                            res.status(201).json({
                                message: "Order placed successfully",
                                orderId,
                                totalAmount
                            });

                        });

                    }

                });

            });

        });

    });

};

// Get Logged-in User Orders
exports.getOrders = (req, res) => {

    const userId = req.user.id;

    Order.getOrders(userId, (err, orders) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching orders",
                error: err
            });
        }

        res.status(200).json(orders);

    });

};



// Get All Orders (Admin)
exports.getAllOrders = (req, res) => {

    Order.getAllOrders((err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching orders",
                error: err
            });
        }

        res.status(200).json(result);

    });

};

// Get Order Details (Admin)
exports.getOrderById = (req, res) => {

    const { id } = req.params;

    Order.getOrderById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching order details",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(result);

    });

};

// Update Order Status
exports.updateOrderStatus = (req, res) => {

    const { id } = req.params;

    const { status } = req.body;

    Order.updateOrderStatus(id, status, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error updating order status",
                error: err
            });
        }

        res.status(200).json({
            message: "Order status updated successfully"
        });

    });

};