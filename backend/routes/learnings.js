import { changeTechcardStatus } from "../controllers/learning.js";

import express from "express";

const router = express.Router();

router.post("/changeTechcardStatus", changeTechcardStatus);

export default router;
