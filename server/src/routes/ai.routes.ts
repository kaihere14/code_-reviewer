import { Router } from "express";
import type { Response,Request } from "express";
import { generateAIContent } from "../controllers/ai.controller.js";

const router =  Router();


router.post("/aiTest",generateAIContent)
router.get("/health",(req:Request,res:Response)=>{
    res.status(200).json({message:"Your server is healthy"})
})

export default router