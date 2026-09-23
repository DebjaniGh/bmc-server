import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { handleGetEnclosures } from "../controllers/enclosures.js";

export const enclosuresRouter = Router();
enclosuresRouter.get("/", asyncHandler(handleGetEnclosures));
