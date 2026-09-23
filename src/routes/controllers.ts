import { Router } from "express";
import { handleGetControllers } from "../controllers/controllers.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const controllersRouter = Router();

controllersRouter.get("/", asyncHandler(handleGetControllers));
