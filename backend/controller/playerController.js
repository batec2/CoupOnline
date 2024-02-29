import Player from '../model/players.model.js';

// Handle player not found
const handlePlayerNotFound = (res, playerId) => {
    handleError(res, 404, `Player with ID ${playerId} not found`);
};

// Handle errors
const handleError = (res, status, message) => {
    res.status(status).send(message);
};

/**
 * Get all players
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).send(players);
    } catch (error) {
        handleError(res, 500, `Failed to fetch players: ${error.message}`);
    }
};
