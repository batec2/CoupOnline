import express from "express";
import {
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
  createPlayer,
  getPlayerByUsername,
} from "../controller/playerController.js";
import checkForNeededPlayerFields from "../middleware/checkForValidPlayer.js";

const router = express.Router();

// Player Routes
router.get("/", getPlayers);
router.get("/byId/:id", getPlayer);
router.get("/byName/:username", getPlayerByUsername);
router.get("/:id", getPlayer);
router.patch("/:id", updatePlayer);
router.delete("/:id", deletePlayer);
router.post("/",checkForNeededPlayerFields, createPlayer);

export default router;
