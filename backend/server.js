import dotenv from "dotenv";
import playersRoute from "./route/players.route.js";
import gamesRoute from "./route/games.route.js";
import { connectDB } from "./database/database.js";
import middleware from "./middleware/middleware.js";
import { registerLobbyHandlers } from "./event-handlers/LobbyEvents.js";
import { registerGameHandlers } from "./event-handlers/GameEvents.js";
import { createSocketIO } from "./event-handlers/IOEvents.js";

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

/**
 * Object to contained rooms and the users currently in the rooms
 */
const rooms = {};

//Socket io
//Both express and socket io on the same port
const io = createSocketIO(httpServer, rooms);

const onConnection = (socket) => {
  registerLobbyHandlers(io, socket, rooms);
  registerGameHandlers(io, socket, rooms);
  console.log(`${socket.id} connected`);
};

io.on("connection", onConnection);
