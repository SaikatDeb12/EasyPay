import express from "express";
import {
  displayUser,
  handleSignIn,
  handleSignUp,
  handleUpdate,
} from "../controller";
import authMiddleware from "../middleware";
const userRouter = express.Router();
userRouter.post("/signup", handleSignUp);
userRouter.post("/signin", handleSignIn);
userRouter.put("/update", authMiddleware, handleUpdate);
userRouter.get("/bulk", displayUser);

export default userRouter;
