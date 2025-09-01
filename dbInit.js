// dbInit.js
import { readFileSync } from "fs";
import mysql from "mysql2/promise";

// Charger le certificat SSL
const ca = readFileSync("./ca.pem", "utf8");

const sql = readFileSync("./init.sql", "utf8");

async function initDB() {
  const connection = await mysql.createConnection({
    host: "mysql-1a36101-botwii.c.aivencloud.com",
    port: 14721,
    user: "avnadmin",
    password: "AVNS_BvVULOCxM7CcMQd0Aqw",
    database: "defaultdb",
    ssl: { ca } // ✅ connexion sécurisée
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
