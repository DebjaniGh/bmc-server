import { pool } from "./pool.js";

// Shape of one system_info row as the API exposes it (camelCase). The DB
// columns are snake_case; SELECT_COLUMNS below does the renaming.
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

// snake_case columns -> camelCase JSON keys happens here, in one place.
// Aliases are double-quoted because unquoted identifiers are lower-cased by Postgres.
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

// LIMIT 1 with no WHERE: the table is a singleton (one BMC = one row).
export async function getSystemInfo(): Promise<SystemInfo | null> {
  const { rows } = await pool.query<SystemInfo>(
    `SELECT ${SELECT_COLUMNS} FROM system_info LIMIT 1`,
  );
  return rows[0] ?? null;
}

// Only the user-editable subset, all optional: a PATCH sends just what changed.
export type SystemInfoPatch = Partial<
  Pick<SystemInfo, "hostName" | "assetTag" | "location" | "adminContact">
>;

// Whitelist of editable fields -> column names. Only keys listed here can ever
// reach the UPDATE, so read-only columns are protected at the SQL boundary.
const EDITABLE_COLUMNS: Record<keyof SystemInfoPatch, string> = {
  hostName: "host_name",
  assetTag: "asset_tag",
  location: "location",
  adminContact: "admin_contact",
};

export async function updateSystemInfo(
  fieldsToBeUpdated: SystemInfoPatch,
): Promise<SystemInfo | null> {
  // Build "col = $1, col = $2, ..." for only the fields actually present.
  // Column names come from the trusted whitelist; values go through $n
  // placeholders and are never interpolated into the SQL string (no injection).
  const setClauses: string[] = [];
  const values: string[] = [];

  // Iterate the whitelist, not the request body, so unknown keys never reach SQL.
  for (const [key, column] of Object.entries(EDITABLE_COLUMNS)) {
    const value = fieldsToBeUpdated[key as keyof SystemInfoPatch];
    if (value !== undefined) {
      values.push(value);
      setClauses.push(`${column} = $${values.length}`);
    }
  }

  // Nothing editable was sent -> no-op; return current state instead of a bad UPDATE.
  if (setClauses.length === 0) {
    return getSystemInfo();
  }

  setClauses.push("updated_at = now()");

  // RETURNING gives back the updated row in the same round-trip (no second SELECT).
  const { rows } = await pool.query<SystemInfo>(
    `UPDATE system_info
        SET ${setClauses.join(", ")}
      WHERE id = (SELECT id FROM system_info LIMIT 1)
  RETURNING ${SELECT_COLUMNS}`,
    values,
  );
  return rows[0] ?? null;
}
