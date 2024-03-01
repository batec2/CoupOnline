import Player from "../model/players.model.js";

// Get all players from the database
export const getAllPlayersFromRepo = async () => {
    try {
        const players = await Player.find();
        return players;
    } catch (error) {
        throw new Error("Error while fetching players!");
    }
};