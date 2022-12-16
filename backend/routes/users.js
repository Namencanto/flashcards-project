import {
  getInformation,
  addInformation,
  addLanguage,
  getRanking,
} from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.get("/getRanking", getRanking);

router.get("/getInformation", getInformation);
router.post("/addInformation", addInformation);

router.post("/addLanguage", addLanguage);

export default router;
