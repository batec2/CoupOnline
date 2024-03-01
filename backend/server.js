import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import route from "./route/route.js"
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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
