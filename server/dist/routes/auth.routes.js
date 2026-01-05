import { Router } from "express";
import { googleAuthCallback, googleAuthRedirect } from "../controllers/oAuth.controller.js";
const router = Router();
router.get("/redirect", googleAuthRedirect);
router.get("/callback", googleAuthCallback);
export default router;
