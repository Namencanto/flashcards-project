import {
  getInformation,
  addInformation,
  addLanguage,
} from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.get("/getInformation", getInformation);
router.post("/addInformation", addInformation);

router.post("/addLanguage", addLanguage);

export default router;
