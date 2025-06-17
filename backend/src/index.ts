import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectdb from "./connectdb";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectdb();

app.listen(8000, () => console.log("Server started at: ", 8000));
