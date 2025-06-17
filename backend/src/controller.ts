import { Request, Response } from "express";
import zod from "zod";

const signupSchema = zod.object({
  firstName: zod.string().min(1, "Required"),
  lastName: zod.string(),
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "Must be atleast 6 characters"),
});

const handleSignUp = (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
};

const handleSignIn = (req: Request, res: Response) => {};

export { handleSignUp, handleSignIn };
