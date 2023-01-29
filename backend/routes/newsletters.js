import { postNewsletter } from "../controllers/newsletter.js";

import express from "express";

const router = express.Router();

router.post("/", postNewsletter);

export default router;
