PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE enum_counter_frequency (frequency STRING PRIMARY KEY);
INSERT INTO
  "enum_counter_frequency" (frequency)
VALUES('uncommon');
INSERT INTO
  "enum_counter_frequency" (frequency)
VALUES('archaic');
COMMIT;