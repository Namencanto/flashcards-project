import express from "express";
import {
  register,
  login,
  logout,
  changeUserLoginData,
  deleteAccount,
  postSendUserInformation,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/send-user-info", postSendUserInformation);

router.post("/change-login-data", changeUserLoginData);

router.post("/delete-account", deleteAccount);

export default router;
