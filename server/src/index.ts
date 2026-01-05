import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

import aiRouter from "./routes/ai.routes.js";
import authRouter from "./routes/auth.routes.js";
import { connectDB } from "./db/connectDb.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/user", userRouter);
app.use("/api/ai/", aiRouter);
app.use("/api/oauth/google", authRouter);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});