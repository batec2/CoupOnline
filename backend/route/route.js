import express from 'express';
import { getPlayers, getPlayer, updatePlayer, deletePlayer, createPlayer} from '../controller/playerController.js';
import { getAllGames, getGame, updateGame, deleteGame, createGame} from '../controller/gameController.js';

const router = express.Router();

// Player Routes
router.get('/players', getPlayers);
router.get('/players/:id', getPlayer);
router.put('/players/:id', updatePlayer);
router.delete('/players/:id', deletePlayer);
router.post('/players', createPlayer);

// Game Routes
router.get('/games', getAllGames);
router.get('/games/:id', getGame);
router.put('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);
router.post('/games', createGame);

export default router;