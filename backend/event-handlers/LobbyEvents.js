import { GameState } from "../state/GameState.js";

export const registerLobbyHandlers = (io, socket, rooms) => {
  /**
   * Socket Joins a room adds a user's socketid and userId to the
   * rooms datastructure
   */
  socket.on("join-room", ({ roomId, userId }, callback) => {
    if (!roomId) {
      return;
    }
    try {
      socket.join(roomId);
      rooms[roomId].players[socket.id] = { userId: userId };
      io.to(roomId).emit("lobby-members", { lobby: rooms[roomId].players });
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
  socket.on("leave-room", ({ roomId, userId }, callback) => {
    try {
      socket.leave(roomId);

      if (!rooms[roomId]) {
        return;
      }

      delete rooms[roomId].players[socket.id];
      io.to(roomId).emit("lobby-members", { lobby: rooms[roomId].players });
      callback({ status: 200 });
    } catch (e) {
      console.log(e);
      callback({ status: 500 });
    }
  });

  socket.on("start-game", async ({ roomId }, callback) => {
    console.log(roomId);
    console.log("start-game");
    if (!rooms[roomId]) {
      return;
    }
    const room = rooms[roomId];
    const ids = Object.keys(room.players);
    if (ids.length > 1 && !room.state) {
      room.state = new GameState(ids);

      // Sends each player their cards and starts the game
      io.in(roomId)
        .fetchSockets()
        .then((sockets) => {
          // Sends sends each player their cards when game starts
          sockets.forEach((socket) => {
            const socketId = socket.id;
            console.log(socketId);
            io.to(socketId).emit("game-cards", {
              cards: room.state.getPlayersCards(socketId),
            });
            // Starts the game for players and sends player id of first turn
            io.to(roomId).emit("start-game", {
              turnId: room.state.currentTurnId,
            });
            callback({ status: 200 });
          });
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }
    callback({ status: 500 });
  });

  socket.on("disconnection", (socket) => {
    console.log(`${socket.id} has disconnected`);
  });
};