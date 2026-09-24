const db = require("../config/db");

// Add Category
const addCategory = (category_name, callback) => {
    const sql = "INSERT INTO categories (category_name) VALUES (?)";
    db.query(sql, [category_name], callback);
};

// Get All Categories
const getAllCategories = (callback) => {
    const sql = "SELECT * FROM categories ORDER BY id DESC";
    db.query(sql, callback);
};

// Update Category
const updateCategory = (id, category_name, callback) => {
    const sql = "UPDATE categories SET category_name=? WHERE id=?";
    db.query(sql, [category_name, id], callback);
};

// Delete Category
const deleteCategory = (id, callback) => {
    const sql = "DELETE FROM categories WHERE id=?";
    db.query(sql, [id], callback);
};

module.exports = {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};