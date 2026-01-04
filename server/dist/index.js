import express from "express";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 3000;
import aiRouter from "./routes/ai.routes.js";
app.use("/api/ai/", aiRouter);
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map