import type { Request, Response } from "express";
import { getEnclosures } from "../db/enclosureRepository.js";

export async function handleGetEnclosures(_req: Request, res: Response) {
  const enclosures = await getEnclosures();
  res.json(enclosures);
}
