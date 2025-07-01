import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const protectedRouteHandler = (req: Request, res: Response) => {
  res.json({ msg: "welcome" });
};

export { protectedRouteHandler };
