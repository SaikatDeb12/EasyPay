import { Request, Response } from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "./db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signupSchema = zod.object({
  firstName: zod.string().min(1, "Required"),
  lastName: zod.string(),
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "Must be atleast 6 characters"),
});

const handleSignUp = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { firstName, lastName, email, password } = body;
    const success = signupSchema.safeParse(body);
    if (!success) {
      res.status(400).json({ msg: "Incorrect input" });
      return;
    }

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

    const token = jwt.sign(
      { userId: dbUser._id },
      process.env.SECRET_JWT_KEY as string
    );
    res.json({ msg: "User created successfully", token: token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const handleSignIn = (req: Request, res: Response) => {};

export { handleSignUp, handleSignIn };
