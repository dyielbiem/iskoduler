import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Attach the user object to the request
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
      };
    }
  }
}

// Middleware to authenticate the client making the HTTP request
const authMiddleware: express.RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.body.token;
    const user: any = jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ Error: "Unauthorized" });
  }
};

export default authMiddleware;
