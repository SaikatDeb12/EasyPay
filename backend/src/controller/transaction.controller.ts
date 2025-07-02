import { Request, Response } from "express";
import zod from "zod";
import { AccountModel, UserModel } from "../db";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const getBalance = async (req: Request, res: Response) => {
  try {
    const account = await AccountModel.findOne({ userId: req.userId });
    res
      .status(200)
      .json({ amount: `${account?.balance}`, currentUserId: req.userId });
  } catch (err) {
    res.status(400).json({ msg: "Account not found" });
  }
};

const transactionSchema = zod.object({
  to: zod.string().min(1),
  amount: zod.number().min(1, "Min 1 and max 1,00,000").max(100000),
});

const handleTransfer = async (req: Request, res: Response) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const body = req.body;
    const { success, data, error } = transactionSchema.safeParse(body);
    if (!success) {
      res.status(400).json({ msg: error.errors[0].message });
      return;
    }

    const { to, amount } = data;
    const user = await AccountModel.findOne({ userId: req.userId }).session(
      session
    );
    if (!user || (user.balance as number) < amount) {
      await session.abortTransaction();
      res.status(400).json({ msg: "Insufficient balance" });
      return;
    }

    const receiver = UserModel.findOne({ userId: to }).session(session);
    if (!receiver) {
      await session.abortTransaction();
      res.status(400).json({ msg: "Invalid account" });
      return;
    }

    //transaction:
    await AccountModel.updateOne(
      { userId: req.userId },
      { $inc: { balance: amount * -1 } }
    ).session(session);
    await AccountModel.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.status(200).json({ msg: "Transaction successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export { getBalance, handleTransfer };
