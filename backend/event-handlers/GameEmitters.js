import Games from "../model/games.model.js";
import Player from "../model/players.model.js";

export const emitStartGame = (io, roomId) => {
  io.to(roomId).emit("start-game");
};

export const emitUpdate = async (io, roomId, room) => {
  const { players, state } = room;
  const { hasWinner, winner } = state.checkEndGame();
  if (hasWinner) {
    const gameLogs = state.eventLog;
    const players = Object.keys(state.playerState);
    console.log(`${winner} has won the game!`);
    io.to(roomId).emit("end-game", { winner: winner });
    try {
      // Save game and players to database
      const gameId = await saveGameToDatabase(winner, players, gameLogs);
      await savePlayerGamesToDatabase(players, gameId);
    } catch (err) {
      console.error("Error saving to database:", err);
    }
    return;
  }
  if (players !== undefined) {
    Object.keys(players).forEach((player) => {
      const { socketId } = players[player];
      const { gameCards, coins } = state.getPlayer(player);
      // Sends players cards
      // Starts the game for players and sends player id of first turn\
      io.to(socketId).emit("update-state", {
        gameCards: gameCards,
        turnId: state.currentTurnId,
        coins: coins,
        discardDeck: state.discardDeck,
        playerCardCount: state.getPlayerCardCount(),
      });
    });

    state.resetTurnState();
    state.resetPassCount();
  }
};

const saveGameToDatabase = async (winner, playerIds, gameLogs) => {
  try {
    const players = playerIds.map((playerId) => ({ player: playerId }));
    const game = await Games.create({
      winner: winner,
      players,
      eventLog: gameLogs,
    });
    console.log("Game saved to database with ID:", game._id);
    return game._id; // return the ID of the created game
  } catch (err) {
    console.error("Error saving game to database:", err);
    throw err;
  }
};

const savePlayerGamesToDatabase = async (playerIds, gameId) => {
  try {
    const players = playerIds.map((playerId) => ({ player: playerId }));
    await Player.updateMany(
      { _id: { $in: playerIds } },
      { $push: { games: gameId } }
    );
    console.log("Game IDs saved to player database");
  } catch (err) {
    console.error("Error saving game ID to players database:", err);
    throw err;
  }
};
/**
 *
 * @param {*} io
 * @param {*} room
 */
export const emitPartialUpdate = (io, room) => {
  const { players, state } = room;
  if (players !== undefined) {
    Object.keys(players).forEach((player) => {
      const { socketId } = players[player];
      const { gameCards, coins } = state.getPlayer(player);
      io.to(socketId).emit("partial-update-state", {
        gameCards: gameCards,
        turnId: state.currentTurnId,
        coins: coins,
        discardDeck: state.discardDeck,
        playerCardCount: state.getPlayerCardCount(),
      });
    });
  }
};
