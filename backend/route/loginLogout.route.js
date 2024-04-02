import {
  checkForValidSession,
  login,
  logout
} from "../controller/loginLogoutController.js"
import express from "express";

const router = express.Router();

router.get("/login/:username", login);
router.get("/logout", logout);
router.get("/checkLogin", checkForValidSession);
export default router;
