export const registerGameHandlers = (io, socket, rooms) => {
  socket.on("normal-action", ({ roomId, userId, action }) => {
    broadcastResponseRequest(socket, roomId, userId, action);
    console.log(action);
  });
};

const broadcastResponseRequest = (socket, roomId, userId, choice) => {
  socket.to(roomId).emit("player-choice", {
    responseAction: {
      userId: userId,
      choice: choice,
    },
  });
};
