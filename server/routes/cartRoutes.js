const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const verifyToken = require("../middleware/authMiddleware");

// Add Product to Cart
router.post("/add", verifyToken, cartController.addToCart);

// Get Logged-in User Cart
router.get("/", verifyToken, cartController.getCart);

// Update Quantity
router.put("/:id", verifyToken, cartController.updateCart);

// Remove Cart Item
router.delete("/:id", verifyToken, cartController.removeCartItem);

// Clear Cart
router.delete("/clear/all", verifyToken, cartController.clearCart);

module.exports = router;