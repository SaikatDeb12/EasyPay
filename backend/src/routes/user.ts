import express from "express";
import { handleUser } from "../controller";
const userRouter=express.Router();
userRouter.("/user", handleUser);

export default userRouter;
