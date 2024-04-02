import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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
// app.use(cookieParser());

export default app;
