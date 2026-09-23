import { pool } from "./pool.js";

export interface Controller {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  type: string;
  firmwareVersion: string;
  status: string;
  serialNumber: string;
}

const SELECT_COLUMNS = `
  id,
  name,
  model,
  manufacturer,
  type,
  firmware_version  AS "firmwareVersion",
  status,
  serial_number     AS "serialNumber"
`;

export async function getControllers(): Promise<Controller[]> {
  const { rows } = await pool.query<Controller>(
    `SELECT ${SELECT_COLUMNS} FROM controllers ORDER BY name`,
  );
  return rows;
}
