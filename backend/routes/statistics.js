import {
  getMainStats,
  getUserStats,
  getFolderOrListStats,
  addMainStats,
  addUserStats,
  addFolderStats,
} from "../controllers/statistic.js";

import express from "express";

const router = express.Router();

router.get("/get", getMainStats);
router.get("/user/get", getUserStats);
router.get("/folderOrList/get", getFolderOrListStats);

router.post("/add", addMainStats);
router.post("/user/add", addUserStats);
router.post("/folderOrList/add", addFolderStats);

export default router;
