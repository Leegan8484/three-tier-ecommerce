const express = require("express");
const cors = require("cors");
const path = require("path"); 
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);



// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Three-Tier E-Commerce Backend is Running Successfully!");
});

// Test Database Route

app.get("/db-test", (req, res) => {
    db.query("SELECT NOW() AS currentTime", (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.json({
            message: "Database Connected Successfully",
            serverTime: result[0].currentTime
        });
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});