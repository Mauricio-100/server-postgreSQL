// dbInit.js
import { readFileSync } from "fs";
import mysql from "mysql2/promise";

const sql = readFileSync("./init.sql", "utf8");

async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "mysql-1a36101-botwii.c.aivencloud.com",
    port: process.env.DB_PORT || 14721,
    user: process.env.DB_USER || "avnadmin",
    password: process.env.DB_PASSWORD || "AVNS_BvVULOCxM7CcMQd0Aqw",
    database: process.env.DB_NAME || "defaultdb",
    ssl: { rejectUnauthorized: false } // ✅ pas de blocage certificat
  });

  try {
    await connection.query(sql);
    console.log("✅ Base de données GamerHubX initialisée !");
  } catch (err) {
    console.error("❌ Erreur d'initialisation :", err);
  } finally {
    await connection.end();
  }
}

initDB();
