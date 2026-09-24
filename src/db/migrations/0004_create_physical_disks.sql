CREATE TABLE physical_disks (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  controller_id     UUID NOT NULL REFERENCES controllers(id),
  enclosure_id      UUID REFERENCES enclosures(id),
  slot_number       INTEGER NOT NULL,
  serial_number     TEXT NOT NULL,
  model             TEXT NOT NULL,
  manufacturer      TEXT NOT NULL,
  media_type        TEXT NOT NULL,
  capacity          TEXT NOT NULL,
  interface         TEXT NOT NULL,
  status            TEXT NOT NULL,
  firmware_version  TEXT NOT NULL
);

-- Seed rows reference existing controllers/enclosures by name via subquery,
-- since their UUIDs are generated at insert time and unknown here.
-- C1: 2 internal disks (no enclosure). C2: 2 disks in enclosure E1.
INSERT INTO physical_disks (
  controller_id, enclosure_id, slot_number, serial_number, model,
  manufacturer, media_type, capacity, interface, status, firmware_version
) VALUES
  ((SELECT id FROM controllers WHERE name = 'C1'), NULL, 0, 'PD-SN-0001', 'MZILT960', 'Dell', 'SSD', '960 GB', 'SATA', 'Online', 'DL6D'),
  ((SELECT id FROM controllers WHERE name = 'C1'), NULL, 1, 'PD-SN-0002', 'MZILT960', 'Dell', 'SSD', '960 GB', 'SATA', 'Online', 'DL6D'),
  ((SELECT id FROM controllers WHERE name = 'C2'), (SELECT id FROM enclosures WHERE name = 'E1'), 0, 'PD-SN-0003', 'ST2000NX', 'Seagate', 'HDD', '2 TB', 'SAS', 'Online', 'ET04'),
  ((SELECT id FROM controllers WHERE name = 'C2'), (SELECT id FROM enclosures WHERE name = 'E1'), 1, 'PD-SN-0004', 'ST2000NX', 'Seagate', 'HDD', '2 TB', 'SAS', 'Degraded', 'ET04');
