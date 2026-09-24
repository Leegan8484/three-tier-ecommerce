const db = require("../config/db");

// Add Product
const addProduct = (product, callback) => {
    const sql = `
        INSERT INTO products
        (category_id, product_name, description, price, stock, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            product.category_id,
            product.product_name,
            product.description,
            product.price,
            product.stock,
            product.image
        ],
        callback
    );
};

// Get All Products
const getAllProducts = (callback) => {
    const sql = `
        SELECT
            p.id,
            p.product_name,
            p.description,
            p.price,
            p.stock,
            p.image,
            c.category_name
        FROM products p
        LEFT JOIN categories c
        ON p.category_id = c.id
        ORDER BY p.id DESC
    `;

    db.query(sql, callback);
};

// Get Product By ID
const getProductById = (id, callback) => {
    const sql = `
        SELECT * FROM products
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

// Update Product
const updateProduct = (id, product, callback) => {

    const sql = `
        UPDATE products
        SET
            category_id=?,
            product_name=?,
            description=?,
            price=?,
            stock=?,
            image=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            product.category_id,
            product.product_name,
            product.description,
            product.price,
            product.stock,
            product.image,
            id
        ],
        callback
    );
};

// Delete Product
const deleteProduct = (id, callback) => {

    const sql = "DELETE FROM products WHERE id=?";

    db.query(sql, [id], callback);
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};