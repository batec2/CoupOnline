import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(morgan("dev")); //console logging
app.use(express.json()); //body parsing
app.use(express.urlencoded({ extended: true })); //query string

export default app;