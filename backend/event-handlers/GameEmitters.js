export const emitNextTurn = (io, roomId, currentTurnId) => {
  io.to(roomId).emit("start-game", {
    turnId: currentTurnId,
  });
};

export const emitCards = (io, socketId, gameCards) => {
  io.to(socketId).emit("game-cards", {
    gameCards: gameCards,
  });
};
