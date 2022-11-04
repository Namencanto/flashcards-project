import mysql from "mysql2";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

export const db = mysql.createConnection({
  host: process.env.MYSQL_CREATE_CONNECTION_HOST,
  user: process.env.MYSQL_CREATE_CONNECTION_USER,
  password: process.env.MYSQL_CREATE_CONNECTION_PASSWORD,
  database: process.env.MYSQL_CREATE_CONNECTION_DATABASE,
});
