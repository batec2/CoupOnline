import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { Server } from "socket.io";
import route from "./route/route.js";
import { connectDB } from "./database/database.js";

connectDB();
dotenv.config();

const app = express();
const PORT = 8080;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use("/", route);
app.use(morgan("dev")); //console loging
app.use(express.json()); //body parsing
app.use(express.urlencoded({ extended: true })); //query string

//Defaults if cant match route
app.use((req, res) => {
  res.status(404).json({ message: "Invalid Route" });
});

const httpServer = app.listen(PORT, () => {
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
