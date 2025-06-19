import express from "express";
import { getBalance, handleTransfer } from "../controller";
import authMiddleware from "../middleware";
const accountRouter = express.Router();
accountRouter.get("/balance", authMiddleware, getBalance);
accountRouter.post("/transfer", authMiddleware, handleTransfer);

export default accountRouter;
