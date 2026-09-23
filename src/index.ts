import "dotenv/config";
import express from "express";
import cors from "cors";
import { systemInfoRouter } from "./routes/systemInfo.js";
import { controllersRouter } from "./routes/controllers.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { enclosuresRouter } from "./routes/enclosures.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/system-info", systemInfoRouter);
app.use("/api/controllers", controllersRouter);
app.use("/api/enclosures", enclosuresRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Must be registered last: Express only routes errors to handlers declared after the throwing route.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
