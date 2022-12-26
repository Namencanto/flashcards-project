import express from "express";

const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import techcardRoutes from "./routes/techcards.js";
import techcardListRoutes from "./routes/techcardsLists.js";
import learningRoutes from "./routes/learnings.js";
import statisticsRoutes from "./routes/statistics.js";

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/techcards", techcardRoutes);
app.use("/api/techcards/lists", techcardListRoutes);
app.use("/api/learnings", learningRoutes);
app.use("/api/statistics", statisticsRoutes);

export default app;
