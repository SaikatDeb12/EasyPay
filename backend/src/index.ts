import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectdb from "./connectdb";
import mainRouter from "./routes";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectdb();

app.use("api/v1/", mainRouter);

app.listen(8000, () => console.log("Server started at: ", 8000));
