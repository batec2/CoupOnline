import express from "express";
import {
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
  createPlayer,
<<<<<<< HEAD
  getPlayerByUsername,
=======
  getPlayerByUsername
>>>>>>> 954d47bdfc41448509dc1e9011318c8b5b9543ab
} from "../controller/playerController.js";

const router = express.Router();

// Player Routes
router.get("/", getPlayers);
router.get("/byId/:id", getPlayer);
router.get("/byName/:username", getPlayerByUsername);
router.get("/:id", getPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);
router.post("/", createPlayer);

export default router;
