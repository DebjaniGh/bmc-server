import type { Request, Response } from "express";
import { getSystemInfo } from "../db/systemInfoRepository.js";

export async function handleGetSystemInfo(_req: Request, res: Response) {
  const info = await getSystemInfo();
  if (!info) {
    res.status(404).json({ error: "System info not found" });
    return;
  }
  res.json(info);
}
