import type { Request, Response } from "express";
import {
  getSystemInfo,
  updateSystemInfo,
  type SystemInfoPatch,
} from "../db/systemInfoRepository.js";

export async function handleGetSystemInfo(_req: Request, res: Response) {
  const info = await getSystemInfo();
  if (!info) {
    res.status(404).json({ error: "System info not found" });
    return;
  }
  res.json(info);
}

export async function handlePatchSystemInfo(req: Request, res: Response) {
  const fieldsToBeUpdated = req.body as SystemInfoPatch;
  const info = await updateSystemInfo(fieldsToBeUpdated);
  if (!info) {
    res.status(404).json({ error: "System info not found" });
    return;
  }
  res.json(info);
}
