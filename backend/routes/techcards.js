import { getTechcards } from "../controllers/techcard.js";
import express from "express";

const router = express.Router();

router.get("/get", getTechcards);

export default router;
