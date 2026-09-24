const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.register = async (req, res) => {

    const {
        full_name,
        email,
        password,
        phone,
        address
    } = req.body;


    
    // Check if email already exists
    User.findUserByEmail(email, async (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length > 0) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            full_name,
            email,
            password: hashedPassword,
            phone,
            address,
            role: "customer"
        };

        User.createUser(newUser, (err) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                message: "Registration Successful"
            });

        });

    });

};

exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const jwt = require("jsonwebtoken");

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    });

};
exports.profile = (req, res) => {

    res.status(200).json({
        message: "Profile Retrieved Successfully",
        user: req.user
    });

};