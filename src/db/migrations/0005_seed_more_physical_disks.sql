-- Additional physical disks: 2 more internal on C1, 2 more on C2/E1,
-- plus 2 on C1 driving external enclosure E2 (a controller can serve
-- more than one enclosure).
INSERT INTO physical_disks (
  controller_id, enclosure_id, slot_number, serial_number, model,
  manufacturer, media_type, capacity, interface, status, firmware_version
) VALUES
  ((SELECT id FROM controllers WHERE name = 'C1'), NULL, 2, 'PD-SN-0005', 'MZILT960', 'Dell', 'SSD', '960 GB', 'SATA', 'Online', 'DL6D'),
  ((SELECT id FROM controllers WHERE name = 'C1'), NULL, 3, 'PD-SN-0006', 'MZILT960', 'Dell', 'SSD', '960 GB', 'SATA', 'Offline', 'DL6D'),
  ((SELECT id FROM controllers WHERE name = 'C2'), (SELECT id FROM enclosures WHERE name = 'E1'), 2, 'PD-SN-0007', 'ST2000NX', 'Seagate', 'HDD', '2 TB', 'SAS', 'Online', 'ET04'),
  ((SELECT id FROM controllers WHERE name = 'C2'), (SELECT id FROM enclosures WHERE name = 'E1'), 3, 'PD-SN-0008', 'ST2000NX', 'Seagate', 'HDD', '2 TB', 'SAS', 'Online', 'ET04'),
  ((SELECT id FROM controllers WHERE name = 'C1'), (SELECT id FROM enclosures WHERE name = 'E2'), 0, 'PD-SN-0009', 'ST4000NM', 'Seagate', 'HDD', '4 TB', 'SAS', 'Online', 'ET02'),
  ((SELECT id FROM controllers WHERE name = 'C1'), (SELECT id FROM enclosures WHERE name = 'E2'), 1, 'PD-SN-0010', 'ST4000NM', 'Seagate', 'HDD', '4 TB', 'SAS', 'Degraded', 'ET02');
