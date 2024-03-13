export const registerLobbyHandlers = (io, socket, rooms) => {
  /**
   * Socket Joins a room adds a user's socketid and userId to the
   * rooms datastructure
   */
  socket.on("join-room", async ({ roomId, userId }, callback) => {
    if (!roomId) {
      return;
    }
    try {
      socket.join(roomId);
      rooms[roomId][socket.id] = { userId: userId };
      io.to(roomId).emit("lobby-members", { lobby: rooms[roomId] });
      callback({ status: 200 });
    } catch (e) {
      console.log(e);
      callback({ status: 500 });
    }
  });

  /**
   * Event for if client manually leaves room removes socket from the
   * rooms data structure and the internal rooms
   */
  socket.on("leave-room", async ({ roomId, userId }, callback) => {
    try {
      socket.leave(roomId);
      if (rooms[roomId]) {
        delete rooms[roomId][socket.id];
      }
      io.to(roomId).emit("lobby-members", { lobby: rooms[roomId] });
      callback({ status: 200 });
    } catch (e) {
      console.log(e);
      callback({ status: 500 });
    }
  });

  socket.on("disconnection", (socket) => {
    console.log(`${socket.id} has disconnected`);
  });
};
