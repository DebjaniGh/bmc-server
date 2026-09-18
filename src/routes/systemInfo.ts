import { Router } from "express";
import { handleGetSystemInfo } from "../controllers/systemInfo.js";

export const systemInfoRouter = Router();

systemInfoRouter.get("/", handleGetSystemInfo);
