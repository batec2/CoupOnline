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
  console.log(`${socket.id} connected`);
  socket.on("join-room", async (message, callback) => {
    if (!message || !message.roomId) {
      return;
    }
    try {
      const { roomId } = message;
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}`);
      // const sockets = await io.in(roomId).fetchSockets();
      // console.log(sockets);
      callback({ status: 200 });
    } catch (e) {
      console.log(e);
      callback({ status: 500 });
    }
  });
  socket.on("leave-room", async (message, callback) => {
    if (!message || !message.roomId) {
      return;
    }
    try {
      const { roomId } = message;
      socket.leave(roomId);
      console.log(`${socket.id} left room ${roomId}`);
      callback({ status: 200 });
    } catch (e) {
      console.log(e);
      callback({ status: 500 });
    }
  });

  socket.on("disconnection", (socket) => {
    console.log(`${socket.id} has disconnected`);
  });
});
