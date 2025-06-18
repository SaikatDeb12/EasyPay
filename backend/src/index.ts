import express from "express";
import dotenv from "dotenv";
import connectdb from "./connectdb";
import mainRouter from "./routes";
import cors from "cors";
dotenv.config();
const app = express();

connectdb();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/", mainRouter);

app.listen(process.env.PORT, () =>
  console.log("Server started at PORT", process.env.PORT)
);
