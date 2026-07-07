const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ishwarya@1603",
    database: "feature_flag_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
        return;
    }

    console.log("✅ MySQL Connected Successfully");
});

module.exports = db;