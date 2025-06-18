import express from "express";
import { handleSignIn, handleSignUp, handleUpdate } from "../controller";
import authMiddleware from "../middleware";
const userRouter = express.Router();
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);
userRouter.put("/update", authMiddleware, handleUpdate);

export default userRouter;
