PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE enum_irregular_type (irregular_type STRING PRIMARY KEY);
INSERT INTO
  "enum_irregular_type"
VALUES('arbitrary-reading');
INSERT INTO
  "enum_irregular_type"
VALUES('standard-wago-range-sound-change');
COMMIT;