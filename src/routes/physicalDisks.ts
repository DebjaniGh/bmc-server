import { Router } from "express";
import { handleGetPhysicalDisks } from "../controllers/physicalDisks.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const physicalDisksRouter = Router();

physicalDisksRouter.get("/", asyncHandler(handleGetPhysicalDisks));
