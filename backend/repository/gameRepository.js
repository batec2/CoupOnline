import Game from "../model/games.model.js";

/**
 * Retrieves all games from the database based on a query.
 * 
 * @param {Object} query The query object to filter games
 * @throws {Error} Throws an error if there's an issue fetching games
 */
export const getGamesFromRepo = async (query) => {
    try {
      const games = await Game.find(query);
      return games;
    } catch (e) {
      throw new Error("Error while fetching games!");
    }
};

/**
 * Retrieves a single game from the database based on a query.
 * 
 * @param {Object} query The query object to find a specific game
 * @throws {Error} Throws an error if there's an issue fetching the game
 */
export const getGameFromRepo = async (query) => {
    try {
      const game = await Game.findOne(query);
      return game;
    } catch (e) {
      throw new Error(`Error while fetching game: ${query.id}`);
    }
};

/**
 * Updates a single game in the database based on its ID and an update object.
 * 
 * @param {number} id The ID of the game to update
 * @param {Object} update The update object containing fields to update
 * @throws {Error} Throws an error if there's an issue updating the game
 */
export const updateGameInRepo = async (id, update) => {
    try {
      const game = await Game.findOneAndUpdate({ _id: id }, { ...update }, { new: true }).lean();
      return game;
    } catch (e) {
      throw new Error(`Error while updating game: ${id}`);
    }
};

/**
 * Deletes a single game from the database based on a query.
 * 
 * @param {Object} query The query object to find and delete a game
 * @throws {Error} Throws an error if there's an issue deleting the game
 */
export const deleteGameInRepo = async (query) => {
    try {
      const game = await Game.findOneAndDelete({ ...query });
      return game;
    } catch (e) {
      throw new Error(`Error while deleting a game: ${query.id}`);
    }
};

/**
 * Creates a single game in the database.
 * 
 * @param {Object} payload The payload object containing game data to create
 * @throws {Error} Throws an error if there's an issue creating the game
 */
export const createGameInRepo = async (payload) => {
    try {
      const savedGame = await new Game({ ...payload }).save();
      return savedGame;
    } catch (e) {
      throw new Error("Error while creating a game");
    }
};