import express from "express";
import { handleSignIn, handleSignUp } from "../controller";
const userRouter = express.Router();
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);

export default userRouter;
