import express from "express";
import dotenv from "dotenv";
import connectdb from "./connectdb";
import mainRouter from "./routes";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectdb();

app.use("api/v1/", mainRouter);

app.listen(process.env.PORT, () =>
  console.log("Server started at: ", process.env.PORT)
);
