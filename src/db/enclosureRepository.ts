import { pool } from "./pool.js";

export interface Enclosure {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serial_number: string;
  status: string;
  slot_count: number;
  firmware_version: string;
}

const SELECT_COLUMNS = `
    id,
  name,
  model,
  manufacturer,
  serial_number AS "serialNumber",
  status,
  slot_count AS "slotCount",
  firmware_version AS "firmwareVersion"
`;

export async function getEnclosures(): Promise<Enclosure[]> {
  const { rows } = await pool.query<Enclosure>(
    `SELECT ${SELECT_COLUMNS} FROM enclosures ORDER BY name`,
  );
  return rows;
}
