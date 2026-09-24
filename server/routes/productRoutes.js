const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Add Product
router.post(
    "/",
    verifyToken,
    upload.single("image"),
    productController.addProduct
);
// Get All Products
router.get("/", productController.getProducts);

// Get Single Product
router.get("/:id", productController.getProductById);

// Update Product
router.put(
    "/:id",
    verifyToken,
    upload.single("image"),
    productController.updateProduct
);

// Delete Product
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;