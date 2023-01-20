import {
  getRepetitionData,
  postRepetitionData,
} from "../controllers/repetition.js";

import express from "express";

const router = express.Router();

router.get("/", getRepetitionData);
router.post("/", postRepetitionData);

export default router;
