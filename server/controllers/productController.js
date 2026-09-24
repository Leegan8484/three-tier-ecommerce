const Product = require("../models/productModel");

// Add Product
exports.addProduct = (req, res) => {

    const {
        category_id,
        product_name,
        description,
        price,
        stock
    } = req.body;

    // Get uploaded image filename
    const image = req.file ? req.file.filename : null;
    if (!req.file) {
    return res.status(400).json({
        message: "Please select a product image."
    });
}

    const product = {
        category_id,
        product_name,
        description,
        price,
        stock,
        image
    };

    Product.addProduct(product, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error adding product",
                error: err
            });
        }

        res.status(201).json({
            message: "Product added successfully"
        });

    });

};

// Get All Products
exports.getProducts = (req, res) => {

    Product.getAllProducts((err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching products",
                error: err
            });
        }

        res.status(200).json(result);

    });

};

// Get Product By ID
exports.getProductById = (req, res) => {

    const { id } = req.params;

    Product.getProductById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching product",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(result[0]);

    });

};

// Update Product
// Update Product
exports.updateProduct = (req, res) => {

    const { id } = req.params;

    const {
        category_id,
        product_name,
        description,
        price,
        stock
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const product = {
        category_id,
        product_name,
        description,
        price,
        stock,
        image
    };

    Product.updateProduct(id, product, (err) => {

        if (err) {
            return res.status(500).json({
                message: "Error updating product",
                error: err
            });
        }

        res.status(200).json({
            message: "Product updated successfully"
        });

    });

};

// Delete Product
// Delete Product
exports.deleteProduct = (req, res) => {

    const { id } = req.params;

    Product.deleteProduct(id, (err) => {

        if (err) {

            // Product is linked to orders
            if (err.code === "ER_ROW_IS_REFERENCED_2") {
                return res.status(400).json({
                    message: "This product cannot be deleted because it is associated with existing orders."
                });
            }

            return res.status(500).json({
                message: "Error deleting product",
                error: err
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    });

};