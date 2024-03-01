import Game from '../model/games.model.js';

// Handle game not found
const handleGameNotFound = (res, gameId) => {
    handleError(res, 404, `Game with ID ${gameId} not found`);
};

// Handle errors
const handleError = (res, status, message) => {
    res.status(status).send(message);
};

/**
 * Get all games
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).send(games);
    } catch (error) {
        handleError(res, 500, `Failed to fetch games: ${error.message}`);
    }
};