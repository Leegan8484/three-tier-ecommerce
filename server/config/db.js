const mysql = require("mysql2");
require("dotenv").config();

console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);
console.log("Port:", process.env.DB_PORT);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    connectTimeout: 30000
});

db.connect((err) => {
    if (err) {
        console.error("Database Error:");
        console.error(err);
        return;
    }

    console.log("✅ Connected to MySQL Database");
});

module.exports = db;
