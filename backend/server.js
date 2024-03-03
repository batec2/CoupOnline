import dotenv from "dotenv";
import { Server } from "socket.io";
import playersRoute from "./route/players.route.js";
import gamesRoute from "./route/games.route.js";
import { connectDB } from "./database/database.js";
import middleware from "./middleware/middleware.js";

connectDB();
dotenv.config();

const PORT = 8080;

middleware.use("/games", gamesRoute);
middleware.use("/players", playersRoute);

//Defaults if can't match route
middleware.use((req, res) => {
  res.status(404).json({ message: "Invalid Route" });
});

const httpServer = middleware.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

//Socket io
//Both express and socket io on the same port
const io = new Server(httpServer, { cors: { origin: "*" } });


io.on("connection", (socket) => {
  socket.on("join-room", async (message, callback) => {
    try {
      socket.join(message.roomName);
      console.log(`${socket.id} joined room ${message.roomName}`);
      const sockets = await io.in(message.roomName).fetchSockets();
      console.log(sockets);
      callback({ status: 200 });
    } catch (e) {
      console.log(e);
      callback({ status: 500 });
    }
  });
  socket.on("leave-room", async (message, callback) => {
    try {
      socket.leave(message.roomName);
      console.log(`${socket.id} left room ${message.roomName}`);
      callback({ status: 200 });
    } catch (e) {
      console.log(e);
      callback({ status: 500 });
    }
  });
});


