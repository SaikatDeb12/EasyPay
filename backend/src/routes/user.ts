import express from "express";
import { displayUser, handleUpdate } from "../controller/user.controller";
import authMiddleware from "../middleware";
import { handleSignIn, handleSignUp } from "../controller/auth.controller";
const userRouter = express.Router();
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);
userRouter.put("/update", authMiddleware, handleUpdate);
userRouter.get("/bulk", authMiddleware, displayUser);

export default userRouter;
