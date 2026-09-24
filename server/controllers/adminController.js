const Admin = require("../models/adminModel");

// Dashboard Statistics
exports.getDashboard = (req, res) => {

    Admin.getDashboardStats((err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching dashboard",
                error: err
            });
        }

        res.status(200).json(result[0]);

    });

};

// Get All Users
exports.getUsers = (req, res) => {

    Admin.getAllUsers((err, users) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching users",
                error: err
            });
        }

        res.status(200).json(users);

    });

};

// Get All Products
exports.getProducts = (req, res) => {

    Admin.getAllProducts((err, products) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching products",
                error: err
            });
        }

        res.status(200).json(products);

    });

};

// Get All Orders
exports.getOrders = (req, res) => {

    Admin.getAllOrders((err, orders) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching orders",
                error: err
            });
        }

        res.status(200).json(orders);

    });

};

// Update Order Status
exports.updateOrderStatus = (req, res) => {

    const orderId = req.params.id;
    const { status } = req.body;

    Admin.updateOrderStatus(orderId, status, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error updating order status",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order status updated successfully"
        });

    });

};

// Get Recent Orders
exports.getRecentOrders = (req, res) => {

    Admin.getRecentOrders((err, orders) => {

        if (err) {

            return res.status(500).json({
                message: "Error fetching recent orders",
                error: err
            });

        }

        res.status(200).json(orders);

    });

};