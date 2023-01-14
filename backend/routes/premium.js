import {
  postPremiumData,
  getPremiumData,
  postUnsubscribePremium,
  getCheckUserPremium,
} from "../controllers/premium.js";

import express from "express";

const router = express.Router();

router.get("/check-user", getCheckUserPremium);
router.get("/", getPremiumData);

router.post("/", postPremiumData);
router.post("/unsubscribe", postUnsubscribePremium);

export default router;
