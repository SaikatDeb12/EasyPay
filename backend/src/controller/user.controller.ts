import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import zod from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../db";
import dotenv from "dotenv";
dotenv.config();

const updateSchema = zod.object({
  firstName: zod.string().min(1).optional(),
  lastName: zod.string().min(1).optional(),
  password: zod.string().min(6).optional(),
});

const handleUpdate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { success, data, error } = updateSchema.safeParse(body);

    if (!success) {
      res.status(411).json({ msg: "Error while updating ", error: error });
      return;
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
    const filter = req.query.filter || "";
    const query = {
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
      ],
    };
    const users = await collection.find(query).toArray();
    res.status(200).json({
      users: users.map((user) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err });
  }
};

export { handleUpdate, displayUser };
