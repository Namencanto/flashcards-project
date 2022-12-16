import {
  getUserStats,
  getFolderOrListStats,
  addUserStats,
  addFolderOrListStats,
} from "../controllers/statistic.js";

import express from "express";

const router = express.Router();

router.get("/user/get", getUserStats);
router.get("/folderOrList/get", getFolderOrListStats);

router.post("/user/add", addUserStats);
router.post("/folderOrList/add", addFolderOrListStats);

export default router;
