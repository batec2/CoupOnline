import { GameState } from "./GameState.js";
import { emitStartGame, emitUpdate } from "./GameEmitters.js";

export const registerLobbyHandlers = (io, socket, rooms) => {
  const { id, username, screenname } = socket.handshake.headers;
  /**
   * Socket Joins a room adds a user's socketid and userId to the
   * rooms datastructure
   */
  socket.on("join-room", ({ roomId }, callback) => {
    if (!roomId) {
      return;
    }
    try {
      // There is a max of 6 players
      // if (keys >= 6) {
      //   callback({ status: 401 });
      //   return;
      // }
      socket.join(roomId);
      console.log(
        `Socket-id:${socket.id} UserId:${socket.handshake.headers.id} Screenname: ${screenname} Username: ${username}`
      );
      const keys = Object.keys(rooms[roomId].players);
      console.log(keys);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === id) {
          callback({ status: 400 });
          return;
        }
      }
      rooms[roomId].players[id] = {
        socketId: socket.id,
        screenname: screenname,
        username: username,
      };
      console.log(rooms[roomId].players);
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
  socket.on("leave-room", ({ roomId }, callback) => {
    try {
      socket.leave(roomId);

      if (!rooms[roomId]) {
        return;
      }
      delete rooms[roomId].players[id];
      io.to(roomId).emit("lobby-members", { lobby: rooms[roomId].players });
      callback({ status: 200 });
    } catch (e) {
      console.log(e);
      callback({ status: 500 });
    }
  });

  socket.on("start-game", ({ roomId }, callback) => {
    console.log(`Room: ${roomId} Start Game`);
    if (!rooms[roomId]) {
      return;
    }
    let room = rooms[roomId];

    const ids = Object.keys(room.players);
    if (ids.length > 1 && !room.state) {
      room.state = new GameState(ids);
      // Sends sends each player their cards when game starts and the current
      // Player whos turn it is
      emitUpdate(io, roomId, room);
      emitStartGame(io, roomId);
      callback({ status: 200 });
    }
    callback({ status: 500 });
  });

  socket.on("reset-game", ({ roomId }, callback) => {
    let room = rooms[roomId];
    const ids = Object.keys(room.players);
    if (ids.length > 1) {
      room.state = new GameState(ids);
      // Sends sends each player their cards when game starts and the current
      // Player whos turn it is
      emitUpdate(io, roomId, room);
    }
  });

  socket.on("disconnection", () => {
    console.log(`${id} has disconnected`);
  });
};
