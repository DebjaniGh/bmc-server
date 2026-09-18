CREATE TABLE system_info (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_name      TEXT NOT NULL,
  asset_tag      TEXT NOT NULL DEFAULT '',
  location       TEXT NOT NULL DEFAULT '',
  admin_contact  TEXT NOT NULL DEFAULT '',
  model          TEXT NOT NULL,
  service_tag    TEXT NOT NULL,
  bios_version   TEXT NOT NULL,
  os             TEXT NOT NULL,
  os_version     TEXT NOT NULL,
  ip_address     TEXT NOT NULL,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Single-row seed: this app manages one physical BMC, so there is exactly one record.
INSERT INTO system_info (
  host_name, asset_tag, location, admin_contact,
  model, service_tag, bios_version, os, os_version, ip_address
) VALUES (
  'WIN-K5710073NN9', 'AT-0001', 'DC1 - Rack 4', 'admin@example.com',
  'PowerEdge R470', 'xyz56rty', '2.14.2', 'Microsoft Windows Server 2022 Standard', 'xyz.18.9.23', '10.10.101.0'
);
