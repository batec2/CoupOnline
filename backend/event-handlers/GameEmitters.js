export const emitStartGame = (io, roomId) => {
  io.to(roomId).emit("start-game");
};

export const emitUpdate = (io, room) => {
  const { players, state } = room;
  console.log(players)
  Object.keys(players).forEach((player) => {
    const { gameCards, coins } = state.getPlayer(player);
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
};
