const mysql = require("mysql2");

// Create MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed");
        console.error(err);
        return;
    }

    console.log("✅ Connected to MySQL Database");
});

module.exports = db;