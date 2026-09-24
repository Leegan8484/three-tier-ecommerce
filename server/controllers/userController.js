const User = require("../models/userModel");

// Get All Users
exports.getUsers = (req, res) => {

    User.getAllUsers((err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching users",
                error: err
            });
        }

        res.status(200).json(result);

    });

};

// Get User By ID
exports.getUserById = (req, res) => {

    const { id } = req.params;

    User.getUserById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching user",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(result[0]);

    });

};

// Update User
exports.updateUser = (req, res) => {

    console.log("updateUser controller called");

    const { id } = req.params;

    const {
        full_name,
        email,
        phone,
        address,
        role
    } = req.body;

    const user = {
        full_name,
        email,
        phone,
        address,
        role
    };

    User.updateUser(id, user, (err) => {

       if (err) {

    console.log("UPDATE ERROR:", err);

    return res.status(500).json({
        message: "Error updating user",
        error: err
    });

}
        res.status(200).json({
            message: "User updated successfully"
        });

    });

};

// Delete User
exports.deleteUser = (req, res) => {

    const { id } = req.params;

    User.deleteUser(id, (err) => {

        if (err) {

            console.log("DELETE ERROR:", err);

            return res.status(500).json({
                message: "Error deleting user",
                error: err
            });

        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    });

};

