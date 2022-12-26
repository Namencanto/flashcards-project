import app from "./app.js";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
app.use(express.static(path.join(__dirname, "./uploads")));

if (process.env.SERVER_IS_PRODUCTION) {
  app.use(
    "/static",
    express.static(path.resolve(__dirname, "../build/static"))
  );
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../build/index.html"))
  );
}

app.listen(port, console.log(`Server running on port ${port}`));
