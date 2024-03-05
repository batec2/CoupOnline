import express from "express";
import {
  getAllGames,
  getGame,
  updateGame,
  deleteGame,
  createGame,
} from "../controller/gameController.js";

const router = express.Router();
<<<<<<< HEAD

=======
>>>>>>> 954d47bdfc41448509dc1e9011318c8b5b9543ab
// Game Routes
router.get("/", getAllGames);
router.get("/:id", getGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);
router.post("/", createGame);

export default router;
