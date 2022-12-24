import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import techcardRoutes from "./routes/techcards.js";
import techcardListRoutes from "./routes/techcardsLists.js";
import learningRoutes from "./routes/learnings.js";
import statisticsRoutes from "./routes/statistics.js";

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

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./uploads")));
// app.use(express.static("backend/uploads"));
app.use("/static", express.static(path.resolve(__dirname, "../build/static")));
/**
 * * PRODUCTION
 */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/techcards", techcardRoutes);
app.use("/api/techcards/lists", techcardListRoutes);
app.use("/api/learnings", learningRoutes);
app.use("/api/statistics", statisticsRoutes);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../build/index.html"))
);

app.listen(port, console.log(`Server running on port ${port}`));
