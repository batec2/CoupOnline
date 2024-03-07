import mongoose from "mongoose";
import Player from "../model/players.model.js";
import Game from "../model/games.model.js";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/couponline", {
});

// Create fake player data
const players = [
  {
    userName: "Johnny12",
    screenName: "John",
  },
  {
    userName: "JaneSin19",
    screenName: "Jane",
  },
  {
    userName: "XxAlicexX",
    screenName: "Alice",
  },
  {
    userName: "XxtoddxX",
    screenName: "Todd",
  },
];

// Create fake game data
const games = [
  {
    active: true,
    playerCount: 4,
    players: [],
    winner: null,
    rounds: [],
  },
  {
    active: false,
    playerCount: 4,
    players: [],
    winner: null,
    rounds: [],
  },
];

// Function to create players and add them to games
async function createPlayersAndGames() {
  try {
    // Create players
    const createdPlayers = await Player.create(players);

    // Assign players to games
    games.forEach((game) => {
      game.players = createdPlayers.map((player) => ({
        player: player._id,
        cardOne: 1,
        cardTwo: 2,
      }));
    });

    // Create games
    await Game.create(games);

    console.log("Sample data created successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating Sample data:", error);
  }
}

// Call the function to create players and games
createPlayersAndGames();