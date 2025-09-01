// index.js
import express from "express";
import mysql from "mysql2/promise";

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion via pool MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql-1a36101-botwii.c.aivencloud.com",
  port: process.env.DB_PORT || 14721,
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASSWORD || "AVNS_BvVULOCxM7CcMQd0Aqw",
  database: process.env.DB_NAME || "defaultdb",
  ssl: { rejectUnauthorized: false } // ✅ ignore vérification stricte
});

// Exemple route API
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT username, email FROM users LIMIT 5");
    res.json(rows);
  } catch (err) {
    console.error("❌ Erreur DB :", err);
    res.status(500).json({ error: "Erreur base de données" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
