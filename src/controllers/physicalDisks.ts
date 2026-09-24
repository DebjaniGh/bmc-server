import type { Request, Response } from "express";
import { getPhysicalDisks } from "../db/physicalDiskRepository.js";
import { physicalDiskQuerySchema } from "../validation/physicalDisks.js";

export async function handleGetPhysicalDisks(req: Request, res: Response) {
  const parsed = physicalDiskQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid query parameters",
      details: parsed.error.issues.map((issue) => issue.message),
    });
    return;
  }

  const disks = await getPhysicalDisks(parsed.data);
  res.json(disks);
}
