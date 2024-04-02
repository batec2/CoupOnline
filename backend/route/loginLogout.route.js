import {
  login,
  logout
} from "../controller/loginLogoutController.js"
import express from "express";

const router = express.Router();

router.get("/login/:username", login);
router.get("/logout", logout);

export default router;
