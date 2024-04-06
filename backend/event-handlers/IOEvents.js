import { Server } from "socket.io";
export const createSocketIO = (httpServer, rooms) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["https://batec2.github.io", "http://localhost:5173"],
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
      credentials: true,
    },
  });
  /**
   * Listens for room deletion event, event is triggered when room is empty
   * The corresponding data structure is then deleted from the rooms object
   */
  io.of("/").adapter.on("delete-room", (room) => {
    console.log("Room: " + room + " deleted by server");
    delete rooms[room];
  });

  /**
   * Creates a room entry in the rooms datasructure when a player
   * joins a socketIo Room
   */
  io.of("/").adapter.on("create-room", (room) => {
    console.log("Room: " + room + " was created by server");
    rooms[room] = {};
    rooms[room].players = {};
    rooms[room].state = null;
  });

  /**
   * Triggers when a player joins a socketIo room
   */
  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`${id} has joined Room: ${room}`);
  });

  /**
   * Event that occurs when a player leaves a socketIo room
   */
  io.of("/").adapter.on("leave-room", (room, id) => {
    if (rooms[room]) {
      delete rooms[room].players[id];
    }
    console.log(`${id} has left Room: ${room}`);
  });

  return io;
};
