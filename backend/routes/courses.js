import express from "express";
import {
  getCourses,
  getUserCourses,
  addCourseToUser,
} from "../controllers/course.js";

const router = express.Router();

router.get("/user", getUserCourses);

router.get("/", getCourses);
router.post("/", addCourseToUser);

export default router;
