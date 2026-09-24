const db = require("../config/db");

// Dashboard Statistics
const getDashboardStats = (callback) => {

    const sql = `
        SELECT
            (SELECT COUNT(*) FROM users) AS totalUsers,
            (SELECT COUNT(*) FROM products) AS totalProducts,
            (SELECT COUNT(*) FROM orders) AS totalOrders,
            (SELECT IFNULL(SUM(total_amount),0) FROM orders) AS totalRevenue
    `;

    db.query(sql, callback);
};



// Get All Users
const getAllUsers = (callback) => {

    const sql = `
        SELECT
            id,
            full_name,
            email,
            role,
            created_at
        FROM users
        ORDER BY id DESC
    `;

    db.query(sql, callback);
};

// Get All Products
const getAllProducts = (callback) => {

    const sql = `
        SELECT
            products.id,
            products.product_name,
            products.price,
            products.stock,
            categories.category_name
        FROM products
        LEFT JOIN categories
        ON products.category_id = categories.id
        ORDER BY products.id DESC
    `;

    db.query(sql, callback);
};

// Get All Orders
const getAllOrders = (callback) => {

    const sql = `
        SELECT
            orders.id AS order_id,
            users.full_name,
            users.email,
            orders.total_amount,
            orders.status,
            orders.created_at
        FROM orders
        JOIN users
            ON orders.user_id = users.id
        ORDER BY orders.id DESC
    `;

    db.query(sql, callback);
};

// Update Order Status
const updateOrderStatus = (orderId, status, callback) => {

    const sql = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, orderId], callback);
};

// adminModel.js

const getRecentOrders = (callback) => {

    const sql = `
        SELECT
            o.id,
            u.full_name,
            o.status,
            o.total_amount
        FROM orders o
        JOIN users u
            ON o.user_id = u.id
        ORDER BY o.id DESC
        LIMIT 5
    `;

    db.query(sql, callback);
};



module.exports = {
    getDashboardStats,
    getAllUsers,
    getAllProducts,
    getAllOrders,
    updateOrderStatus,
    getRecentOrders
};

