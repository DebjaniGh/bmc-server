CREATE TABLE controllers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  model             TEXT NOT NULL,
  manufacturer      TEXT NOT NULL,
  type              TEXT NOT NULL,
  firmware_version  TEXT NOT NULL,
  status            TEXT NOT NULL,
  serial_number     TEXT NOT NULL
);

INSERT INTO controllers (name, model, manufacturer, type, firmware_version, status, serial_number) VALUES
  ('C1', 'PERC H755', 'Dell', 'RAID', '52.16.1-4356', 'Online', 'CTRL-SN-0001'),
  ('C2', 'HBA355i',   'Dell', 'HBA',  '24.17.0-0009', 'Online', 'CTRL-SN-0002');
