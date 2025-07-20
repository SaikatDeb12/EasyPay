import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

interface JwtPayload {
    userId: string;
}

const authMiddleware: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
        res.status(400).json({ msg: "No token, access denied!" });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.SECRET_JWT_KEY as string,
        ) as JwtPayload;

        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token not valid" });
    }
};

export default authMiddleware;
