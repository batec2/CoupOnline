import Games from "../model/games.model.js";

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
      // Save game logs to database
      await saveToDatabase(players, gameLogs);
      console.log("Saved game logs to database:");
    } catch (err) {
      console.error("Error saving game logs to database:", err);
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

const saveToDatabase = async (players, gameLogs) => {
  try {
    // TODO: Since players are referenced to player model, gotta
    // figure that out instead of the cookies as shown here
    // await Games.create({ players: players, eventLog: gameLogs });

    await Games.create({ eventLog: gameLogs });
    console.log("Game state saved to database");
  } catch (err) {
    console.error("Error saving game state to database:", err);
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
