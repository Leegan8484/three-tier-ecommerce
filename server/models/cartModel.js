const db = require("../config/db");

// Add Product to Cart
const addToCart = (cart, callback) => {

    const sql = `
        INSERT INTO cart
        (user_id, product_id, quantity)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            cart.user_id,
            cart.product_id,
            cart.quantity
        ],
        callback
    );
};

// Get User Cart
const getCart = (userId, callback) => {

    const sql = `
        SELECT
            cart.id,
            products.product_name,
            products.price,
            products.image,
            cart.quantity
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(sql, [userId], callback);
};

// Update Quantity
const updateCart = (id, quantity, callback) => {

    const sql =
        "UPDATE cart SET quantity=? WHERE id=?";

    db.query(sql, [quantity, id], callback);
};

// Remove Cart Item
const removeCartItem = (id, callback) => {

    const sql =
        "DELETE FROM cart WHERE id=?";

    db.query(sql, [id], callback);
};

// Clear Cart
const clearCart = (userId, callback) => {

    const sql =
        "DELETE FROM cart WHERE user_id=?";

    db.query(sql, [userId], callback);
};

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart
};