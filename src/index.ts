import "dotenv/config";
import express from "express";
import cors from "cors";
import { systemInfoRouter } from "./routes/systemInfo.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/system-info", systemInfoRouter);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
