import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../lib/prisma";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "hulloTypescript";

interface JwtPayload {
  userId: number;
}

export const authToken = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    let token = req.cookies.token;

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({ mssg: "No token provided, auth failed" });
      return ;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.userId) },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return ;
    }

    (req as any).user = user;

    next(); 
  } catch (error: any) {
    console.error("Auth error:", error.message);
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expired" });
      return ;
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid token" });
      return ;
    } else {
      res.status(500).json({ error: "Internal server error" });
      return ;
    }
  }
};
