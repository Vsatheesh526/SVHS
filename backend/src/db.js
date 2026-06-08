import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ Use DATABASE_URL (Railway)
const DATABASE_URL = process.env.DATABASE_URL;


console.log("DATABASE_URL =", process.env.DATABASE_URL);


// ✅ Create connection pool
export const pool = mysql.createPool({
  uri: DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
  multipleStatements: true,
});

// ✅ Query helper
export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// ✅ Initialize DB (runs schema.sql)
export async function initializeDatabase() {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const schemaPath = path.join(__dirname, "../schema.sql");

    const schema = await fs.promises.readFile(schemaPath, "utf8");

    // ✅ Connect using DATABASE_URL
    const initConnection = await mysql.createConnection(DATABASE_URL);

    // Run schema
    await initConnection.query(schema);

    // Check if column exists
    const [columns] = await initConnection.query(
      `SELECT COLUMN_NAME 
       FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? 
       AND TABLE_NAME = ? 
       AND COLUMN_NAME = ?`,
      ["railway", "admission_requests", "status"]
    );

    // Add column if missing
    if (columns.length === 0) {
      await initConnection.query(
        `ALTER TABLE admission_requests 
         ADD COLUMN status VARCHAR(50) 
         NOT NULL DEFAULT 'pending'`
      );
    }

    await initConnection.end();

    console.log("Database initialized ✅");
  } catch (err) {
    console.error("DB Init Error ❌:", err);
  }
}
