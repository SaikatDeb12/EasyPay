import { Request, Response } from "express";
import { Auth, MongoClient } from "mongodb";
import zod from "zod";
import bcrypt from "bcrypt";
import { AccountModel, UserModel } from "./db";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const signUpSchema = zod.object({
  firstName: zod.string().min(1, "Required"),
  lastName: zod.string(),
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "Must be atleast 6 characters"),
});

const handleSignUp = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { success, data, error } = signUpSchema.safeParse(body);
    if (!success) {
      res.status(400).json({ msg: "Incorrect input", error });
      return;
    }

    const { firstName, lastName, email, password } = data;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const dbUser = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    //giving the user some random amount in the account:
    await AccountModel.create({
      userId: dbUser._id,
      balance: Math.random() * 1000 + 1,
    });

    const token = jwt.sign(
      { userId: dbUser._id },
      process.env.SECRET_JWT_KEY as string
    );
    res.status(200).json({ msg: "User created successfully", token: token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const signInSchema = zod.object({
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "Must be atleast 6 characters"),
});

const handleSignIn = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { success, data, error } = signInSchema.safeParse(body);
    if (!success) {
      res.status(400).json({ msg: "Invalid credentials", error });
      return;
    }

    const { email, password } = data;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(400).json({ msg: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_JWT_KEY as string
    );

    res.status(200).json({ msg: "Login successful", token: token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updateSchema = zod.object({
  firstName: zod.string().min(1).optional(),
  lastName: zod.string().min(1).optional(),
  password: zod.string().min(6).optional(),
});

interface AuthRequest extends Request {
  userId: string;
}

const handleUpdate = async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const { success, data, error } = updateSchema.safeParse(body);

    if (!success) {
      return res
        .status(411)
        .json({ msg: "Error while updating ", error: error });
    }

    const { firstName, lastName, password } = data;
    const newData: Record<string, string> = {};
    if (firstName) newData.firstName = firstName;
    if (lastName) newData.lastName = lastName;
    if (password) {
      //need to hash the new password:
      newData.password = await bcrypt.hash(password, 10);
    }

    await UserModel.updateOne({ userId: req.userId }, { $set: newData });

    res.status(200).json({ msg: "Update successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const displayUser = async (req: Request, res: Response) => {
  try {
    const client = new MongoClient(process.env.MONGODB_URL as string);
    const database = client.db("user");
    const collection = database.collection("users");
    // const query = {
    //   $or: [{ firstName: { $eq: "" } }, { lastName: { $eq: "" } }],
    // };
    const users = await collection.find().toArray();
    res.status(200).json(
      users.map((user) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }))
    );
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getBalance = async (req: AuthRequest, res: Response) => {
  try {
    const account = await AccountModel.findOne({ userId: req.userId });
    res.status(200).json({ msg: `Balance Rs. ${account?.balance}` });
  } catch (err) {
    res.status(400).json({ msg: "Account not found" });
  }
};

const transactionSchema = zod.object({
  to: zod.string().min(1),
  amount: zod.number().min(1),
});

const handleTransfer = async (req: AuthRequest, res: Response) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const body = req.body;
    // const { success, data, error } = transactionSchema.safeParse(body);
    // if (!success) {
    //   return res.status(400).json({ msg: "Invalid input", error: error });
    // }

    const { to, amount } = body;
    const user = await AccountModel.findOne({ userId: req.userId }).session(
      session
    );
    if (!user || (user.balance as number) < Number(amount)) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    const receiver = UserModel.findOne({ userId: to }).session(session);
    if (!receiver) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Invalid account" });
    }

    //transaction:
    await AccountModel.updateOne(
      { userId: req.userId },
      { $inc: { balance: -Number(amount) } }
    ).session(session);
    await AccountModel.updateOne(
      { userId: to },
      { $inc: { balance: Number(amount) } }
    ).session(session);

    await session.commitTransaction();
    res.status(200).json({ msg: "Transaction successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export {
  handleSignUp,
  handleSignIn,
  handleUpdate,
  displayUser,
  getBalance,
  handleTransfer,
};
