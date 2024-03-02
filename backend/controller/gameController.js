import { getGamesFromRepo, getGameFromRepo, updateGameInRepo, deleteGameInRepo, createGameInRepo } from '../repository/gameRepository.js';

// Handle 404 errors to show user when a game is not found
const handleGameNotFound = (res, id) => {
  res.status(404).send(`Game ${id} not found`);
};

// Handle errors
const handleError = (res, status, message) => {
  res.status(status).send(message);
};

/**
 * Retrieves all games from the database.
 * 
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const getAllGames = async (req, res) => {
    try {
      const games = await getGamesFromRepo();
      res.status(200).send(games);
    } catch (e) {
      handleError(res, 500, `Failed to fetch a list of games: ${e.message}`);
    }
};

/**
 * Retrieves a single game by ID from the database.
 * 
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const getGame = async (req, res) => {
    const { id } = req.params;
    try {
        // Update id when we implement it in model
      const game = await getGameFromRepo({ _id: id }); 
      if (!game) {
        handleGameNotFound(res, id);
      } else {
        res.status(200).send(game);
      }
    } catch (e) {
      handleError(res, 500, `Failed to fetch game ${id}: ${e.message}`);
    }
};

/**
 * Updates a single game by ID in the database.
 * 
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const updateGame = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const game = await updateGameInRepo(id, body);
      if (!game) {
        handleGameNotFound(res, id);
      } else {
        res.status(200).send(game);
      }
    } catch (e) {
      handleError(res, 500, `Failed to update game ${id}: ${e.message}`);
    }
};

/**
 * Deletes a single game by ID from the database.
 * 
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
      const game = await deleteGameInRepo({ _id: id });
      if (game) {
        if (!game) {
          handleGameNotFound(res, id);
        } else {
          res.status(204).send(game);
        }
      } else {
        handleError(res, 404, `Failed to delete game ${id}: ${e.message}`);
      }
    } catch (e) {
      handleError(res, 500, `Failed to delete game ${id}: ${e.message}`);
    }
};

/**
 * Creates a single game in the database.
 * 
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const createGame = async (req, res) => {
    const { body } = req;
    try {
      const game = await createGameInRepo(body);
      if (!game) {
        handleGameNotFound(res, id);
      } else {
        res.status(200).send(game);
      }
    } catch (e) {
      handleError(res, 500, `Failed to create game: ${e.message}`);
    }
};