import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());
app.use(cookieParser());

/**
 * * PRODUCTION
 */
console.log(path.join(__dirname, "../public"));
app.use(express.static(path.join(__dirname, "../build")));

// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "../build/index.html"))
// );

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(port, console.log(`Server running on port ${port}`));
