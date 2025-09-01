import { readFileSync } from "fs";
import mysql from "mysql2/promise";

const sql = readFileSync("./init.sql", "utf8");

async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { ca: process.env.DB_SSL_CERT }
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
