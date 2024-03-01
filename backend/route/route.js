import express from "express";
import { getAllPlayers } from "../controller/playerController.js";
import { getAllGames } from "../controller/gameController.js";

const router = express.Router();

// Players
router.get('/players', getAllPlayers);

// Games
router.get('/games', getAllGames);

export default router;