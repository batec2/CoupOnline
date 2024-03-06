import Player from "../model/players.model.js";

/**
 * Retrieves all players from the database based on a query.
 * 
 * @param {Object} query The query object to filter players
 * @throws {Error} Throws an error if there's an issue fetching players
 */
export const getPlayersFromRepo = async (query) => {
    try {
      const players = await Player.find(query);
      return players;
    } catch (e) {
      throw new Error("Error while fetching players!");
    }
};

/**
 * Retrieves a single player from the database based on a query.
 * 
 * @param {Object} query The query object to find a specific player
 * @throws {Error} Throws an error if there's an issue fetching the player
 */
export const getPlayerFromRepo = async (query) => {
    try {
      console.log(query)
      const player = await Player.findOne(query);
      return player;
    } catch (e) {
      throw new Error(`Error while fetching player: ${query.id}`);
    }
};

/**
 * Updates a single player in the database based on its ID and an update object.
 * 
 * @param {number} id The ID of the player to update
 * @param {Object} update The update object containing fields to update
 * @throws {Error} Throws an error if there's an issue updating the player
 */
export const updatePlayerInRepo = async (id, update) => {
    try {
      const player = await Player.findOneAndUpdate({ _id: id }, { ...update }, { new: true }).lean();
      return player;
    } catch (e) {
      throw new Error(`Error while updating player: ${id}`);
    }
};

/**
 * Deletes a single player from the database based on a query.
 * 
 * @param {Object} query The query object to find and delete a player
 * @throws {Error} Throws an error if there's an issue deleting the player
 */
export const deletePlayerInRepo = async (query) => {
    try {
      const player = await Player.findOneAndDelete({ ...query });
      return player;
    } catch (e) {
      throw new Error(`Error while deleting a player: ${query.id}`);
    }
} ;

/**
 * Creates a single player in the database.
 * 
 * @param {Object} payload The payload object containing player data to create
 * @throws {Error} Throws an error if there's an issue creating the player
 */
export const createPlayerInRepo = async (payload) => {
    try {
      const savedPlayer = await new Player({ ...payload }).save();
      return savedPlayer;
    } catch (e) {
      console.log(e)
      throw new Error("Error while creating a player");
    }
};