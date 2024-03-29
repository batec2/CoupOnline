export const emitStartGame = (io, roomId) => {
  io.to(roomId).emit("start-game");
};

export const emitUpdate = (io, roomId, room) => {
  const { players, state } = room;

  if(players !== undefined) {
    Object.keys(players).forEach((player) => {
      const {gameCards, coins} = state.getPlayer(player);
      // Sends players cards
      // Starts the game for players and sends player id of first turn\
      io.to(player).emit("update-state", {
        gameCards: gameCards,
        turnId: state.currentTurnId,
        coins: coins,
      });
    });

    state.resetTurnState();
    state.resetPassCount();
  }
};
