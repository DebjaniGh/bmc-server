import { Router } from "express";
import {
  handleGetSystemInfo,
  handlePatchSystemInfo,
} from "../controllers/systemInfo.js";

export const systemInfoRouter = Router();

systemInfoRouter.get("/", handleGetSystemInfo);
systemInfoRouter.patch("/", handlePatchSystemInfo);
