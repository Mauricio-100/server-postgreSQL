// index.js
import express from "express";
import mysql from "mysql2/promise";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Charger le certificat SSL
const ca = fs.readFileSync("./ca.pem", "utf8");

// Créer pool MySQL
const pool = mysql.createPool({
  host: "mysql-1a36101-botwii.c.aivencloud.com",
  port: 14721,
  user: "avnadmin",
  password: "AVNS_BvVULOCxM7CcMQd0Aqw",
  database: "defaultdb",
  ssl: { ca }
});

// Exemple route API
app.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT username, email FROM users LIMIT 5");
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
