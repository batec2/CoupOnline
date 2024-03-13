import { Server } from "socket.io";
export const createSocketIO = (httpServer, rooms) => {
  const io = new Server(httpServer, { cors: { origin: "*" } });
  /**
   * Listens for room deletion event, event is triggered when room is empty
   * The corresponding data structure is then deleted from the rooms object
   */
  io.of("/").adapter.on("delete-room", (room) => {
    console.log("Room: " + room + " deleted by server");
    delete rooms[room];
  });

  /**
   *
   */
  io.of("/").adapter.on("create-room", (room) => {
    console.log("Room: " + room + " was created by server");
    rooms[room] = {};
  });

  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`${id} has joined Room: ${room}`);
  });

  io.of("/").adapter.on("leave-room", (room, id) => {
    console.log(`${id} has left Room: ${room}`);
  });

  return io;
};
