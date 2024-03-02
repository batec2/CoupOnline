import dotenv from "dotenv";
import { Server } from "socket.io";
import route from "./route/route.js";
import { connectDB } from "./database/database.js";
import middleware from "./middleware/middleware.js";

connectDB();
dotenv.config();

const PORT = 8080;

middleware.use("/", route);

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
  console.log(socket.id);
  socket.on("join-room", async (message) => {
    socket.join(message.currentRoom);
    io.to(socket.id).emit("give-id", { id: socket.id });
    // const players = await io.in(message.currentRoom).fetchSockets();
    // console.log(players);
    io.to(socket).emit("Current-Users", socket.id);
  });
});
