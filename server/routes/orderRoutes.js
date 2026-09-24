const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");


// Checkout
router.post("/checkout", verifyToken, orderController.checkout);
// Get Logged-in User Orders
router.get("/", verifyToken, orderController.getOrders);
router.get("/admin", verifyToken, orderController.getAllOrders);
router.get("/admin/:id", verifyToken, orderController.getOrderById);
router.put("/admin/:id", verifyToken, orderController.updateOrderStatus);

module.exports = router;