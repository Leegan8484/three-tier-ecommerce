const db = require("../config/db");

// Create User
const createUser = (userData, callback) => {
    const sql = `
        INSERT INTO users
        (full_name, email, password, phone, address, role)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userData.full_name,
            userData.email,
            userData.password,
            userData.phone,
            userData.address,
            userData.role
        ],
        callback
    );
};

// Find User by Email
const findUserByEmail = (email, callback) => {
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        callback
    );
};

// Get All Users
const getAllUsers = (callback) => {

    const sql = `
        SELECT
            id,
            full_name,
            email,
            phone,
            address,
            role,
            created_at
        FROM users
        ORDER BY id DESC
    `;

    db.query(sql, callback);

};

// Get User By ID
const getUserById = (id, callback) => {

    const sql = `
        SELECT *
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

// Update User
const updateUser = (id, user, callback) => {

    const sql = `
        UPDATE users
        SET
            full_name = ?,
            email = ?,
            phone = ?,
            address = ?,
            role = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            user.full_name,
            user.email,
            user.phone,
            user.address,
            user.role,
            id
        ],
        callback
    );

};

// Delete User
const deleteUser = (id, callback) => {

    const sql = `
        DELETE FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

module.exports = {
    createUser,
    findUserByEmail,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};