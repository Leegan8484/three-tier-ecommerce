const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const verifyToken = require("../middleware/authMiddleware");

// Add Category (Protected)
router.post("/", verifyToken, categoryController.addCategory);

// Get All Categories (Public)
router.get("/", categoryController.getCategories);

// Update Category (Protected)
router.put("/:id", verifyToken, categoryController.updateCategory);

// Delete Category (Protected)
router.delete("/:id", verifyToken, categoryController.deleteCategory);

module.exports = router;