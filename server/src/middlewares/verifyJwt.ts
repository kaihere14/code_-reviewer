import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error });
    }
};