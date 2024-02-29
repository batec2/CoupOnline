import Game from "../model/games.model.js";

// Get all games from the database
export const getAllGamesFromRepo = async () => {
    try {
        const games = await Game.find();
        return games;
    } catch (error) {
        throw new Error("Error while fetching games!");
    }
};