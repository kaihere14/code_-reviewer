import { Router } from "express";
import { generateAIContent } from "../controllers/ai.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
const router = Router();
router.post("/review", verifyJwt, generateAIContent);
router.get("/health", (req, res) => {
    res.status(200).json({ message: "Your server is healthy" });
});
export default router;
