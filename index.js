import express from "express";
import mysql from "mysql2/promise";

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion via pool MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { ca: process.env.DB_SSL_CERT }
});

app.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT username, email FROM users LIMIT 5");
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
