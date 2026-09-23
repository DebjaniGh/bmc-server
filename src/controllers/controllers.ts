import type { Request, Response } from "express";
import { getControllers } from "../db/controllerRepository.js";

export async function handleGetControllers(_req: Request, res: Response) {
  const controllers = await getControllers();
  res.json(controllers);
}
