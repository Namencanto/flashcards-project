import {
  getUserStats,
  getFolderOrListStats,
  addFolderOrListStats,
  getUserStrike,
} from "../controllers/statistic.js";

import express from "express";

const router = express.Router();

router.get("/getStrike", getUserStrike);

router.get("/user/get", getUserStats);
router.get("/folderOrList/get", getFolderOrListStats);

router.post("/folderOrList/add", addFolderOrListStats);

export default router;
