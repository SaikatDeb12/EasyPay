import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "./db";
dotenv.config();

interface AuthRequest extends Request {
  userId?: string;
}

interface JwtPayload {
  userId: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ msg: "No token, access denied!" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_JWT_KEY as string
    ) as JwtPayload;

    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};

export default authMiddleware;
