const db = require("../config/db");

// Get Cart Items
const getCartItems = (userId, callback) => {

    const sql = `
        SELECT
            cart.product_id,
            cart.quantity,
            products.price
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(sql, [userId], callback);
};

// Create Order
// Create Order
const createOrder = (
    userId,
    fullName,
    phone,
    address,
    paymentMethod,
    totalAmount,
    callback
) => {

    const sql = `
        INSERT INTO orders
        (
            user_id,
            full_name,
            phone,
            address,
            payment_method,
            total_amount
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            fullName,
            phone,
            address,
            paymentMethod,
            totalAmount
        ],
        callback
    );
};

// Save Order Items
const saveOrderItem = (orderId, item, callback) => {

    const sql = `
        INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            orderId,
            item.product_id,
            item.quantity,
            item.price
        ],
        callback
    );
};

// Clear Cart
const clearCart = (userId, callback) => {

    db.query(
        "DELETE FROM cart WHERE user_id=?",
        [userId],
        callback
    );
};

// Get User Orders
// Get User Orders with Products
const getOrders = (userId, callback) => {

    const sql = `
        SELECT
            o.id,
            o.total_amount,
            o.status,
            o.created_at,

            p.product_name,
            p.image,

            oi.quantity,
            oi.price

        FROM orders o

        JOIN order_items oi
            ON o.id = oi.order_id

        JOIN products p
            ON oi.product_id = p.id

        WHERE o.user_id = ?

        ORDER BY o.created_at DESC
    `;

    db.query(sql, [userId], callback);

};
// Get All Orders (Admin)
const getAllOrders = (callback) => {

    const sql = `
        SELECT
            o.id AS order_id,
            u.full_name,
            o.total_amount,
            o.status,
            o.created_at
        FROM orders o
        JOIN users u
            ON o.user_id = u.id
        ORDER BY o.id DESC
    `;

    db.query(sql, callback);

};

// Get Order Details (Admin)
const getOrderById = (id, callback) => {

    const sql = `
        SELECT
            o.id,
            o.total_amount,
            o.status,
            o.created_at,
            o.full_name,
            u.email,
            o.phone,
            o.address,
            o.payment_method,
            p.product_name,
            oi.quantity,
            oi.price
        FROM orders o
        JOIN users u
            ON o.user_id = u.id
        JOIN order_items oi
            ON o.id = oi.order_id
        JOIN products p
            ON oi.product_id = p.id
        WHERE o.id = ?
    `;

    db.query(sql, [id], callback);

};

// Update Order Status
const updateOrderStatus = (id, status, callback) => {

    const sql = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], callback);

};

module.exports = {
    getCartItems,
    createOrder,
    saveOrderItem,
    clearCart,
    getOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};