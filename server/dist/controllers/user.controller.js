import { prisma } from '../db/connectDb.js';
export const verifyUser = async (req, res) => {
    const userId = req.userId;
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
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
export const logoutUser = (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "User logged out successfully" });
};
