import {
  getPlayersFromRepo,
  getPlayerFromRepo,
  updatePlayerInRepo,
  deletePlayerInRepo,
  createPlayerInRepo,
} from "../repository/playerRepository.js";

// Handle 404 errors to show user when a player is not found
const handlePlayerNotFound = (res, id) => {
  res.status(404).send(`Player ${id} not found`);
};

// Handle errors
const handleError = (res, status, message) => {
  res.status(status).send(message);
};

/**
 * Retrieves a list of all players from the database.
 *
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const getPlayers = async (req, res) => {
  try {
    const players = await getPlayersFromRepo();
    setTimeout(() => {
      res.status(200).send(players);
    }, 3000);
    // res.status(200).send(players);
  } catch (e) {
    handleError(res, 500, `Failed to fetch a list of players: ${e.message}`);
  }
};

/**
 * Retrieves a single player by ID from the database.
 *
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const getPlayer = async (req, res) => {
  const { id } = req.params;
  console.log(req.session)

  try {
    const player = await getPlayerFromRepo({ _id: id });
    if (!player) {
      handlePlayerNotFound(res, id);
    } else {
      res.status(200).send(player);
    }
  } catch (e) {
    handleError(res, 500, `Failed to fetch player ${id}: ${e.message}`);
  }
};

/**
 * Retrieve a player by username from the repository
 *
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const getPlayerByUsername = async (req, res) => {
  const { username } = req.params;
  console.log(req.session)

  try {
    const user = await getPlayerFromRepo({ userName: username });
    if (user) {
      res.status(200).send(user);
    } else {
      handlePlayerNotFound(res, username);
    }
  } catch (error) {
    handleError(
      res,
      500,
      `Failed to fetch player ${username}: ${error.message}`
    );
  }
};
/**
 * Updates a single player by ID in the database.
 *
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const player = await updatePlayerInRepo(id, body);
    if (!player) {
      handlePlayerNotFound(res, id);
    } else {
      res.status(200).send(player);
    }
  } catch (e) {
    handleError(res, 500, `Failed to update player ${id}: ${e.message}`);
  }
};

/**
 * Deletes a single player by ID from the database.
 *
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await deletePlayerInRepo({ _id: id });
    if (player) {
      if (!player) {
        handlePlayerNotFound(res, id);
      } else {
        res.status(204).send(player);
      }
    } else {
      handleError(res, 404, `Failed to delete player ${id}: ${e.message}`);
    }
  } catch (e) {
    handleError(res, 500, `Failed to delete player ${id}: ${e.message}`);
  }
};

/**
 * Creates a single player in the database.
 *
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
export const createPlayer = async (req, res) => {
  const { body } = req;
  try {
    const player = await createPlayerInRepo(body);
    if (!player) {
      handlePlayerNotFound(res, id);
    } else {
      res.status(200).send(player);
    }
  } catch (e) {
    handleError(res, 500, `Failed to create player: ${e.message}`);
  }
};
