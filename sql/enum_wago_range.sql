PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE enum_wago_range (range_end_inclusive INTEGER PRIMARY KEY);
INSERT INTO
  "enum_wago_range"
VALUES(2);
COMMIT;