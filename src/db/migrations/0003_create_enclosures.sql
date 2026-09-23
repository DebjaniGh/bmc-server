CREATE TABLE enclosures (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  model             TEXT NOT NULL,
  manufacturer      TEXT NOT NULL,
  serial_number     TEXT NOT NULL,
  status            TEXT NOT NULL,
  slot_count        INTEGER NOT NULL,
  firmware_version  TEXT NOT NULL
);

INSERT INTO enclosures (name, model, manufacturer, serial_number, status, slot_count, firmware_version) VALUES
  ('E1', 'PowerVault MD1420', 'Dell', 'ENCL-SN-0001', 'Online', 24, '3.11'),
  ('E2', 'PowerVault MD1400', 'Dell', 'ENCL-SN-0002', 'Online', 12, '3.09'),
  ('E3', 'PowerVault MD1420', 'Dell', 'ENCL-SN-0003', 'Degraded', 24, '3.11');
