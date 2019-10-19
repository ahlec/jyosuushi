PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;
CREATE TABLE counter_additional_readings (
  counter_id STRING REFERENCES counters (counter_id) NOT NULL,
  kana STRING NOT NULL,
  uncommon BOOLEAN NOT NULL DEFAULT (0)
);
INSERT INTO
  "counter_additional_readings"
VALUES('色', 'いろ', 1);
COMMIT;