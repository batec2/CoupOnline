import {
  getAllGames,
  getGame,
  updateGame,
  deleteGame,
  createGame,
} from "../controller/gameController.js";

// Game Routes
router.get("/", getAllGames);
router.get("/:id", getGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);
router.post("/", createGame);

export default router;
