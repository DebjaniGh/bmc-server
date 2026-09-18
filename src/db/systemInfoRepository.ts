import { pool } from "./pool.js";

export interface SystemInfo {
  id: string;
  hostName: string;
  assetTag: string;
  location: string;
  adminContact: string;
  model: string;
  serviceTag: string;
  biosVersion: string;
  os: string;
  osVersion: string;
  ipAddress: string;
  updatedAt: string;
}

// snake_case columns -> camelCase JSON keys happens here, in one place
const SELECT_COLUMNS = `
  id,
  host_name      AS "hostName",
  asset_tag      AS "assetTag",
  location,
  admin_contact  AS "adminContact",
  model,
  service_tag    AS "serviceTag",
  bios_version   AS "biosVersion",
  os,
  os_version     AS "osVersion",
  ip_address     AS "ipAddress",
  updated_at     AS "updatedAt"
`;

export async function getSystemInfo(): Promise<SystemInfo | null> {
  const { rows } = await pool.query<SystemInfo>(
    `SELECT ${SELECT_COLUMNS} FROM system_info LIMIT 1`,
  );
  return rows[0] ?? null;
}
