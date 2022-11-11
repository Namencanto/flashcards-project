import { getTechcards } from "../controllers/techcard.js";
import { addTechcards } from "../controllers/techcard.js";
import { deleteTechcards } from "../controllers/techcard.js";
import { updateTechcards } from "../controllers/techcard.js";

import express from "express";

const router = express.Router();

router.get("/get", getTechcards);
router.post("/add", addTechcards);
router.post("/delete", deleteTechcards);
router.post("/update", updateTechcards);

export default router;
