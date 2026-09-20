import type { Request, Response } from "express";
import {
  getSystemInfo,
  updateSystemInfo,
} from "../db/systemInfoRepository.js";
import { systemInfoPatchSchema } from "../validation/systemInfo.js";

export async function handleGetSystemInfo(_req: Request, res: Response) {
  const info = await getSystemInfo();
  if (!info) {
    res.status(404).json({ error: "System info not found" });
    return;
  }
  res.json(info);
}

export async function handlePatchSystemInfo(req: Request, res: Response) {
  const parsed = systemInfoPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.issues.map((issue) => ({
        field: issue.path.join(".") || undefined,
        message: issue.message,
      })),
    });
    return;
  }

  const info = await updateSystemInfo(parsed.data);
  if (!info) {
    res.status(404).json({ error: "System info not found" });
    return;
  }
  res.json(info);
}
