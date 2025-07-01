import express from "express";
import userRouter from "./user";
import accountRouter from "./account";
import authMiddleware from "../middleware";
import { protectedRouteHandler } from "../controller/protected.controller";
const mainRouter = express.Router();
mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);
mainRouter.get("/home", authMiddleware, protectedRouteHandler);

export default mainRouter;
