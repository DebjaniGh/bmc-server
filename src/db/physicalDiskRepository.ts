import { pool } from "./pool.js";

export interface PhysicalDisk {
  id: string;
  controllerId: string;
  enclosureId: string | null;
  slotNumber: number;
  serialNumber: string;
  model: string;
  manufacturer: string;
  mediaType: string;
  capacity: string;
  interfaceType: string;
  status: string;
  firmwareVersion: string;
}

const SELECT_COLUMNS = `
  id,
  controller_id     AS "controllerId",
  enclosure_id      AS "enclosureId",
  slot_number       AS "slotNumber",
  serial_number     AS "serialNumber",
  model,
  manufacturer,
  media_type        AS "mediaType",
  capacity,
  interface         AS "interfaceType",
  status,
  firmware_version  AS "firmwareVersion"
`;

export interface PhysicalDiskFilter {
  controllerId?: string;
  enclosureId?: string;
  mediaType?: string;
}

export async function getPhysicalDisks(
  filter: PhysicalDiskFilter = {},
): Promise<PhysicalDisk[]> {
  const conditions: string[] = [];
  const values: string[] = [];

  if (filter.controllerId) {
    values.push(filter.controllerId);
    conditions.push(`controller_id = $${values.length}`);
  }
  if (filter.enclosureId) {
    values.push(filter.enclosureId);
    conditions.push(`enclosure_id = $${values.length}`);
  }
  if (filter.mediaType) {
    values.push(filter.mediaType);
    conditions.push(`media_type = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const { rows } = await pool.query<PhysicalDisk>(
    `SELECT ${SELECT_COLUMNS} FROM physical_disks ${whereClause} ORDER BY slot_number`,
    values,
  );
  return rows;
}
