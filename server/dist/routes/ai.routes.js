import { Router } from "express";
import { generateAIContent } from "../controllers/ai.controller.js";
const router = Router();
router.post("/aiTest", generateAIContent);
router.get("/health", (req, res) => {
    res.status(200).json({ message: "Your server is healthy" });
});
export default router;
//# sourceMappingURL=ai.routes.js.map