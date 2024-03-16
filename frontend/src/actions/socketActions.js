export const handleNormalAction = (socket, roomId, action) => {
  socket.emit("normal-action", {
    roomId: roomId,
    userId: socket.id,
    action: action,
  });
};

export const handleResponseAction = (socket, roomId, requestId, action) => {
  socket.emit("response-action", {
    roomId: roomId,
    requestId: requestId,
    action: action,
  });
};

export const handleStartGame = (socket, roomId) => {
  socket.emit(
    "start-game",
    { roomId: roomId, userId: socket.id },
    ({ status }) => {
      console.log(status);
    }
  );
};
