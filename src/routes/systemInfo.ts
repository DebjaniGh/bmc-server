import { Router } from "express";
import {
  handleGetSystemInfo,
  handlePatchSystemInfo,
} from "../controllers/systemInfo.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const systemInfoRouter = Router();

systemInfoRouter.get("/", asyncHandler(handleGetSystemInfo));
systemInfoRouter.patch("/", asyncHandler(handlePatchSystemInfo));
