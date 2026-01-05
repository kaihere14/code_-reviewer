import type { Request, Response } from "express";
import { prisma } from '../db/connectDb.js';

export const verifyUser = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                profileImage: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "User logged out successfully" });
}