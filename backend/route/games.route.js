import express from "express";
import {
  getAllGames,
  getGame,
  updateGame,
  deleteGame,
  createGame,
} from "../controller/gameController.js";

const router = express.Router();
// Game Routes
router.get("/", getAllGames);
router.get("/:id", getGame);
router.patch("/:id", updateGame);
router.delete("/:id", deleteGame);
router.post("/", createGame);

export default router;
