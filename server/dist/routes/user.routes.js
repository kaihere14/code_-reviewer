import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import { logoutUser, verifyUser } from "../controllers/user.controller.js";
const router = Router();
router.get("/verify", verifyJwt, verifyUser);
router.post("/logout", logoutUser);
export default router;
