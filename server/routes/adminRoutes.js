const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Dashboard
router.get(
    "/dashboard",
    verifyToken,
    adminMiddleware,
    adminController.getDashboard
);

router.get(
    "/recent-orders",
    verifyToken,
    adminMiddleware,
    adminController.getRecentOrders
);

// Get All Users
router.get(
    "/users",
    verifyToken,
    adminMiddleware,
    adminController.getUsers
);


// Get All Products
router.get(
    "/products",
    verifyToken,
    adminMiddleware,
    adminController.getProducts
);

// Get All Orders
router.get(
    "/orders",
    verifyToken,
    adminMiddleware,
    adminController.getOrders
);

// Update Order Status
router.put(
    "/orders/:id",
    verifyToken,
    adminMiddleware,
    adminController.updateOrderStatus
);
module.exports = router;